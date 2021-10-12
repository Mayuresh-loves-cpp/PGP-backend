// otp mailing helper functions

// imports
const nodemailer = require('nodemailer');

// helper functions
const sendMail = async (email, otp) => {
    try {
        const transporter = nodemailer.createTransport({
            // host: "smtp.gmail.com",
            service: "gmail",
            port: 587,
            secure: false,
            auth: {
                // user: 'fpersonalgrowthpyramid@gmail.com',
                // pass: 'Personal-growth-request'
                user: process.env.HOST_EMAIL,
                pass: process.env.HOST_PASSWORD,
            }
        });

        const mailOptions = {
            from: process.env.HOST_EMAIL,
            to: email,
            subject: 'Password reset otp',
            text: 'Here is the otp: ' + otp,

        };

        const result = await transporter.sendMail(mailOptions);
        if (result) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error(error);
        return false;
    }
}

module.exports = sendMail;