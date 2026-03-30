// Email templates for job applications

exports.applicationConfirmation = (applicantName, jobTitle, companyName) => {
  return {
    subject: `Application Received - ${jobTitle} at ${companyName}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #14b8a6 0%, #10b981 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
          .button { display: inline-block; background: #14b8a6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Application Received!</h1>
          </div>
          <div class="content">
            <p>Dear ${applicantName},</p>
            <p>Thank you for applying for the <strong>${jobTitle}</strong> position at <strong>${companyName}</strong>.</p>
            <p>We have successfully received your application and our hiring team will review it carefully. If your qualifications match our requirements, we will contact you for the next steps.</p>
            <p><strong>What happens next?</strong></p>
            <ul>
              <li>Our team will review your application within 5-7 business days</li>
              <li>Qualified candidates will be contacted for an interview</li>
              <li>You will receive updates via email about your application status</li>
            </ul>
            <p>We appreciate your interest in joining our team!</p>
            <div class="footer">
              <p>Best regards,<br><strong>Ethronics Hiring Team</strong></p>
              <p style="font-size: 12px; color: #9ca3af;">This is an automated message. Please do not reply to this email.</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `
  };
};

exports.newApplicationNotification = (applicantName, jobTitle, applicationId) => {
  return {
    subject: `New Application: ${jobTitle}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #14b8a6 0%, #10b981 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
          .info-box { background: white; padding: 15px; border-left: 4px solid #14b8a6; margin: 20px 0; }
          .button { display: inline-block; background: #14b8a6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎯 New Job Application</h1>
          </div>
          <div class="content">
            <p>A new application has been submitted!</p>
            <div class="info-box">
              <p><strong>Applicant:</strong> ${applicantName}</p>
              <p><strong>Position:</strong> ${jobTitle}</p>
              <p><strong>Application ID:</strong> ${applicationId}</p>
            </div>
            <p>Please review the application in the admin panel.</p>
            <a href="${process.env.ADMIN_URL || 'http://localhost:5174'}/applications/${applicationId}" class="button">View Application</a>
          </div>
        </div>
      </body>
      </html>
    `
  };
};

exports.statusUpdateNotification = (applicantName, jobTitle, oldStatus, newStatus) => {
  const statusMessages = {
    reviewing: 'Your application is currently being reviewed by our hiring team.',
    shortlisted: 'Congratulations! You have been shortlisted for an interview.',
    interviewed: 'Thank you for attending the interview. We are reviewing all candidates.',
    accepted: 'Congratulations! We are pleased to offer you the position.',
    rejected: 'Thank you for your interest. Unfortunately, we have decided to move forward with other candidates.'
  };

  const statusColors = {
    reviewing: '#3b82f6',
    shortlisted: '#8b5cf6',
    interviewed: '#6366f1',
    accepted: '#10b981',
    rejected: '#ef4444'
  };

  return {
    subject: `Application Status Update - ${jobTitle}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #14b8a6 0%, #10b981 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
          .status-badge { display: inline-block; padding: 8px 16px; border-radius: 20px; font-weight: bold; color: white; margin: 10px 0; }
          .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Application Status Update</h1>
          </div>
          <div class="content">
            <p>Dear ${applicantName},</p>
            <p>Your application status for <strong>${jobTitle}</strong> has been updated.</p>
            <p>
              <span class="status-badge" style="background: ${statusColors[newStatus] || '#6b7280'};">
                ${newStatus.toUpperCase()}
              </span>
            </p>
            <p>${statusMessages[newStatus] || 'Your application status has been updated.'}</p>
            ${newStatus === 'shortlisted' ? '<p>Our team will contact you soon to schedule an interview.</p>' : ''}
            ${newStatus === 'accepted' ? '<p>We will send you the offer letter and next steps shortly.</p>' : ''}
            <div class="footer">
              <p>Best regards,<br><strong>Ethronics Hiring Team</strong></p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `
  };
};

exports.dailyApplicationSummary = (applications, date) => {
  const byStatus = applications.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    return acc;
  }, {});

  const applicationsList = applications.map(app => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${app.firstName} ${app.lastName}</td>
      <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${app.job?.title || 'N/A'}</td>
      <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${app.status}</td>
      <td style="padding: 10px; border-bottom: 1px solid #e5e7eb;">${new Date(app.createdAt).toLocaleTimeString()}</td>
    </tr>
  `).join('');

  return {
    subject: `Daily Application Summary - ${date}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 800px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #14b8a6 0%, #10b981 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 8px 8px; }
          .stats { display: flex; gap: 15px; margin: 20px 0; }
          .stat-card { flex: 1; background: white; padding: 15px; border-radius: 8px; text-align: center; }
          table { width: 100%; background: white; border-radius: 8px; overflow: hidden; margin: 20px 0; }
          th { background: #14b8a6; color: white; padding: 12px; text-align: left; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📊 Daily Application Summary</h1>
            <p>${date}</p>
          </div>
          <div class="content">
            <h2>Summary</h2>
            <p><strong>${applications.length}</strong> new applications received today.</p>
            
            <div class="stats">
              ${Object.entries(byStatus).map(([status, count]) => `
                <div class="stat-card">
                  <h3>${count}</h3>
                  <p>${status}</p>
                </div>
              `).join('')}
            </div>

            <h3>Applications</h3>
            <table>
              <thead>
                <tr>
                  <th>Applicant</th>
                  <th>Position</th>
                  <th>Status</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                ${applicationsList}
              </tbody>
            </table>
          </div>
        </div>
      </body>
      </html>
    `
  };
};
