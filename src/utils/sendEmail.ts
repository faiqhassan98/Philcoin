// @ts-nocheck
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.GMAIL_MAIL as string,
        pass: process.env.GMAIL_PASSWORD as string,
    },
});

export const SendEmail = (email: string): Promise<any> => {
    const mailOptions = {
        from: 'developerb989@gmail.com',
        to: email,
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else { 
            console.log('Email sent: ' + info.response);
        }
    });
}