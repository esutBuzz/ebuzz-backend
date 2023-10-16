const Comment = require("../models/comment.model");

// create a new comment
exports.createComment = async (req, res) => {
  const { author, postId, content } = req.body;
  try {
    const comment = new Comment({ author, postId, content });
    await comment.save();
    res.status(201).json({
      message: "comment created successfully",
      comment: comment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Comment could not be created" });
  }
};

// fetch all Comments
exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find({ deleted: false });
    res.status(200).json(comments);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Comments could not be fetched" });
  }
};

// fetch a comment by ID
exports.getCommentById = async (req, res) => {
  try {
    const comment = await Comment.findOne({
      _id: req.params.commentId,
      deleted: false,
    });
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.status(200).json({
      message: "comment fetched successfully",
      comment: comment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Comment could not be fetched" });
  }
};

// update a comment by ID
exports.updateCommentById = async (req, res) => {
  try {
    const { author, commentId, content } = req.body;
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    if (author == comment.author) {
      const comment = await Comment.findByIdAndUpdate(
        commentId,
        { content },
        { new: true }
      );
      return res.status(200).json({
        message: "comment updated successfully",
        comment: comment,
      });
    }
    return res
      .status(200)
      .send({ message: "You're unauthorized to edit this post" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message});
  }
};

// delete a comment by ID
exports.deleteCommentById = async (req, res) => {
  try {
    const { userId, commentId } = req.params;
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    if (userId == comment.author) {
      const isDeleted = await Comment.findByIdAndDelete(commentId);
      if (isDeleted) {     
        return res
          .status(200)
          .send({ message: "Comment Deleted Successfully", isDeleted: true });
      }
    }
    return res
      .status(200)
      .send({ message: "You're unauthorized to delete this comment" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
