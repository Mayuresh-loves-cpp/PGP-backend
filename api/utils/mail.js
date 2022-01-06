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

const mailHTML = (otp) => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <link href="https://fonts.googleapis.com/css?family=Karla:400,700&display=swap" rel="stylesheet">
            <title>E-18 Credit Alert</title>
            <style type="text/css">
                body {
                    margin: 0;
                    padding: 0;
                    font-family: 'Karla', sans-serif;
                }
        
                table,
                td,
                tr {
                    vertical-align: top;
                    border-collapse: collapse;
                    ​
                }
        
                * {
                    line-height: inherit;
                    margin: 0;
                    padding: 0;
                }
        
                h1 {
                    width: 100%;
                }
        
                p {
                    font-weight: 500;
                    width: 100%;
                }
        
                span {
                    color: #7A869A;
                }
        
                r-pd {
                    padding-left: 1rem !important;
                    padding-right: 1rem !important;
                }
        
                @media only screen and (min-width:620px) {
                    .main-content {
                        width: 90% !important;
                    }
        
                    .big-graph {
                        width: 150px !important;
                        height: 150px !important;
                        margin-left: 50px !important;
                    }
        
                    p {
                        line-height: 28px;
                    }
        
                    r-pd {
                        padding-left: 2rem !important;
                        padding-right: 2rem !important;
                    }
                }
        
                @media only screen and (min-width:760px) {
                    .main-content {
                        width: 740px !important;
                    }
                }
        
                a {
                    color: #0081C2;
                    text-decoration: none
                }
            </style>
        </head>
        
        <body style="background: #F1F2F0; padding: 3rem 0;">
            <section class="main-content" style="margin: 0 auto; width: 95%;">
                <table class="bord" style="background: #41424E; width: 100%; height: 5px; border-radius: 0 0 5px 5px;"></table>
                <div style="width: 100%; padding-top: 3rem;background-color: #ffffff; box-sizing: border-box;">
                    <table style="">
                        <tbody style="width: 100%;">
                            <tr>
                                <td>
                                    <div class="r-pd"
                                        style="padding: 1rem 2rem; padding-bottom: 0; width: 100%; box-sizing: border-box;">
                                        <h1
                                            style="font-size: 30px; color: #222D23 ; font-family:  'Karla', sans-serif; margin-bottom: 1rem; text-align: center;">
                                            Personal Growth PYRAMID - PASSWORD RESET
                                        </h1>
                                        <p
                                            style="padding: 1rem 0; width: 100%; font-family: 'Karla', sans-serif; font-size: 16px; color:  #7A869A; font-weight: 400; padding-bottom: 3rem; line-height: 28px">
                                            Hello,
                                            <br>
                                            You have requested to reset password for your PGP acccount.
                                            Please find OTP below to complete this setup;
                                        </p>
                                        <p
                                            style="padding: 1rem 0; width: 100%; font-family: 'Karla', sans-serif; font-size: 16px; color:  #7A869A; font-weight: 400; border-top: 1px solid #F2F4F6; padding-bottom: 3rem; line-height: 28px; text-align: center;">
                                            ${otp}</p>
                                        <p
                                            style="padding: 1rem 0; width: 100%; font-family: 'Karla', sans-serif; font-size: 16px; color:  #7A869A; font-weight: 400; border-top: 1px solid #F2F4F6; padding-bottom: 3rem; line-height: 28px; text-align: center;">
                                            If you did not request this setup, please ignore this email.</p>
                                        </p>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div style="background-color: #41424E; width: 100%;">
                    <table style="width: 100%;">
                        <tr>
                            <td>
                                <div style="padding: 3rem; color: #FFFFFF">
                                    <p style="font-size: 14px; display: inline;">
                                        <span style="color: #FFFFFF">Mailing Address:</span>
                                        <br>
                                        <span style="color: #ffffff;">15B, Oduduwa Crescent, Lagos, Nigeria.</span>
                                    </p>
                                    <p style="margin: 0; font-size: 14px; color: #FFFFFF; text-align: left">Copyright © 2020
                                        E-18</p>
                                    <p style="margin: 0; font-size: 14px; color: #FFFFFF; text-align: left"><a
                                            href="">hello@softcom.ng</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<a href="">080
                                            00500 000</a>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            </section>
        </body>
    `
}

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
            // text: `Here is the otp: ${otp}`,
            html: mailHTML(otp),
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
