const jwt = require('jsonwebtoken')
const User = require('../models/user')

module.exports = {
    checkUser: (req, res, next) => {
        const token = req.body.jwt;
        if (token) {
            jwt.verify(token, process.env.SECRET_TOKEN || 'test secret', async (err, decodedToken) => {
                if (err) {
                    res.locals.user = null;
                    next();
                } else {
                    res.locals.user = await User.findById(decodedToken.id);
                    next();
                }
            });
        } else {
            res.locals.user = null;
            next();
        }
    },
    
}