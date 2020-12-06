const express = require("express");
const app = require("../../app");

const router = express.Router();
const newUser = require("../models/user");
const mongoose = require("mongoose");


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
        const user = new newUser({
            userEmailId: req.body.userEmailId,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        });
        user.save().then(result => {
            console.log(result);
        })
        .catch(error => {
            console.log(error);
        });
        console.log("This is login api")
        res.send("This is login api")
    } catch (error) {
        res.send(error)
    }
})

module.exports= router