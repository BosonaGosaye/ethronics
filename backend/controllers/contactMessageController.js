const ContactMessage = require('../models/ContactMessage');
const nodemailer = require('nodemailer');

// Create email transporter with Gmail defaults
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
};

// Submit contact message (public)
exports.submitMessage = async (req, res) => {
  try {
    const { category, name, email, message, resumeUrl } = req.body;
    
    if (!category || !name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Category, name, email, and message are required'
      });
    }
    
    const contactMessage = await ContactMessage.create({
      category,
      name,
      email,
      message,
      resumeUrl: resumeUrl || null
    });
    
    res.status(201).json({
      success: true,
      message: 'Message submitted successfully',
      data: contactMessage
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get all messages with filters (admin)
exports.getAllMessages = async (req, res) => {
  try {
    const { category, status, priority, search, page = 1, limit = 20 } = req.query;
    
    const query = {};
    
    if (category) query.category = category;
    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } }
      ];
    }
    
    const skip = (page - 1) * limit;
    
    const messages = await ContactMessage.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate('readBy', 'name email')
      .populate('repliedBy', 'name email');
    
    const total = await ContactMessage.countDocuments(query);
    
    res.json({
      success: true,
      data: messages,
      pagination: {
        total,
        page: parseInt(page),
        pages: Math.ceil(total / limit)
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

// Get message by ID (admin)
exports.getMessageById = async (req, res) => {
  try {
    const message = await ContactMessage.findById(req.params.id)
      .populate('readBy', 'name email')
      .populate('repliedBy', 'name email');
    
    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }
    
    res.json({
      success: true,
      data: message
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Mark message as read (admin)
exports.markAsRead = async (req, res) => {
  try {
    const message = await ContactMessage.findById(req.params.id);
    
    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }
    
    if (message.status === 'new') {
      message.status = 'read';
      message.readAt = new Date();
      message.readBy = req.user._id;
      await message.save();
    }
    
    res.json({
      success: true,
      message: 'Message marked as read',
      data: message
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Update message status (admin)
exports.updateStatus = async (req, res) => {
  try {
    const { status, priority, adminNotes } = req.body;
    
    const message = await ContactMessage.findById(req.params.id);
    
    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }
    
    if (status) message.status = status;
    if (priority) message.priority = priority;
    if (adminNotes !== undefined) message.adminNotes = adminNotes;
    
    await message.save();
    
    res.json({
      success: true,
      message: 'Message updated successfully',
      data: message
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Reply to message via email (admin)
exports.replyToMessage = async (req, res) => {
  try {
    const { replyMessage } = req.body;
    
    if (!replyMessage) {
      return res.status(400).json({
        success: false,
        message: 'Reply message is required'
      });
    }
    
    const message = await ContactMessage.findById(req.params.id);
    
    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
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
        to: message.email,
        subject: `Re: Your ${message.category} inquiry - Ethronics`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #6366f1;">Ethronics Response</h2>
            <p>Dear ${message.name},</p>
            <p>Thank you for contacting us. Here is our response to your inquiry:</p>
            <div style="background-color: #f3f4f6; padding: 15px; border-left: 4px solid #6366f1; margin: 20px 0;">
              ${replyMessage.replace(/\n/g, '<br>')}
            </div>
            <p><strong>Your Original Message:</strong></p>
            <div style="background-color: #f9fafb; padding: 15px; border-left: 4px solid #d1d5db; margin: 20px 0;">
              ${message.message.replace(/\n/g, '<br>')}
            </div>
            <p>If you have any further questions, please don't hesitate to reach out.</p>
            <p>Best regards,<br>Ethronics Team</p>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
            <p style="font-size: 12px; color: #6b7280;">
              Ethronics | Mebrat, AMG Mall, 9th Floor | Adama, Ethiopia<br>
              Email: info@ethronics.com | Phone: +251-XXX-XXXXXX
            </p>
          </div>
        `
      });
      
      // Update message
      message.status = 'replied';
      message.replyMessage = replyMessage;
      message.repliedAt = new Date();
      message.repliedBy = req.user._id;
      await message.save();
      
      res.json({
        success: true,
        message: 'Reply sent successfully',
        data: message
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
    console.error('Reply to message error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Delete message (admin)
exports.deleteMessage = async (req, res) => {
  try {
    const message = await ContactMessage.findByIdAndDelete(req.params.id);
    
    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Message deleted successfully'
    });
  } catch (error) {
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
    const total = await ContactMessage.countDocuments();
    const byStatus = await ContactMessage.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    const byCategory = await ContactMessage.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);
    const byPriority = await ContactMessage.aggregate([
      { $group: { _id: '$priority', count: { $sum: 1 } } }
    ]);
    
    res.json({
      success: true,
      data: {
        total,
        byStatus: byStatus.reduce((acc, item) => {
          acc[item._id] = item.count;
          return acc;
        }, {}),
        byCategory: byCategory.reduce((acc, item) => {
          acc[item._id] = item.count;
          return acc;
        }, {}),
        byPriority: byPriority.reduce((acc, item) => {
          acc[item._id] = item.count;
          return acc;
        }, {})
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
