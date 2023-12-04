/*
 * Title: Node mailer
 * Description: Node mailer utils here
 * Author: Joy Sarkar
 * Date: 30-Nov-2023
 */

const nodemailer = require("nodemailer");

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  auth: {
    user: process.env.NODE_MAILER_EMAIL,
    pass: process.env.NODE_MAILER_PASSWORD,
  },
});

// Function to send a reset password email
const sendResetPasswordEmail = async (to, resetLink) => {
  const mailOptions = {
    from: "no-reply@interstock-web.com",
    to: to,
    subject: "Reset Your Password",
    html: `<p>Click the following link to reset your password:</p><a href="${resetLink}">${resetLink}</a>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Reset password email sent successfully.");
  } catch (error) {
    console.error("Error sending reset password email:", error);
  }
};

module.exports = {
  sendResetPasswordEmail,
};
