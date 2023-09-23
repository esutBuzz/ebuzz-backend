const User = require("../models/follower.model")
// Route to follow a user
exports.followUser =  async (req, res) => {
    const { followerId, followeeId } = req.body;
  
    try {
      // Find the follower and followee
      const follower = await User.findById(followerId).exec();
      const followee = await User.findById(followeeId).exec();
  
      // Check if both users exist
      if (!follower || !followee) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Check if the follower is already following the followee
      if (follower.followers.includes(followeeId)) {
        return res.status(400).json({ error: 'Already following' });
      }
  
      // Add the followee to the follower's followers list
      follower.followers.push(followeeId);
      await follower.save();
  
      res.status(201).json({ message: 'Followed successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // Route to unfollow a user
exports.unfollowUser = async (req, res) => {
    const { followerId, followeeId } = req.body;
  
    try {
      // Find the follower and followee
      const follower = await User.findById(followerId).exec();
      const followee = await User.findById(followeeId).exec();
  
      // Check if both users exist
      if (!follower || !followee) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Check if the follower is not following the followee
      if (!follower.followers.includes(followeeId)) {
        return res.status(400).json({ error: 'Not following' });
      }
  
      // Remove the followee from the follower's followers list
      follower.followers = follower.followers.filter((id) => id.toString() !== followeeId);
      await follower.save();
  
      res.json({ message: 'Unfollowed successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };