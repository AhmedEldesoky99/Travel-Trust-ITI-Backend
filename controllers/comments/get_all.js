const { commentModel: Comment } = require("../../models");
const { successHandler, errorHandler } = require("../../utils/responseHandler");

exports.getAllComments = async (req, res, next) => {
  try {
    const { id } = req.query;
    let comments,
      query = {};
    if (id) {
      query = { user: +id };
    }
    comments = await Comment.find(query).limit(+req.query.limit);

    if (!comments) {
      throw errorHandler("Comments not found", 404);
    }

    successHandler(res, comments, comments.length);
  } catch (err) {
    next(err);
  }
};
