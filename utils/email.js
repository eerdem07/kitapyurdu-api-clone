const nodemailer = require('nodemailer');

const sendMail = async (content) => {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: 'kitapyurdu.com',
    to: content.email,
    subject: content.subject,
    text: content.text,
    html: content.html,
  });
};

module.exports = sendMail;
