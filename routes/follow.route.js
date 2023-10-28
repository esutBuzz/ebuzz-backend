const express = require("express");
const router = express.Router();
const followController = require("../controllers/follower.controller");
// const isAuth = require("../middlewares/check-auth")

// Follow a user
router.post("/users/:userId/follow/:followerId", followController.followUser);

// Unfollow a user
router.post("/users/:userId/unfollow/:followerId", followController.unfollowUser);

// get all followers
router.get('/users/followers', followController.getFollowers)

module.exports = router;
