// imports
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const port = process.env.PORT || 3000;
require("dotenv").config();
require("./api/utils/initMongodb");

// api routes vars
const auth = require("./api/routes/auth");
const ques = require("./api/routes/question");
const survey = require("./api/routes/survey");

app.use(cors());
app.use(morgan("dev"));
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());

// routing
app.use("/api/v1/auth/", auth);
app.use("/api/v1/questions", ques);
app.use("/api/v1/survey", survey);

// starting server and listening to requests
app.listen(port, (error) => {
    if (error) {
        console.log("unable to start server!");
    } else {
        console.log(
            `Server started at port ${port}\nBrowse at http://localhost:${port}/api/v1/`
        );
    }
});