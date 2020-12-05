const express = require("express");
const app = express();

// const { loginRoutes } = require('./api/routes/login');
// var registerRoutes = require('./api/routes/register');

const authRoute = require('./api/routes/auth')
const indexRoute = require('./api/routes/index')

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/', indexRoute);
// app.use('/register', registerRoutes);

module.exports = app;