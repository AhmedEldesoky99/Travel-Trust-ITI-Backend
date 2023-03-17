const { commentModel } = require("../../models");
const { successHandler, errorHandler } = require("../../utils/responseHandler");

exports.getTourComments = async (req, res, next) => {
  console.log(req.params.tourID, "<<<<<<<<<<<<<<<<<");

  try {
    const comments = await commentModel
      .find({ tour: req.params.tourID })
      .populate("user");

    if (!comments) {
      throw errorHandler("Comments not found", 404);
    }

    successHandler(res, comments, comments.length);
  } catch (err) {
    next(err);
  }
};
