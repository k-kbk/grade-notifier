import nodemailer from 'nodemailer';

export default async function sendEmail(subject, text) {
  const NAVER_MAIL = process.env.NAVER_MAIL;
  const NAVER_PW = process.env.NAVER_PW;
  const TO_EMAIL = process.env.TO_EMAIL;

  const transporter = nodemailer.createTransport({
    service: 'naver',
    host: 'smtp.naver.com',
    port: 465,
    auth: {
      user: NAVER_MAIL,
      pass: NAVER_PW,
    },
  });

  const mailOptions = {
    from: NAVER_MAIL,
    to: TO_EMAIL,
    subject,
    text,
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      transporter.close();
    }
  });
}
