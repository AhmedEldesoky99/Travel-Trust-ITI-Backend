const { commentModel: Comment } = require("../../models/index");
const { errorHandler, successHandler } = require("../../utils/responseHandler");
const { calcRate } = require("../tour/helper");

exports.updateComment = async (req, res, next) => {
  try {
    const commentToUpdate = await Comment.findById(req.params.commentID)
      .populate("user")
      .populate("tour");

    if (!commentToUpdate) {
      throw errorHandler("comment not found", 401);
    }
    if (commentToUpdate.user.id !== req.userID) {
      throw errorHandler("unauthorized", 401);
    }
    const comments = await Comment.find({ tour: commentToUpdate.tour.id });

    const handleData = {
      ...req.body,
      rate: calcRate(comments),
    };

    const editedComment = new Comment(handleData);

    await Comment.findByIdAndUpdate(req.params.commentID, handleData);

    successHandler(res, editedComment, "comment updated successfully");
  } catch (err) {
    next(err);
  }
};
