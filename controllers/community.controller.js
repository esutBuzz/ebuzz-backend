const User = require("../models/user.model");
const Community = require("../models/community.model");

// Join a community
exports.joinCommunity = async (req, res) => {
  const { userId } = req.params;
  const { communityId } = req.params;

  try {
    const user = await User.findById(userId).exec();
    const community = await Community.findById(communityId).exec();

    if (!user || !community) {
      return res.status(404).json({ error: "User or community not found" });
    }

    // Check if the user is already a member of the community
    if (!community.members.includes(user._id)) {
      community.members.push(user._id);
      await community.save();
    }

    res.status(201).json({ message: "User joined the community" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Leave a community
exports.leaveCommunity = async (req, res) => {
  const { userId } = req.params;
  const { communityId } = req.params;

  try {
    const user = await User.findById(userId).exec();
    const community = await Community.findById(communityId).exec();

    if (!user || !community) {
      return res.status(404).json({ error: "User or community not found" });
    }

    // Remove the user from the community's members
    const index = community.members.indexOf(user._id);
    if (index > -1) {
      community.members.splice(index, 1);
      await community.save();
    }

    res.status(200).json({ message: "User left the community" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};


// Create a new community
exports.createCommunity = async (req, res) => {
  const { name, description } = req.body;

  try {
    const community = await Community.create({ name, description });
    res
      .status(201)
      .json({ message: "Community created successfully", community });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Update a community by ID
exports.updateCommunityById = async (req, res) => {
  const { communityId } = req.params;
  const { name, description } = req.body;

  try {
    const community = await Community.findByIdAndUpdate(
      communityId,
      { name, description },
      { new: true }
    );

    if (!community) {
      return res.status(404).json({ error: "Community not found" });
    }

    res
      .status(200)
      .json({ message: "Community updated successfully", community });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Delete a community by ID
exports.deleteCommunityById = async (req, res) => {
  const { communityId } = req.params;

  try {
    const community = await Community.findByIdAndRemove(communityId);

    if (!community) {
      return res.status(404).json({ error: "Community not found" });
    }

    res.status(200).json({ message: "Community deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.getCommunityMembers = async (req, res) => {
  const { communityId } = req.params;

  try {
    const community = await Community.findById(communityId).exec();

    if (!community) {
      return res.status(404).json({ error: "Community not found" });
    }

    // Fetch the members of the community using the community's member IDs
    const members = await User.find({ _id: { $in: community.members } }).exec();

    res.status(200).json({ members });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};