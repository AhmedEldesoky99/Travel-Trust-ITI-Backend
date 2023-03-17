const { commentModel: Comment, tourModel } = require("../../models");
const { successHandler, errorHandler } = require("../../utils/responseHandler");

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
      comment.tour.organizer !== req.userID
    ) {
      throw errorHandler("unauthorized", 401);
    }

    await Comment.findByIdAndRemove(req.params.commentID);

    successHandler(res, comment, "comment deleted successfully");
  } catch (err) {
    next(err);
  }
};
