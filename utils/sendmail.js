require('dotenv').config();
const nodemailer = require("nodemailer");
const ejs = require('ejs');
const path = require('path');
const emailPassword = process.env.EMAIL_PASSWORD;

// Create a transporter for sending email (you can configure it based on your email provider)
const sendMail =  (email, message) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'primekings.kc@gmail.com',
            pass: emailPassword,
        },
    });

    const templatePath = path.join(__dirname, 'emailPage.html');

    ejs.renderFile(templatePath, { message }, (err, message) => {
        if (err) {
            console.log(err);
        } else {
            const mailOptions = {
                from: 'kingsleycj2020@gmail.com',
                to: email,
                subject: 'Password reset OTP',
                html: message, // Using the rendered HTML content
            };
    
            // Send the email
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                    return new Error(error)
                } else {
                    console.log('Email sent: ' + info.response);
                    console.log(info)
                    return info
                }
            });
        }
    });
}

module.exports = sendMail