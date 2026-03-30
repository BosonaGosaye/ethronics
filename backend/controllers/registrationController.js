const Registration = require('../models/Registration');
const nodemailer = require('nodemailer');

// Create email transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Submit registration (public)
exports.submitRegistration = async (req, res) => {
  try {
    const registrationData = {
      ...req.body,
      ipAddress: req.ip,
      userAgent: req.get('user-agent')
    };

    const registration = await Registration.create(registrationData);

    // Send confirmation email to guardian
    try {
      const transporter = createTransporter();
      await transporter.sendMail({
        from: process.env.EMAIL_FROM || 'noreply@ethronics.com',
        to: registration.guardianEmail,
        subject: 'Registration Confirmation - Summer Robotics Training',
        html: `
          <h2>Registration Confirmed!</h2>
          <p>Dear ${registration.guardianName},</p>
          <p>Thank you for registering ${registration.studentName} for our Summer Robotics & AI Training program.</p>
          <h3>Registration Details:</h3>
          <ul>
            <li><strong>Student:</strong> ${registration.studentName}</li>
            <li><strong>Grade:</strong> ${registration.grade}</li>
            <li><strong>Session:</strong> ${registration.session}</li>
            <li><strong>Registration ID:</strong> ${registration._id}</li>
          </ul>
          <h3>Next Steps:</h3>
          <ol>
            <li>Pay the 200 ETB pre-registration fee to CBE account: 1000535286942 (FIREW ABERA BIRU)</li>
            <li>Send payment screenshot to our Telegram</li>
            <li>Take the diagnostic exam (June 30 - July 4, 2017 E.C.)</li>
          </ol>
          <p>For questions, call: 0978467467 / 0955414045</p>
          <p>Best regards,<br>Ethronics Robotics Team</p>
        `
      });
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError);
    }

    res.status(201).json({
      success: true,
      message: 'Registration submitted successfully',
      data: registration
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get all registrations (admin)
exports.getAllRegistrations = async (req, res) => {
  try {
    const { 
      status, 
      paymentStatus,
      examStatus,
      search, 
      page = 1, 
      limit = 20,
      sort = '-createdAt'
    } = req.query;

    const query = {};
    
    if (status) query.status = status;
    if (paymentStatus) query.paymentStatus = paymentStatus;
    if (examStatus) query.examStatus = examStatus;
    if (search) {
      query.$or = [
        { studentName: { $regex: search, $options: 'i' } },
        { guardianName: { $regex: search, $options: 'i' } },
        { guardianEmail: { $regex: search, $options: 'i' } },
        { school: { $regex: search, $options: 'i' } }
      ];
    }

    const registrations = await Registration.find(query)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Registration.countDocuments(query);

    res.json({
      success: true,
      data: registrations,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      total: count
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get single registration (admin)
exports.getRegistrationById = async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id)
      .populate('notes.addedBy', 'name email')
      .populate('emailsSent.sentBy', 'name email');

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found'
      });
    }

    res.json({
      success: true,
      data: registration
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Update registration (admin)
exports.updateRegistration = async (req, res) => {
  try {
    const registration = await Registration.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found'
      });
    }

    res.json({
      success: true,
      message: 'Registration updated successfully',
      data: registration
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Delete registration (admin)
exports.deleteRegistration = async (req, res) => {
  try {
    const registration = await Registration.findByIdAndDelete(req.params.id);

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found'
      });
    }

    res.json({
      success: true,
      message: 'Registration deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Add note to registration (admin)
exports.addNote = async (req, res) => {
  try {
    const { content } = req.body;
    
    const registration = await Registration.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          notes: {
            content,
            addedBy: req.user._id,
            addedAt: new Date()
          }
        }
      },
      { new: true }
    ).populate('notes.addedBy', 'name email');

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found'
      });
    }

    res.json({
      success: true,
      message: 'Note added successfully',
      data: registration
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Send email to registrant (admin)
exports.sendEmail = async (req, res) => {
  try {
    const { subject, body } = req.body;
    const registration = await Registration.findById(req.params.id);

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found'
      });
    }

    // Check if email is configured
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return res.status(400).json({
        success: false,
        message: 'Email service not configured. Please configure EMAIL_USER and EMAIL_PASS in .env file.',
        hint: 'For Gmail: Enable 2FA and generate an App Password at https://myaccount.google.com/apppasswords'
      });
    }

    // Send email
    try {
      const transporter = createTransporter();
      await transporter.sendMail({
        from: process.env.EMAIL_FROM || 'noreply@ethronics.com',
        to: registration.guardianEmail,
        subject,
        html: body
      });

      // Record email in database
      registration.emailsSent.push({
        subject,
        body,
        sentBy: req.user._id,
        sentAt: new Date()
      });
      await registration.save();

      res.json({
        success: true,
        message: 'Email sent successfully',
        data: registration
      });
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      return res.status(500).json({
        success: false,
        message: 'Failed to send email',
        error: emailError.message,
        hint: 'Check your email configuration in .env file. For Gmail, make sure you are using an App Password, not your regular password.'
      });
    }
  } catch (error) {
    console.error('Send email error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get statistics (admin)
exports.getStatistics = async (req, res) => {
  try {
    const total = await Registration.countDocuments();
    const pending = await Registration.countDocuments({ status: 'pending' });
    const approved = await Registration.countDocuments({ status: 'approved' });
    const rejected = await Registration.countDocuments({ status: 'rejected' });
    
    const byStatus = await Registration.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    const byPaymentStatus = await Registration.aggregate([
      { $group: { _id: '$paymentStatus', count: { $sum: 1 } } }
    ]);

    const byExamStatus = await Registration.aggregate([
      { $group: { _id: '$examStatus', count: { $sum: 1 } } }
    ]);

    const bySession = await Registration.aggregate([
      { $group: { _id: '$session', count: { $sum: 1 } } }
    ]);

    res.json({
      success: true,
      data: {
        total,
        pending,
        approved,
        rejected,
        byStatus,
        byPaymentStatus,
        byExamStatus,
        bySession
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};
