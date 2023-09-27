const express = require("express");
const router = express.Router();
const followController = require("../controllers/follower.controller");

// Follow a user
router.post("/users/:userId/follow/:followerId", followController.followUser);

// Unfollow a user
router.post("/users/:userId/unfollow/:followerId", followController.unfollowUser);

module.exports = router;
