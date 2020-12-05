const express = require("express");
const app = express();

const loginRoutes = require('./api/routes/login');
var registerRoutes = require('./api/routes/register');

app.use('/login', loginRoutes);
app.use('/register', registerRoutes);

module.exports = app;