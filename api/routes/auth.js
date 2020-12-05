const express = require("express");
const app = require("../../app");
const router = express.Router();


router.get('/login', (req, res, next) => {
    try {
        console.log("This is login api")
        res.send("This is login api")
    } catch (error) {
        res.send(error)
    }
})

router.get('/register', (req, res, next) => {
    try {
        console.log("This is login api")
        res.send("This is login api")
    } catch (error) {
        res.send(error)
    }
})

module.exports= router