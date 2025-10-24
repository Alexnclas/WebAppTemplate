const nodemailer = require("nodemailer");

// Tu peux utiliser un compte Gmail, Outlook, ou un SMTP personnalisé
// Pour Gmail : attention, il faut un "App Password" si tu as l'authentification 2FA activée
console.log("Mail transporter", process.env.SMTP_HOST,  process.env.SMTP_USER,  process.env.SMTP_PASS)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,          // ex: smtp.gmail.com
  port: 465,
  secure: true,                        
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function sendEmail(to, subject, html) {
  try {
    const info = await transporter.sendMail({
      from: `"My App" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html, 
    });
    console.log("Email sent: %s", info.messageId);
  } catch (err) {
    console.error("Error sending email:", err);
    throw err;
  }
}

module.exports = sendEmail;