// const nodemailer = require('nodemailer');
import * as nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_MAIL as string,
    pass: process.env.GMAIL_PASSWORD as string,
  },
});

export const SendEmail = async (email: string) => {
  const mailOptions = {
    from: "developerb989@gmail.com",
    to: email,
    subject: "Invitation Link",
    text: "That was easy!",
  };
  const data = await transporter.sendMail(mailOptions);
//   console.log(data)
};