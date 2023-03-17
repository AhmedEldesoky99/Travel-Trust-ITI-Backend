const { commentModel: Comment } = require("../../models");
const { successHandler, errorHandler } = require("../../utils/responseHandler");

exports.getUserComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ user: req.params.userID }).populate(
      "user"
    );

    if (!comments) {
      throw errorHandler("Comments not found", 404);
    }

    successHandler(res, comments, comments.length);
  } catch (err) {
    next(err);
  }
};
