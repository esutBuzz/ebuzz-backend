const express = require("express");
const router = express.Router();
const communityController = require("../controllers/community.controller");
const isAuth = require("../middlewares/check-auth")

// Join a community
router.post("/users/:userId/join-community/:communityId", isAuth, communityController.joinCommunity);

// Leave a community
router.post("/users/:userId/leave-community/:communityId", isAuth, communityController.leaveCommunity);

// Create a community
router.post("/communities", isAuth, communityController.createCommunity);

// Update a community by ID
router.put("/communities/:communityId", isAuth, communityController.updateCommunityById);

// Delete a community by ID
router.delete("/communities/:communityId", isAuth, communityController.deleteCommunityById);

// Define the route to fetch all members of a community
router.get('/communities/:communityId/members', isAuth, communityController.getCommunityMembers);

module.exports = router;
