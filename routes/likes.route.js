const express = require('express');
const router = express.Router();
const likeController = require("../controllers/likes.controller")


// Route to create a like
router.post('/users/:userId/posts/:postId/likePost', likeController.likePost);

// Route to remove a like
router.post('/users/:userId/posts/:postId/unlikePost', likeController.unlikePost);

module.exports = router;
