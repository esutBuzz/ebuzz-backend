const express = require("express");
const route = express.Router();
const userRoute = require("./user.route");
const postRoute = require("./post.route");
const authRoute = require("./auth.route");
const greeting = require("../utils/greeting")
const likesRoute = require('../routes/likes.route');

// Calling all routes
route
    .use("/", authRoute)
    .use("/users", userRoute)
    .use("/", postRoute)
    .use('/likes', likesRoute)
//   .get("/", (req, res) => {
//     res.send(greeting);
//   })
//   .get("/docs", (req, res) => res.redirect(process.env.API_DOCS_URL));

module.exports = route;
