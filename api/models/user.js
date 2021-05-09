/*************************************************
 * 
 * database schema for user
 * 
 *************************************************/

// inporting mongoose
const mongoose = require("mongoose");

// initializing salt for hashing
bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;

// user schema structure
const userSchema = mongoose.Schema({
    userEmailId: {
        type: String,
        required: true,
        // lowercase: true,
        // unique: true
    },
    password: {
        type: String,
        required: true,
    },
    admin: {
        type: Boolean,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
});

// exporting user model
// module.exports = mongoose.model("users", userSchema)

// hashing password before saving in database
userSchema.pre('save', function (next) {
    const user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.validPassword = async (password, hashed) => {
    console.log("checking password")
    console.log('passwords to be compared: ', password, hashed)
    const result = await bcrypt.compare(password, hashed)
    console.log("returning ", result)
    return result
};


const User = mongoose.model("users", userSchema)

module.exports = User