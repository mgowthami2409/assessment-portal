// Use nodemailer or similar to send emails

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  // Configure SMTP transport options here
  host: 'smtp.example.com',
  port: 587,
  auth: {
    user: 'username',
    pass: 'password',
  },
});

exports.sendAssessmentLink = async (toEmail, link) => {
  const mailOptions = {
    from: '"Assessment System" <no-reply@yourdomain.com>',
    to: toEmail,
    subject: 'Assessment Approval Needed',
    text: `Please review the assessment: ${link}`,
    html: `<p>Please review the assessment:</p><a href="${link}">${link}</a>`,
  };
  await transporter.sendMail(mailOptions);
};
