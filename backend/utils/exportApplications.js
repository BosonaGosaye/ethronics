// Export applications to CSV

exports.generateCSV = (applications) => {
  // CSV headers
  const headers = [
    'Application ID',
    'First Name',
    'Last Name',
    'Email',
    'Phone',
    'Location',
    'Job Title',
    'Company',
    'Status',
    'Rating',
    'Years of Experience',
    'Current Company',
    'Expected Salary',
    'LinkedIn',
    'Portfolio',
    'Resume URL',
    'Applied Date',
    'Viewed Date'
  ];

  // Convert applications to CSV rows
  const rows = applications.map(app => {
    // Extract job title from translations or fallback
    const jobTitle = app.job?.translations?.en?.title || 
                     app.job?.translations?.ar?.title || 
                     app.job?.translations?.am?.title || 
                     app.job?.translations?.om?.title || 
                     app.job?.title || 
                     'N/A';
    
    return [
      app._id.toString(),
      app.firstName || '',
      app.lastName || '',
      app.email || '',
      app.phone || '',
      app.location || '',
      jobTitle,
      app.job?.company || 'N/A',
      app.status || 'pending',
      app.rating || '0',
      app.yearsOfExperience || '0',
      app.currentCompany || '',
      app.expectedSalary || '',
      app.linkedIn || '',
      app.portfolio || '',
      app.resume?.url || '',
      app.createdAt ? new Date(app.createdAt).toLocaleString() : '',
      app.viewedAt ? new Date(app.viewedAt).toLocaleString() : ''
    ];
  });

  // Escape CSV values
  const escapeCSV = (value) => {
    if (value === null || value === undefined) return '';
    const stringValue = String(value);
    if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
      return `"${stringValue.replace(/"/g, '""')}"`;
    }
    return stringValue;
  };

  // Build CSV string
  const csvContent = [
    headers.map(escapeCSV).join(','),
    ...rows.map(row => row.map(escapeCSV).join(','))
  ].join('\n');

  return csvContent;
};

exports.generateExcel = (applications) => {
  // For Excel, we'll use a simple HTML table format that Excel can open
  const headers = [
    'Application ID', 'First Name', 'Last Name', 'Email', 'Phone', 'Location',
    'Job Title', 'Company', 'Status', 'Rating', 'Years of Experience',
    'Current Company', 'Expected Salary', 'LinkedIn', 'Portfolio',
    'Resume URL', 'Applied Date', 'Viewed Date'
  ];

  const rows = applications.map(app => {
    // Extract job title from translations or fallback
    const jobTitle = app.job?.translations?.en?.title || 
                     app.job?.translations?.ar?.title || 
                     app.job?.translations?.am?.title || 
                     app.job?.translations?.om?.title || 
                     app.job?.title || 
                     'N/A';
    
    return `
    <tr>
      <td>${app._id}</td>
      <td>${app.firstName || ''}</td>
      <td>${app.lastName || ''}</td>
      <td>${app.email || ''}</td>
      <td>${app.phone || ''}</td>
      <td>${app.location || ''}</td>
      <td>${jobTitle}</td>
      <td>${app.job?.company || 'N/A'}</td>
      <td>${app.status || 'pending'}</td>
      <td>${app.rating || '0'}</td>
      <td>${app.yearsOfExperience || '0'}</td>
      <td>${app.currentCompany || ''}</td>
      <td>${app.expectedSalary || ''}</td>
      <td>${app.linkedIn || ''}</td>
      <td>${app.portfolio || ''}</td>
      <td>${app.resume?.url || ''}</td>
      <td>${app.createdAt ? new Date(app.createdAt).toLocaleString() : ''}</td>
      <td>${app.viewedAt ? new Date(app.viewedAt).toLocaleString() : ''}</td>
    </tr>
    `;
  }).join('');

  const html = `
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #14b8a6; color: white; font-weight: bold; }
          tr:nth-child(even) { background-color: #f2f2f2; }
        </style>
      </head>
      <body>
        <h1>Job Applications Export</h1>
        <p>Generated: ${new Date().toLocaleString()}</p>
        <table>
          <thead>
            <tr>
              ${headers.map(h => `<th>${h}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </body>
    </html>
  `;

  return html;
};
