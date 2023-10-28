const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comment.controller");
// const isAuth = require("../middlewares/check-auth")

// Create a new comment on a post
router.post("/users/:userId/posts/:postId/comments", commentController.createComment);

// Get all comments on a post
router.get("/users/:userId/posts/:postId/comments", commentController.getAllComments);

// Get a single comment by ID
router.get("/users/:userId/posts/:postId/comments/:commentId", commentController.getCommentById);

// Update a single comment by ID
// router.put("/users/:userId/posts/:postId/comments/:commentId", commentController.updateCommentById);
router.put("/users/post/comment/editComment", commentController.updateCommentById);

// Delete a single comment by ID
router.delete("/users/:userId/posts/:postId/comments/:commentId", commentController.deleteCommentById);

module.exports = router;
