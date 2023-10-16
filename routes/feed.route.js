const express = require("express");
const router = express.Router();
const feedController = require("../controllers/feed.controller");
const isAuth = require("../middlewares/check-auth")

// Get the feed for a user
router.get("/users/:userId/feed", isAuth, feedController.getFeed);

module.exports = router;
