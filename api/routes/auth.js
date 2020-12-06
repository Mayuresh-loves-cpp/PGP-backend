const express = require("express");
const app = require("../../app");

const router = express.Router();
const newUser = require("../models/user");
const mongoose = require("mongoose");


router.post('/login', async (req, res, next) => {
    /*try {
        var userDetails = {
            userMail: req.body.userEmailId,
            userPassword: req.body.password
        };*/
        //const id = req.params.uid;
        const doc = await newUser.findOne(req.body)
        /*.then(doc => {
            console.log(doc);
            res.status(200).json({doc});
            res.send("user was found!");
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
            res.send("got some error");
        });*/
        console.log("This is login api", doc)
        res.json(doc);
    /*} catch (error) {
        res.send(error)
    }*/
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