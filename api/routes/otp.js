const express = require("express");
const nodeMailer = require("nodemailer");
const newOtp = require("../models/otpSchema");
const newUser = require("../models/user");
const router = express.Router();

function getOTP(len) {
    var digits = '0123456789';
    var otp = '';
    const length = len;

    for (let i = 1; i <= length; i++) {
        var index = Math.floor(Math.random() * (digits.length));
        otp = otp + digits[index];
    }
    return otp;
}

router.post('/get', async (req, res, next) => {
    /*try {
        
    } catch (error) {
        res.send(error);
    }*/

    //
    const check = await newUser.findOne(req.body);
    if (check != null) {
        const OTP = getOTP(4);
        const doc = new newOtp({
            userID: req.body._id,
            userEmailId: req.body.userEmailId,
            userOtp: OTP
        });
        const email = doc["userEmailId"];
        var transporter = nodeMailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'fpersonalgrowthpyramid@gmail.com',
                pass: 'Personal-growth-request'
            }
        });

        var mailOptions = {
            from: 'fpersonalgrowthpyramid@gmail.com',
            to: email,
            subject: '[password reset]Personal Growth Development Project Team',
            //text: 'Your OTP: ' + OTP,
            html: '<h1>Your OTP: </h1><h2>' + OTP + '</h2>'
        };

        doc.save((error) => {
            if (error) {
                console.log("could not save data" + error);
            } else {
                console.log("data was saved!");
                res.json({
                    success: true,
                    otp: OTP
                });
            }
        });

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                res.send(404).json({
                    success: false
                });
            } else {
                console.log('Email sent! ');
            }
        });
    } else {
        console.log("email id not found!");
        res.json({
            success: false
        });
    }

    //console.log(OTP);    
});

router.post('/checkotp', async (req, res, next) => {
    const check = await newOtp.findOne(req.body);
    if (check != null) {
        res.json({
            success: true
        });
    } else {
        res.json({
            success: false
        });
    }
});

module.exports = router