const { commentModel: Comment } = require("../../models");
const { successHandler, errorHandler } = require("../../utils/responseHandler");

exports.getAllComments = async (req, res, next) => {
  try {
    let comments = await Comment.find().limit(+req.query.limit);

    if (!comments) {
      throw errorHandler("Comments not found", 404);
    }

    if (req.query.organizer) {
      comments = comments.filter(
        (item) => item.tour.organizer._id === +req.query.organizer
      );
    }
    successHandler(res, comments, comments.length);
  } catch (err) {
    next(err);
  }
};
