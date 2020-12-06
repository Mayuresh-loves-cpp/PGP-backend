const express = require("express");
const nodeMailer = require("nodemailer");
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
    const doc = req.body;
    const email = doc["userEmailId"];
    const OTP = getOTP(4);

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

    transporter.sendMail(mailOptions, function (error, info){
        if(error){
            console.log(error);
            res.send(404).json({
                status: false
            });
        }
        else{
            console.log('Email sent! ');
            res.json({
                status: true
            });
        }
    });

    //console.log(OTP);
    
});

module.exports= router