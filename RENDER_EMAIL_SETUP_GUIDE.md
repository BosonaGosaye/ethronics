# Render Email Configuration Setup Guide 📧

## Problem
You're getting a 500 error "Failed to send email" when trying to reply to contact messages. This is because the email environment variables are NOT set on your Render production server.

## Solution: Set Environment Variables on Render

### Step 1: Go to Render Dashboard
1. Open your browser and go to: https://dashboard.render.com
2. Log in to your account

### Step 2: Select Your Backend Service
1. Click on your backend service (the one running your Node.js API)
2. It should be named something like "ethronics-backend" or "ethronics-api"

### Step 3: Open Environment Settings
1. In the left sidebar, click on **"Environment"**
2. You'll see a list of your current environment variables

### Step 4: Add Email Variables
Click **"Add Environment Variable"** and add these THREE variables:

#### Variable 1: EMAIL_USER
```
Key: EMAIL_USER
Value: roobaaa21@gmail.com
```

#### Variable 2: EMAIL_PASSWORD
```
Key: EMAIL_PASSWORD
Value: cdfxqohycknpkdhl
```
**IMPORTANT**: Remove ALL spaces! Use `cdfxqohycknpkdhl` NOT `cdfx qohy cknp kdhl`

#### Variable 3: EMAIL_FROM_NAME
```
Key: EMAIL_FROM_NAME
Value: ethronics.com
```

### Step 5: Save Changes
1. Click **"Save Changes"** button at the bottom
2. Render will automatically redeploy your service
3. Wait 2-3 minutes for the deployment to complete

### Step 6: Verify Deployment
1. Check the "Logs" tab to see if deployment was successful
2. Look for messages like:
   - "Build successful"
   - "Service is live"

## Testing After Setup

### Test 1: Try Sending a Reply
1. Go to your admin panel: https://ethronics-admin.vercel.app
2. Navigate to Contact Messages
3. Click on a message
4. Click "Reply"
5. Type a test message
6. Click "Send Reply"
7. You should see: ✅ "Reply sent successfully!"

### Test 2: Check Email Received
1. Check the email inbox of the person who sent the contact message
2. They should receive an email from "ethronics.com" <roobaaa21@gmail.com>

## Current Configuration Summary

### Local (.env file) ✅
```env
EMAIL_USER=roobaaa21@gmail.com
EMAIL_PASSWORD=cdfxqohycknpkdhl
EMAIL_FROM_NAME=ethronics.com
```

### Production (Render) ⚠️ NEEDS TO BE SET
```
EMAIL_USER=roobaaa21@gmail.com
EMAIL_PASSWORD=cdfxqohycknpkdhl
EMAIL_FROM_NAME=ethronics.com
```

## Common Mistakes to Avoid

### ❌ WRONG: Password with spaces
```
EMAIL_PASSWORD=cdfx qohy cknp kdhl
```

### ✅ CORRECT: Password without spaces
```
EMAIL_PASSWORD=cdfxqohycknpkdhl
```

### ❌ WRONG: Using regular Gmail password
```
EMAIL_PASSWORD=YourGmailPassword123
```

### ✅ CORRECT: Using Gmail App Password
```
EMAIL_PASSWORD=cdfxqohycknpkdhl
```

## Troubleshooting

### Error: "Email service not configured"
**Cause**: Environment variables not set on Render  
**Solution**: Follow steps above to add the 3 variables

### Error: "Invalid login" or "Authentication failed"
**Cause**: Wrong password or password has spaces  
**Solution**: 
- Use the app password: `cdfxqohycknpkdhl`
- Make sure there are NO spaces
- Make sure 2-Step Verification is enabled on Gmail

### Error: "Failed to send email"
**Cause**: Email configuration issue  
**Solution**:
1. Check all 3 variables are set on Render
2. Check for typos in the email address
3. Check the app password is correct
4. Wait for Render to finish redeploying

### Still Not Working?
1. Check Render logs for detailed error messages:
   - Go to your service on Render
   - Click "Logs" tab
   - Look for errors related to email or nodemailer

2. Verify Gmail App Password:
   - Go to: https://myaccount.google.com/apppasswords
   - Make sure the app password is still active
   - Generate a new one if needed

3. Test locally first:
   ```bash
   cd backend
   node scripts/testContactEmail.js
   ```

## Email Features That Will Work After Setup

1. ✅ **Contact Message Replies**
   - Admin can reply to contact form submissions
   - User receives email with admin's response

2. ✅ **Registration Confirmations**
   - Automatic email when someone registers for training
   - Includes registration details and next steps

3. ✅ **Job Application Confirmations**
   - Automatic email when someone applies for a job
   - Status update emails when application status changes

## Quick Reference

### Gmail App Password Requirements
- Must be 16 characters
- No spaces
- Only letters and numbers
- Generated from: https://myaccount.google.com/apppasswords
- Requires 2-Step Verification enabled

### Render Environment Variables
- Set in: Dashboard → Service → Environment
- Takes effect after: Automatic redeploy (2-3 minutes)
- Can be updated anytime
- Changes trigger automatic redeploy

## Next Steps

1. ✅ Set the 3 environment variables on Render (follow steps above)
2. ✅ Wait for automatic redeploy to complete
3. ✅ Test sending a reply from admin panel
4. ✅ Verify email is received

---

**Important**: The email functionality will NOT work until you set these environment variables on Render. Your local setup is already configured correctly.

**Last Updated**: April 17, 2026  
**Email Service**: Gmail SMTP  
**App Password**: cdfxqohycknpkdhl (no spaces!)  
**Sender Email**: roobaaa21@gmail.com  
**Sender Name**: ethronics.com
