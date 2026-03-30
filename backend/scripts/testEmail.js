const nodemailer = require('nodemailer');
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

async function testEmail() {
  console.log('🧪 Testing Email Configuration...\n');

  // Check if email is configured
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log('❌ Email not configured!');
    console.log('\nPlease set the following in backend/.env:');
    console.log('EMAIL_HOST=smtp.gmail.com');
    console.log('EMAIL_PORT=587');
    console.log('EMAIL_USER=your-email@gmail.com');
    console.log('EMAIL_PASS=your-app-password');
    console.log('EMAIL_FROM=noreply@ethronics.com');
    console.log('\nFor Gmail App Password instructions, see EMAIL_CONFIGURATION_GUIDE.md');
    process.exit(1);
  }

  console.log('📧 Email Configuration:');
  console.log(`   Host: ${process.env.EMAIL_HOST || 'smtp.gmail.com'}`);
  console.log(`   Port: ${process.env.EMAIL_PORT || 587}`);
  console.log(`   User: ${process.env.EMAIL_USER}`);
  console.log(`   From: ${process.env.EMAIL_FROM || 'noreply@ethronics.com'}`);
  console.log('');

  // Create transporter
  const transporter = nodemailer.createTransporter({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  // Verify connection
  console.log('🔌 Verifying SMTP connection...');
  try {
    await transporter.verify();
    console.log('✅ SMTP connection successful!\n');
  } catch (error) {
    console.error('❌ SMTP connection failed!');
    console.error('Error:', error.message);
    console.log('\nTroubleshooting:');
    console.log('1. For Gmail: Make sure you are using an App Password, not your regular password');
    console.log('2. Enable 2-Factor Authentication on your Google account');
    console.log('3. Generate App Password at: https://myaccount.google.com/apppasswords');
    console.log('4. Check if port 587 is not blocked by firewall');
    console.log('\nSee EMAIL_CONFIGURATION_GUIDE.md for detailed instructions');
    process.exit(1);
  }

  // Send test email
  const testEmail = process.env.EMAIL_USER; // Send to yourself for testing
  
  console.log(`📤 Sending test email to ${testEmail}...`);
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'noreply@ethronics.com',
      to: testEmail,
      subject: 'Test Email from Ethronics Registration System',
      html: `
        <h2>Email Configuration Test</h2>
        <p>This is a test email from the Ethronics Registration System.</p>
        <p>If you received this email, your email configuration is working correctly!</p>
        <hr>
        <p><strong>Configuration Details:</strong></p>
        <ul>
          <li>Host: ${process.env.EMAIL_HOST || 'smtp.gmail.com'}</li>
          <li>Port: ${process.env.EMAIL_PORT || 587}</li>
          <li>From: ${process.env.EMAIL_FROM || 'noreply@ethronics.com'}</li>
        </ul>
        <p><em>Sent at: ${new Date().toLocaleString()}</em></p>
      `
    });

    console.log('✅ Test email sent successfully!');
    console.log(`   Message ID: ${info.messageId}`);
    console.log(`\n📬 Check your inbox at ${testEmail}`);
    console.log('\n✨ Email configuration is working correctly!');
  } catch (error) {
    console.error('❌ Failed to send test email!');
    console.error('Error:', error.message);
    console.log('\nSee EMAIL_CONFIGURATION_GUIDE.md for troubleshooting');
    process.exit(1);
  }
}

testEmail();
