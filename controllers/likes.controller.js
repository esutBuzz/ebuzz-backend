const Post = require("../models/post.model")
exports.likePost = async (req, res) => {
    const { postId, userId } = req.body;
  
    try {
      // Find the post
      const post = await Post.findById(postId).exec();
  
      // Check if the post exists
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      // Check if the user has already liked the post
      if (post.likes.includes(userId)) {
        return res.status(400).json({ error: 'Already liked' });
      }
  
      // Add the user to the post's likes
      post.likes.push(userId);
      await post.save();
  
      res.status(201).json({ message: 'Liked successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // Route to unlike a post
 exports.unlikePost = async (req, res) => {
    const { postId, userId } = req.body;
  
    try {
      // Find the post
      const post = await Post.findById(postId).exec();
  
      // Check if the post exists
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      // Check if the user has not liked the post
      if (!post.likes.includes(userId)) {
        return res.status(400).json({ error: 'Not liked' });
      }
  
      // Remove the user from the post's likes
      post.likes = post.likes.filter((id) => id.toString() !== userId);
      await post.save();
  
      res.json({ message: 'Unliked successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };