const express = require("express");
const router = express.Router();

function getOTP(){
    var digits = '0123456789';
    var otp = '';
    var length = 4;

    for(let i=1; i <= Length; i++){
        var index = Math.floor(Math.random()*(digits.length));
        otp = otp + digits[index];
    }
    return otp;
}

router.post('/', (req, res, next) => {
    res.send(200);
});