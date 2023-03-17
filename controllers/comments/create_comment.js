const { commentModel: Comment, tourModel } = require("../../models/index");
const { errorHandler, successHandler } = require("../../utils/responseHandler");

exports.createComment = async (req, res, next) => {
  try {
    const { tourID } = req.params;

    const tour = await tourModel.findById(tourID);

    if (!tour) {
      throw errorHandler("tour not found", 404);
    }

    const handleData = {
      title: req.body.title,
      content: req.body.content,
      rating: +req.body.rating,
      user: req.userID,
      tour: tourID,
    };

    const comment = await Comment.create(handleData);

    successHandler(res, comment, "comment created successfully");
  } catch (err) {
    next(err);
  }
};
