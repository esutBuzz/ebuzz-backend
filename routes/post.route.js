const express = require("express");
const router = express.Router();
const postController = require("../controllers/post.controller");
const commentRoute = require("./comment.route");
const uploadMiddleware = require("../middlewares/uploadMiddleware")
const isAuth = require("../middlewares/check-auth")

// Linking the posts route to comment route
router.use(commentRoute)

// create a new post from a particular username
router.post("/users/@:username/posts", isAuth, uploadMiddleware, postController.createPost);

// Get all posts from a particular username
router.get("/users/@:username/posts", isAuth, postController.getAllPostsFromAHandle);

// Create a new post
router.post("/users/:userId/posts", isAuth, uploadMiddleware, postController.createPost);

// Get all posts
router.get("/users/:userId/posts", isAuth, postController.getAllPosts);

// Get a post by ID
router.get("/users/:userId/posts/:postId", isAuth, postController.getPostById);

// Update a post by ID
// router.put("/users/:userId/posts/:postId", postController.updatePostById);
router.put("/users/post/editPost", isAuth, postController.updatePostById);

// Delete a post by ID
router.delete("/users/:userId/posts/:postId", isAuth,  postController.deletePostById);

module.exports = router;
