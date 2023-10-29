const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");
const commentRoute = require("./comment.route");
const uploadMiddleware = require("../middlewares/uploadMiddleware")
// const isAuth = require("../middlewares/check-auth")

// Linking the posts route to comment route
router.use(commentRoute)

// create a new post from a particular username
router.post("/users/@:username/posts", uploadMiddleware, postController.createPost);

// Get all posts from a particular username
router.get("/users/@:username/posts", postController.getAllPostsFromAHandle);

// Create a new post
router.post("/users/:userId/posts", uploadMiddleware, postController.createPost);

// Get all posts
router.get("/users/:userId/posts", postController.getAllPosts);

// Get all existing post on the database
router.get("/users/posts/allPosts", postController.getAllExistingPosts)

// Get a post by ID
router.get("/users/:userId/posts/:postId", postController.getPostById);

// Update a post by ID
// router.put("/users/:userId/posts/:postId", postController.updatePostById);
router.put("/users/post/editPost", postController.updatePostById);

// Delete a post by ID
router.delete("/users/:userId/posts/:postId",  postController.deletePostById);

module.exports = router;
