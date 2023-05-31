const { commentModel: Comment, tourModel: Tour } = require("../../models");
const { successHandler, errorHandler } = require("../../utils/responseHandler");
const { calcRate } = require("../tour/helper");

exports.deleteOneComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.commentID)
      .populate("user")
      .populate("tour");

    if (!comment) {
      throw errorHandler("comment not found", 404);
    }

    if (
      comment.user.id !== req.userID &&
      comment.tour.organizer.id !== req.userID
    ) {
      throw errorHandler("unauthorized", 401);
    }

    await Comment.findByIdAndRemove(req.params.commentID);
    const comments = await Comment.find({ tour: comment.tour.id });

    await Tour.findByIdAndUpdate(comment.tour.id, {
      rate: +calcRate(comments),
    });

    successHandler(res, undefined, undefined, "comment deleted successfully");
  } catch (err) {
    next(err);
  }
};
