// backend/utils/mailer.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // or use 'hotmail', 'yahoo', etc.
  auth: {
    user: process.env.EMAIL_USER,     // your email
    pass: process.env.EMAIL_PASS      // your app password
  }
});

const sendFeedbackNotification = async (feedback) => {
  const mailOptions = {
    from: `"Feedback Bot" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL,  // the admin receiving feedback
    subject: '📬 New Feedback Received',
    html: `
      <h3>New Feedback Submitted</h3>
      <p><strong>Name:</strong> ${feedback.name}</p>
      <p><strong>Email:</strong> ${feedback.email}</p>
      <p><strong>Category:</strong> ${feedback.category}</p>
      <p><strong>Rating:</strong> ${feedback.rating}</p>
      <p><strong>Comments:</strong> ${feedback.comments}</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendFeedbackNotification;
