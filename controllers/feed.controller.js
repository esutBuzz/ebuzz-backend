const User = require("../models/user.model");
const Post = require("../models/post.model");

// Get the feed for a user
exports.getFeed = async (req, res) => {
  const { userId } = req.params;

  try {
    // Find the user's connections or friends (users they follow)
    const user = await User.findById(userId).exec();
    const userConnections = user.following;

    // Include the user's own posts in the feed
    userConnections.push(userId);
    console.log("User Connections:", userConnections);

    // Find posts from the user's connections and the user
    const feedPosts = await Post.find({ author: { $in: userConnections } })
      .sort({ createdAt: -1 }) // Sort by most recent posts first
      .populate({ path: "author", select: "username" }) // Populate author info

    res.status(200).json(feedPosts);
    console.log("Feed Posts:", feedPosts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
