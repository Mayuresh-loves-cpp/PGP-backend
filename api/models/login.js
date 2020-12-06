const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    userEmailId: String,
    password: String,
});