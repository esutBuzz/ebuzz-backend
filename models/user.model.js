const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    avatar: {
      type: String,
    },
    imgTag: {
      type: String,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    phoneNumber: { type: String },
    password: { type: String, required: true, min: 5 },
    emailVerificationToken: { type: String },
    emailVerified: { type: Boolean, default: false },
    resetPasswordToken: { type: String },
    deleted: {
      type: Boolean,
      default: false,
    },
    events: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
      },
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    communities: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Community",
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtual: true },
    toObject: { virtual: true },
  }
);

userSchema.virtual("post", {
  ref: "Post",
  localField: "_id",
  foreignField: "author",
});

module.exports = mongoose.model("User", userSchema);
