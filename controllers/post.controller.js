const Post = require("../models/post.model");
const path = require('path');

// Function to validate input fields
const validateInput = (author, content) => {
  if (!author || !content) {
    throw new Error('Author and content are required fields.');
  }
  // You can add more validation checks as needed
};

// Create a new post
exports.createPost = async (req, res) => {
  const { author, content } = req.body;
  validateInput(author, content);
  console.log("authorId : " + author)
  console.log(req.files)

    const files = req.files || []; // Assuming req.files is an array of uploaded files
    const filePaths = files.map(file => file.path); // Store file paths

  try {
    const post = await Post.create({
      author,
      content,
      files: filePaths 
    });
    res.status(201).json({
      message: "Post made successfully",
      post: post
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error occurred while creating post" });
  }
};

// Get all posts by ID
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({author: req.params.userId, deleted: false})
    .populate({ path: "author", select: "username" })
    .sort({createdAt : - 1})
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error occurred while fetching posts" });
  }
};

// get all posts from a handle
exports.getAllPostsFromAHandle = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.params.username, deleted: false })
      .sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error occurred while fetching posts" });
  }
};

// Get a post by ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findOne({
      _id: req.params.postId, author: req.params.userId,
      deleted: false,
    })
    .populate({ path: "author", select: "username" });
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "An error occurred while fetching post" });
  }
};

// Update a post by ID
exports.updatePostById = async (req, res) => {
  try {
    const post = await Post.findOneAndUpdate(
      { _id: req.params.postId },
      req.body,
      {
        new: true,
      }
    ).populate("author", "content", "image");
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error occurred while updating post" });
  }
};

// Delete a post by ID
exports.deletePostById = async (req, res) => {
try {
  await Post.findOneAndUpdate(
    { _id: req.params.postId, author: req.params.userId },
    { deleted: true },
    { new: true }
  )
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "Post deleted successfully",
      });
    });
} catch (error) {
  console.log(error);
  res.status(500).json({ error: "An error occurred while deleting post" });
}
};
