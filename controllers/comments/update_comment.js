const { commentModel: Comment } = require("../../models/index");
const { errorHandler, successHandler } = require("../../utils/responseHandler");

exports.updateComment = async (req, res, next) => {
  try {
    const commentToUpdate = await Comment.findById(
      req.params.commentID
    ).populate("user");

    if (!commentToUpdate) {
      throw errorHandler("comment not found", 401);
    }
    if (commentToUpdate.user.id !== req.userID) {
      throw errorHandler("unauthorized", 401);
    }

    const handleData = {
      ...req.body,
    };

    const editedComment = new Comment(handleData);

    await Comment.findByIdAndUpdate(req.params.commentID, handleData);

    successHandler(res, editedComment, "comment updated successfully");
  } catch (err) {
    next(err);
  }
};
