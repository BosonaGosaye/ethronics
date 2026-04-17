const nodemailer = require('nodemailer');
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

async function testContactEmail() {
  console.log('🧪 Testing Contact Message Reply Email Configuration...\n');

  // Check if email is configured
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.log('❌ Email not configured!');
    console.log('\nPlease set the following in backend/.env:');
    console.log('EMAIL_USER=your-email@gmail.com');
    console.log('EMAIL_PASSWORD=your-app-password');
    console.log('EMAIL_FROM_NAME=Ethronics');
    console.log('\nFor Gmail App Password instructions:');
    console.log('1. Go to https://myaccount.google.com/security');
    console.log('2. Enable 2-Step Verification');
    console.log('3. Go to https://myaccount.google.com/apppasswords');
    console.log('4. Generate an app password for "Mail"');
    process.exit(1);
  }

  const fromName = process.env.EMAIL_FROM_NAME || 'Ethronics';
  const fromEmail = process.env.EMAIL_USER;

  console.log('📧 Email Configuration:');
  console.log(`   Service: Gmail`);
  console.log(`   User: ${process.env.EMAIL_USER}`);
  console.log(`   From: "${fromName}" <${fromEmail}>`);
  console.log('');

  // Create transporter with Gmail service
  const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  // Verify connection
  console.log('🔌 Verifying Gmail connection...');
  try {
    await transporter.verify();
    console.log('✅ Gmail connection successful!\n');
  } catch (error) {
    console.error('❌ Gmail connection failed!');
    console.error('Error:', error.message);
    console.log('\nTroubleshooting:');
    console.log('1. Make sure you are using an App Password, not your regular password');
    console.log('2. Enable 2-Factor Authentication on your Google account');
    console.log('3. Generate App Password at: https://myaccount.google.com/apppasswords');
    console.log('4. Remove spaces from the app password');
    process.exit(1);
  }

  // Send test contact reply email
  const testEmail = process.env.EMAIL_USER; // Send to yourself for testing
  const testUserName = 'Test User';
  const testCategory = 'General Inquiry';
  const testOriginalMessage = 'Hello, I would like to know more about your robotics programs. Can you provide more information?';
  const testReplyMessage = 'Thank you for your interest in our robotics programs!\n\nWe offer comprehensive training in robotics and AI for students of all levels. Our programs include:\n\n- Basic Robotics (Grades 4-6)\n- Intermediate Robotics (Grades 7-9)\n- Advanced Robotics & AI (Grades 10-12)\n\nPlease visit our website or call us for more details.';
  
  console.log(`📤 Sending test contact reply email to ${testEmail}...`);
  try {
    const info = await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to: testEmail,
      subject: `Re: Your ${testCategory} inquiry - Ethronics`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #6366f1;">Ethronics Response</h2>
          <p>Dear ${testUserName},</p>
          <p>Thank you for contacting us. Here is our response to your inquiry:</p>
          <div style="background-color: #f3f4f6; padding: 15px; border-left: 4px solid #6366f1; margin: 20px 0;">
            ${testReplyMessage.replace(/\n/g, '<br>')}
          </div>
          <p><strong>Your Original Message:</strong></p>
          <div style="background-color: #f9fafb; padding: 15px; border-left: 4px solid #d1d5db; margin: 20px 0;">
            ${testOriginalMessage.replace(/\n/g, '<br>')}
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

    console.log('✅ Test contact reply email sent successfully!');
    console.log(`   Message ID: ${info.messageId}`);
    console.log(`\n📬 Check your inbox at ${testEmail}`);
    console.log('\n✨ Contact message reply email configuration is working correctly!');
    console.log('\nThe email includes:');
    console.log('  ✓ Professional HTML formatting');
    console.log('  ✓ Admin reply message');
    console.log('  ✓ Original user message');
    console.log('  ✓ Contact information footer');
  } catch (error) {
    console.error('❌ Failed to send test email!');
    console.error('Error:', error.message);
    process.exit(1);
  }
}

testContactEmail();
