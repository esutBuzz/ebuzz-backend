const express = require("express");
const router = express.Router();
const communityController = require("../controllers/community.controller");
// const isAuth = require("../middlewares/check-auth")

// Join a community
router.post("/users/:userId/join-community/:communityId", communityController.joinCommunity);

// Leave a community
router.post("/users/:userId/leave-community/:communityId", communityController.leaveCommunity);

// Create a community
router.post("/communities", communityController.createCommunity);

// Update a community by ID
router.put("/communities/:communityId", communityController.updateCommunityById);

// Delete a community by ID
router.delete("/communities/:communityId", communityController.deleteCommunityById);

// Define the route to fetch all members of a community
router.get('/communities/:communityId/members', communityController.getCommunityMembers);

module.exports = router;
