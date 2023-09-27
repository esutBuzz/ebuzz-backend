const express = require("express");
const router = express.Router();
const communityController = require("../controllers/community.controller");

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

module.exports = router;
