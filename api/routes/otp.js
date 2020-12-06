const express = require("express");
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
    const OTP = getOTP(4);
        console.log(OTP);
        res.send("in get otp " + OTP);
});

module.exports= router