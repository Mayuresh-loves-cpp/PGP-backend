const jwt = require('jsonwebtoken')
const User = require('../models/user')

module.exports = {
    checkUser: (req, res, next) => {
        const token = req.body.token;
        console.log('req body token', req.body.token);
        if (token) {
            jwt.verify(token, process.env.SECRET_TOKEN, async (err, decodedToken) => {
                delete req.body.token;
                if (err) {
                    console.log('invalid token')
                    res.locals.user = null;
                    res.locals.error = err;
                    next();
                } else {
                    console.log('valid token')
                    res.locals.user = await User.findById(decodedToken.userID);
                    next();
                }
            });
        } else {
            console.log('token not provided')
            res.locals.user = null;
            next();
        }
    },
}