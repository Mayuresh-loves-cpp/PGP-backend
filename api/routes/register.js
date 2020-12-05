const express = require("express");
const registerRouter = express.Router();

registerRouter.get("/", (req, res, next) => {
    res.status(200).json({
        message: 'in register page'
    });
});