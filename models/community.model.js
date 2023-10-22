const mongoose = require("mongoose");

const communitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    members: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
  }],
    createdAt: {
        type: Date,
        default: Date.now,
      },
      updatedAt: {
        type: Date,
        default: Date.now,
      },
})

module.exports = mongoose.model("Community", communitySchema);