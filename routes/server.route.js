const express = require("express");
const route = express.Router();
const userRoute = require("./user.route");
const postRoute = require("./post.route");
const authRoute = require("./auth.route");
const likesRoute = require('./likes.route');
const eventRoute = require("./event.route")
const followRoute = require("./follow.route");
const communityRoute = require("./community.route");
const feedRoute = require("./feed.route")
// const greeting = require("../utils/greeting")rs


// Calling all routes
route
    .use("/", authRoute)
    .use("/users", userRoute)
    .use("/", postRoute)
    .use("/", likesRoute)
    .use("/", eventRoute)
    .use("/", followRoute)
    .use("/", communityRoute)
    .use("/", feedRoute)
//   .get("/", (req, res) => {
//     res.send(greeting);
//   })
//   .get("/docs", (req, res) => res.redirect(process.env.API_DOCS_URL));

module.exports = route;
