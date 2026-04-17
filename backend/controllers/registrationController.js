const Registration = require('../models/Registration');
const nodemailer = require('nodemailer');

// Create email transporter with Gmail defaults
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
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
      const fromName = process.env.EMAIL_FROM_NAME || 'Ethronics';
      const fromEmail = process.env.EMAIL_USER;
      
      await transporter.sendMail({
        from: `"${fromName}" <${fromEmail}>`,
        to: registration.guardianEmail,
        subject: '🎉 Registration Confirmed - Summer Robotics & AI Training',
        html: `
          <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Registration Confirmation</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7fa;">
            <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f4f7fa;">
              <tr>
                <td align="center" style="padding: 40px 20px;">
                  <!-- Main Container -->
                  <table role="presentation" style="max-width: 600px; width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
                    
                    <!-- Header with Gradient -->
                    <tr>
                      <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
                        <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                          🎉 Registration Confirmed!
                        </h1>
                        <p style="margin: 10px 0 0 0; color: #e0e7ff; font-size: 16px;">
                          Summer Robotics & AI Training 2025
                        </p>
                      </td>
                    </tr>

                    <!-- Welcome Message -->
                    <tr>
                      <td style="padding: 40px 30px 30px 30px;">
                        <p style="margin: 0 0 20px 0; font-size: 18px; color: #1f2937; line-height: 1.6;">
                          Dear <strong style="color: #667eea;">${registration.guardianName}</strong>,
                        </p>
                        <p style="margin: 0 0 20px 0; font-size: 16px; color: #4b5563; line-height: 1.6;">
                          Thank you for registering <strong>${registration.studentName}</strong> for our exciting Summer Robotics & AI Training program! We're thrilled to have your child join us on this amazing learning journey.
                        </p>
                      </td>
                    </tr>

                    <!-- Registration Details Card -->
                    <tr>
                      <td style="padding: 0 30px 30px 30px;">
                        <table role="presentation" style="width: 100%; border-collapse: collapse; background: linear-gradient(135deg, #f0f4ff 0%, #e0e7ff 100%); border-radius: 12px; padding: 25px; border: 2px solid #c7d2fe;">
                          <tr>
                            <td>
                              <h2 style="margin: 0 0 20px 0; color: #4c1d95; font-size: 20px; font-weight: bold;">
                                📋 Registration Details
                              </h2>
                              <table role="presentation" style="width: 100%; border-collapse: collapse;">
                                <tr>
                                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px; width: 40%;">
                                    <strong>Student Name:</strong>
                                  </td>
                                  <td style="padding: 8px 0; color: #1f2937; font-size: 14px; font-weight: 600;">
                                    ${registration.studentName}
                                  </td>
                                </tr>
                                <tr>
                                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">
                                    <strong>Grade:</strong>
                                  </td>
                                  <td style="padding: 8px 0; color: #1f2937; font-size: 14px; font-weight: 600;">
                                    ${registration.grade}
                                  </td>
                                </tr>
                                <tr>
                                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">
                                    <strong>Session:</strong>
                                  </td>
                                  <td style="padding: 8px 0; color: #1f2937; font-size: 14px; font-weight: 600;">
                                    ${registration.session.charAt(0).toUpperCase() + registration.session.slice(1)}
                                  </td>
                                </tr>
                                <tr>
                                  <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">
                                    <strong>Registration ID:</strong>
                                  </td>
                                  <td style="padding: 8px 0; color: #667eea; font-size: 14px; font-weight: 600; font-family: monospace;">
                                    ${registration._id}
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                    <!-- Next Steps Section -->
                    <tr>
                      <td style="padding: 0 30px 30px 30px;">
                        <h2 style="margin: 0 0 20px 0; color: #1f2937; font-size: 20px; font-weight: bold;">
                          🚀 Next Steps
                        </h2>
                        
                        <!-- Step 1 -->
                        <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 15px; background-color: #fef3c7; border-radius: 10px; padding: 20px; border-left: 4px solid #f59e0b;">
                          <tr>
                            <td>
                              <div style="display: flex; align-items: start;">
                                <span style="background-color: #f59e0b; color: white; width: 28px; height: 28px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; font-size: 14px; margin-right: 15px; flex-shrink: 0;">1</span>
                                <div>
                                  <h3 style="margin: 0 0 8px 0; color: #92400e; font-size: 16px; font-weight: bold;">
                                    💳 Complete Payment
                                  </h3>
                                  <p style="margin: 0; color: #78350f; font-size: 14px; line-height: 1.5;">
                                    Pay <strong>200 ETB</strong> pre-registration fee to:<br>
                                    <strong>CBE Account:</strong> 1000535286942<br>
                                    <strong>Account Name:</strong> FIREW ABERA BIRU
                                  </p>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </table>

                        <!-- Step 2 -->
                        <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 15px; background-color: #dbeafe; border-radius: 10px; padding: 20px; border-left: 4px solid #3b82f6;">
                          <tr>
                            <td>
                              <div style="display: flex; align-items: start;">
                                <span style="background-color: #3b82f6; color: white; width: 28px; height: 28px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; font-size: 14px; margin-right: 15px; flex-shrink: 0;">2</span>
                                <div>
                                  <h3 style="margin: 0 0 8px 0; color: #1e3a8a; font-size: 16px; font-weight: bold;">
                                    📸 Send Payment Proof
                                  </h3>
                                  <p style="margin: 0; color: #1e40af; font-size: 14px; line-height: 1.5;">
                                    Send your payment screenshot to our Telegram channel for verification.
                                  </p>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </table>

                        <!-- Step 3 -->
                        <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #d1fae5; border-radius: 10px; padding: 20px; border-left: 4px solid #10b981;">
                          <tr>
                            <td>
                              <div style="display: flex; align-items: start;">
                                <span style="background-color: #10b981; color: white; width: 28px; height: 28px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; font-size: 14px; margin-right: 15px; flex-shrink: 0;">3</span>
                                <div>
                                  <h3 style="margin: 0 0 8px 0; color: #065f46; font-size: 16px; font-weight: bold;">
                                    📝 Take Diagnostic Exam
                                  </h3>
                                  <p style="margin: 0; color: #047857; font-size: 14px; line-height: 1.5;">
                                    Schedule: <strong>June 30 - July 4, 2018 E.C.</strong><br>
                                    This helps us understand your child's current skill level.
                                  </p>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                    <!-- Contact Information -->
                    <tr>
                      <td style="padding: 0 30px 40px 30px;">
                        <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f9fafb; border-radius: 10px; padding: 20px; border: 1px solid #e5e7eb;">
                          <tr>
                            <td style="text-align: center;">
                              <h3 style="margin: 0 0 15px 0; color: #374151; font-size: 18px; font-weight: bold;">
                                📞 Need Help?
                              </h3>
                              <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px;">
                                Our team is here to assist you!
                              </p>
                              <p style="margin: 0; color: #1f2937; font-size: 16px; font-weight: 600;">
                                📱 0978467467 / 0955414045
                              </p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                      <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
                        <p style="margin: 0 0 10px 0; color: #ffffff; font-size: 16px; font-weight: 600;">
                          Best regards,
                        </p>
                        <p style="margin: 0 0 20px 0; color: #e0e7ff; font-size: 18px; font-weight: bold;">
                          Ethronics Robotics Team
                        </p>
                        <div style="border-top: 1px solid rgba(255, 255, 255, 0.2); padding-top: 20px; margin-top: 20px;">
                          <p style="margin: 0 0 5px 0; color: #e0e7ff; font-size: 12px;">
                            Ethronics | Mebrat, AMG Mall, 9th Floor
                          </p>
                          <p style="margin: 0; color: #e0e7ff; font-size: 12px;">
                            Adama, Ethiopia | www.ethronics.org
                          </p>
                        </div>
                      </td>
                    </tr>

                  </table>
                  
                  <!-- Footer Note -->
                  <table role="presentation" style="max-width: 600px; width: 100%; margin-top: 20px;">
                    <tr>
                      <td style="text-align: center; padding: 0 20px;">
                        <p style="margin: 0; color: #9ca3af; font-size: 12px; line-height: 1.5;">
                          This is an automated confirmation email. Please do not reply to this message.<br>
                          If you have any questions, please contact us using the phone numbers above.
                        </p>
                      </td>
                    </tr>
                  </table>

                </td>
              </tr>
            </table>
          </body>
          </html>
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
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      return res.status(400).json({
        success: false,
        message: 'Email service not configured. Please configure EMAIL_USER and EMAIL_PASSWORD in .env file.',
        hint: 'For Gmail: Enable 2FA and generate an App Password at https://myaccount.google.com/apppasswords'
      });
    }

    // Send email
    try {
      const transporter = createTransporter();
      const fromName = process.env.EMAIL_FROM_NAME || 'Ethronics';
      const fromEmail = process.env.EMAIL_USER;
      
      await transporter.sendMail({
        from: `"${fromName}" <${fromEmail}>`,
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
