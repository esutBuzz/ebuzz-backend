const express = require('express');
const router = express.Router();
const likeController = require("../controllers/likes.controller")


// Route to create a like
router.post('/like', likeController.likePost);

// Route to remove a like
router.post('/unlike', likeController.unlikePost);

module.exports = router;
