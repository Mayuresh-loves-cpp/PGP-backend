const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const { loginRoutes } = require('./api/routes/login');
// var registerRoutes = require('./api/routes/register');

const authRoute = require('./api/routes/auth')
const indexRoute = require('./api/routes/index')
const otpRoute = require('./api/routes/otp');

mongoose.connect('mongodb://localhost:27017/tmp?readPreference=primary&appname=MongoDB%20Compass&ssl=false', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/otp', otpRoute);
app.use('/api/v1/', indexRoute);

// app.use('/register', registerRoutes);
/*app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})*/

/*app.use((error, res, req, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});*/

module.exports = app;