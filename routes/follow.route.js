const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Follow a user
router.post("/users/:userId/follow", userController.followUser);

// Unfollow a user
router.post("/users/:userId/unfollow", userController.unfollowUser);

module.exports = router;
