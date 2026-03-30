# Email Configuration Guide

## Current Status
The registration system is configured to send confirmation emails to guardians, but email credentials are not yet configured in the `.env` file.

## Email Features

### Automatic Emails
1. **Registration Confirmation** - Sent automatically when a student registers
   - Includes registration details
   - Payment instructions
   - Next steps information
   - Contact information

### Manual Emails (Admin)
2. **Custom Emails** - Sent from admin panel
   - Status updates
   - Payment reminders
   - Exam schedules
   - General communications

## Setup Instructions

### Option 1: Gmail (Recommended for Testing)

1. Create a Gmail account or use existing one
2. Enable 2-Factor Authentication
3. Generate App Password:
   - Go to Google Account Settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
   - Copy the 16-character password

4. Update `backend/.env`:
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-char-app-password
EMAIL_FROM=Ethronics Robotics <noreply@ethronics.com>
```

### Option 2: SendGrid (Recommended for Production)

1. Sign up at https://sendgrid.com
2. Create API Key
3. Update `backend/.env`:
```env
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USER=apikey
EMAIL_PASS=your-sendgrid-api-key
EMAIL_FROM=Ethronics Robotics <noreply@ethronics.com>
```

### Option 3: Mailgun

1. Sign up at https://mailgun.com
2. Get SMTP credentials
3. Update `backend/.env`:
```env
EMAIL_HOST=smtp.mailgun.org
EMAIL_PORT=587
EMAIL_USER=your-mailgun-username
EMAIL_PASS=your-mailgun-password
EMAIL_FROM=Ethronics Robotics <noreply@ethronics.com>
```

### Option 4: Custom SMTP Server

```env
EMAIL_HOST=your-smtp-server.com
EMAIL_PORT=587
EMAIL_USER=your-username
EMAIL_PASS=your-password
EMAIL_FROM=Ethronics Robotics <noreply@ethronics.com>
```

## Testing Email Configuration

### Test Script
Create a test file `backend/scripts/testEmail.js`:

```javascript
const nodemailer = require('nodemailer');
require('dotenv').config();

async function testEmail() {
  const transporter = nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: 'test@example.com', // Change to your email
      subject: 'Test Email from Ethronics',
      html: '<h1>Email Configuration Successful!</h1><p>Your email system is working correctly.</p>'
    });

    console.log('✅ Email sent successfully!');
    console.log('Message ID:', info.messageId);
  } catch (error) {
    console.error('❌ Email failed:', error.message);
  }
}

testEmail();
```

Run test:
```bash
cd backend
node scripts/testEmail.js
```

## Email Templates

### Registration Confirmation Template
Located in: `backend/controllers/registrationController.js`

Current template includes:
- Greeting with guardian name
- Student information
- Registration ID
- Payment instructions
- Next steps
- Contact information

### Customizing Templates

To customize email templates, edit the `submitRegistration` function in `backend/controllers/registrationController.js`:

```javascript
await transporter.sendMail({
  from: process.env.EMAIL_FROM || 'noreply@ethronics.com',
  to: registration.guardianEmail,
  subject: 'Your Custom Subject',
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Your Custom Header</h2>
      <p>Your custom content here</p>
    </div>
  `
});
```

## Error Handling

### Current Behavior
- If email sending fails, the registration still succeeds
- Error is logged to console but doesn't affect user experience
- This ensures registrations aren't lost due to email issues

### Monitoring Email Failures
Check backend logs for:
```
Failed to send confirmation email: [error details]
```

## Production Recommendations

1. **Use Professional Email Service**
   - SendGrid, Mailgun, or AWS SES
   - Better deliverability
   - Email analytics
   - Higher sending limits

2. **Configure SPF/DKIM Records**
   - Improves email deliverability
   - Reduces spam classification
   - Required for custom domain

3. **Email Queue System**
   - Use Bull or Bee-Queue
   - Retry failed emails
   - Better performance

4. **Email Templates**
   - Use template engine (Handlebars, Pug)
   - Separate templates from code
   - Easier to maintain

5. **Email Tracking**
   - Track opens and clicks
   - Monitor bounce rates
   - Analyze engagement

## Troubleshooting

### Common Issues

**Issue**: "Invalid login"
- Check EMAIL_USER and EMAIL_PASS are correct
- For Gmail, ensure App Password is used (not regular password)

**Issue**: "Connection timeout"
- Check EMAIL_HOST and EMAIL_PORT
- Verify firewall isn't blocking SMTP
- Try different port (587 or 465)

**Issue**: "Emails going to spam"
- Configure SPF/DKIM records
- Use professional email service
- Avoid spam trigger words

**Issue**: "Rate limit exceeded"
- Gmail: 500 emails/day limit
- Use professional service for higher limits
- Implement email queue

## Without Email Configuration

The system works perfectly without email configuration:
- Registrations are saved successfully
- Admin can view all registrations
- Email errors are logged but don't affect functionality
- You can manually contact guardians

## Next Steps

1. Choose email service provider
2. Get credentials
3. Update backend/.env
4. Test with test script
5. Submit test registration
6. Verify email received
7. Monitor logs for issues

## Support

For email configuration help:
- Gmail: https://support.google.com/mail/answer/185833
- SendGrid: https://docs.sendgrid.com/
- Mailgun: https://documentation.mailgun.com/
- Nodemailer: https://nodemailer.com/
