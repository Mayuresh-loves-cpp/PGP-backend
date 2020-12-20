// const express = require("express");
// const router = express.Router();

// router.get("/userID", (req, res, next) => {
//     res.status(200).json({
//         message: 'got login data'
//     });
// });

// router.post("/", (req, res, next) => {
//     res.status(200).json({
//         message: 'sending acknowledgement login data'
//     });
// });

// const anotherRouter = express.Router();

// anotherRouter.get("/:userID/:userPassword", (req, res, next) => {
//     const id = req.params.userID;
//     const password = req.params.userPassword;
//     if(id == "Mayuresh"){
//         if(password == "mayuresh"){
//             res.status(200).json({
//                 message: "Hi Mayuresh!"
//             });
//         }
//         else{
//             res.status(200).json({
//                 message: "Mayuresh your password is incorrect"
//             });
//         }
//     }
//     else{
//         res.status(200).json({
//             message: "please reload page!"
//         });
//     }
// });

// module.exports = {router, anotherRouter};