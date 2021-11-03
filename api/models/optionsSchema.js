/*************************************************
 *
 * database schema for survey question options
 *
 *************************************************/

// importing mongoose
const mongoose = require("mongoose");

// survey response schema structure
const optionSchema = mongoose.Schema({
    questionID: mongoose.Types.ObjectId,
    forProfession: String,
    forOccupation: String,
    options: Array,
}, {
    timestamps: true,
});

// exporting schema
module.exports = mongoose.model("Usertype Options", optionSchema);