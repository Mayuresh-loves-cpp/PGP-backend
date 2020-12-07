const express = require("express");
const nodeMailer = require("nodemailer");
const newOtp = require("../models/otpSchema");
const router = express.Router();

function getOTP(len){
    var digits = '0123456789';
    var otp = '';
    const  length = len;

    for(let i=1; i <= length; i++){
        var index = Math.floor(Math.random()*(digits.length));
        otp = otp + digits[index];
    }
    return otp;
}

router.post('/get', (req, res, next) => {
    /*try {
        
    } catch (error) {
        res.send(error);
    }*/
    
    //
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
                status: true,
                otp: OTP
            });
        }
    });

    transporter.sendMail(mailOptions, function (error, info){
        if(error){
            console.log(error);
            res.send(404).json({
                status: false
            });
        }
        else{
            console.log('Email sent! ');
        }
    });
    //console.log(OTP);    
});

module.exports= router