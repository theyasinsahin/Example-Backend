const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "your-email@example.com",
      pass: "your-password",
    },
    tls: {
        rejectUnauthorized: false
    }
  });

module.exports.sendVerificationCode = function(email, code) {
    const mailOptions = {
        from: 'your-email@example.com',
        to: email,
        subject: 'Verification Code',
        text: `Your verification code is: ${code}`
    };

    return transporter.sendMail(mailOptions);
};
