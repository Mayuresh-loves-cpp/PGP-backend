// otp mailing helper functions

// imports
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const { gmail } = require("googleapis/build/src/apis/gmail");
require("dotenv").config();

// global env vars
const CLIENTID = process.env.GOOGLE_OAUTH_CLIENTID;
const CLIENT_SECRET = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.GOOGLE_API_REFRESH_TOKEN;
const REDIRECT_URL = process.env.OAUTH_REDIRECT_URL;

// env imports
const EMAIL_USER = process.env.OAUTH_TEST_USER;

const OAuth2Client = new google.auth.OAuth2(
    CLIENTID,
    CLIENT_SECRET,
    REDIRECT_URL
);

OAuth2Client.setCredentials({
    refresh_token: REFRESH_TOKEN,
});

const sendMail = async (email, otp) => {
    try {
        const accessToken = await OAuth2Client.getAccessToken();
        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: EMAIL_USER,
                clientId: CLIENTID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken,
            },
        });
        const mailOptions = {
            from: `"PERSONAL GROWTH PYRAMID 📧" <${EMAIL_USER}>`,
            to: email,
            subject: "Password reset otp",
            text: `Here is the otp: ${otp}`,
        };
        const response = await transport.sendMail(mailOptions);
        if (response) {
            console.log("mail successfully sent to email id:", email);
            return true;
        } else {
            console.log("error sending mail");
            return false;
        }
    } catch (error) {
        return false;
    }
};

module.exports = sendMail;
