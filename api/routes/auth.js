const express = require("express");
const app = require("../../app");

const router = express.Router();
const newUser = require("../models/user");
//const loginUser = require("../models/login");
const mongoose = require("mongoose");

/*router.get('/login', (req, res, next) => {
    try {
        const luser = new loginUser({
            userEmailId: req.body.userEmailId,
            password: req.body.password
        });
    } catch (error) {
        console.log(error);
    }
});*/

router.post('/login', async (req, res, next) => {
    /*try {
        var userDetails = {
            userMail: req.body.userEmailId,
            userPassword: req.body.password
        };*/
        //const id = req.params.uid;
        const doc = await newUser.findOne(req.body);
        const data = JSON.parse(JSON.stringify(doc));
        if(doc != null){
            delete data.password;
            console.log("This is login api", data)
            res.json({
                success: true,
                data: data
            });
        }
        else{
            console.log("user not found", doc)
            res.json({
                success: false,
                data: doc
            });
        }
        
        
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
        console.log("new user registered");
        res.json({
            success: true
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false
        });
    }
});

module.exports= router