const User = require("../models/user.model");

// Follow a user
exports.followUser = async (req, res) => {
  const { userId } = req.params;
  const { followerId } = req.params;

  try {
    // Find the user to follow
    const userToFollow = await User.findById(userId).exec();
    const followerUser = await User.findById(followerId).exec();

    if (!userToFollow || !followerUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the follower is already following the user
    if (!followerUser.following.includes(userId)) {
      followerUser.following.push(userId);
      await followerUser.save();
    }

    // Add the follower to the user's followers
    if (!userToFollow.followers.includes(followerId)) {
      userToFollow.followers.push(followerId);
      await userToFollow.save();
    }

    res.status(201).json({ message: "User followed successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};

// Unfollow a user
exports.unfollowUser = async (req, res) => {
  const { userId } = req.params;
  const { followerId } = req.params;

  try {
    // Find the user to unfollow
    const userToUnfollow = await User.findById(userId).exec();

    // Find the follower user
    const followerUser = await User.findById(followerId).exec();

    // Check if both user exists
    if (!userToUnfollow || !followerUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Remove the follower from the user's followers
    userToUnfollow.followers.pull(followerId);
    await userToUnfollow.save();

    // Remove the user from the follower's following list
    followerUser.following.pull(userId);
    await followerUser.save();

    res.status(200).json({ message: "User unfollowed successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
