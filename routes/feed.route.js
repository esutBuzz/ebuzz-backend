const express = require("express");
const router = express.Router();
const feedController = require("../controllers/feed.controller");

// Get the feed for a user
router.get("/users/:userId/feed", feedController.getFeed);

module.exports = router;
