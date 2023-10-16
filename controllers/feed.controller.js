const User = require("../models/user.model");
const Post = require("../models/post.model");

// Get the feed for a user
exports.getFeed = async (req, res) => {
  const { userId } = req.params;

  try {
    // Find the user's connections or friends (users they follow)
    const user = await User.findById(userId).exec();
    
    console.log("User Connections:", user.following);

    // Find posts from the user's connections and the user
    const feedPosts = await Post.find({ author: { $in:[...user.following, userId]} })
      .sort({ createdAt: -1 }) // Sort by most recent posts first
    
    res.status(200).json(feedPosts);
    console.log("Feed Posts:", feedPosts);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};
