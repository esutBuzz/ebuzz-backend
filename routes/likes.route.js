const express = require('express');
const router = express.Router();
const likeController = require("../controllers/likes.controller")


// Route to create a like
router.post('/users/:userId/posts/:postId/likePost', likeController.likePost);

// Route to remove a like
router.post('/users/:userId/posts/:postId/unlikePost', likeController.unlikePost);

// // Route to create a like on an event
// router.post('/users/:userId/events/:eventsId/likeEvent', likeController.likePost);

// // Route to remove a like on an event
// router.post('/users/:userId/events/:eventsId/unlikeEvent', likeController.unlikePost);

module.exports = router;
