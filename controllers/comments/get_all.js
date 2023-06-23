const { commentModel: Comment } = require("../../models");
const { successHandler, errorHandler } = require("../../utils/responseHandler");

exports.getAllComments = async (req, res, next) => {
  try {
    const { id: organizerID } = req.query;
    let comments;

    comments = await Comment.find().limit(+req.query.limit);

    if (organizerID) {
      comments = comments.filter(
        (item) => +item.tour.organizer.id === +organizerID
      );
    }

    if (!comments) {
      throw errorHandler("Comments not found", 404);
    }

    successHandler(res, comments, comments.length);
  } catch (err) {
    next(err);
  }
};
