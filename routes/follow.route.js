const express = require("express");
const router = express.Router();
const followController = require("../controllers/follower.controller");
const isAuth = require("../middlewares/check-auth")

// Follow a user
router.post("/users/:userId/follow/:followerId", isAuth, followController.followUser);

// Unfollow a user
router.post("/users/:userId/unfollow/:followerId", isAuth, followController.unfollowUser);

// get all followers
router.get('/users/followers', isAuth, followController.getFollowers)

module.exports = router;
