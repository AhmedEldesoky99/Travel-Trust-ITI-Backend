const { commentModel: Comment } = require("../../models");
const { successHandler, errorHandler } = require("../../utils/responseHandler");

exports.getAllComments = async (req, res, next) => {
  try {
    const { id } = req.params;
    let comments = await Comment.find({ user: +id }).limit(+req.query.limit);

    if (!comments) {
      throw errorHandler("Comments not found", 404);
    }

    successHandler(res, comments, comments.length);
  } catch (err) {
    next(err);
  }
};
