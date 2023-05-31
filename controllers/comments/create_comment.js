const {
  commentModel: Comment,
  tourModel: Tour,
} = require("../../models/index");
const { errorHandler, successHandler } = require("../../utils/responseHandler");
const { calcRate } = require("../tour/helper");

exports.createComment = async (req, res, next) => {
  try {
    const { tourID } = req.params;

    const tour = await Tour.findById(tourID);

    if (!tour) {
      throw errorHandler("tour not found", 404);
    }
    const comments = await Comment.find({ tour: +tourID });

    if (comments.length > 0)
      await Tour.findByIdAndUpdate(tourID, {
        rate: calcRate(comments),
      });

    const comment = await Comment.create({
      ...req.body,
      tour: +tourID,
      user: +req.userID,
    });

    successHandler(res, comment, "comment created successfully");
  } catch (err) {
    next(err);
  }
};
