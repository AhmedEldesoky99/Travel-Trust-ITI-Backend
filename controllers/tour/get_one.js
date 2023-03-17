const {
  tourModel: Tour,
  commentModel: Comment,
  commentModel,
} = require("../../models");
const { successHandler, errorHandler } = require("../../utils/responseHandler");
const { calcRate } = require("./helper");

exports.getOneTour = async (req, res, next) => {
  try {
    const tour = await Tour.findById(req.params.id).populate("organizer");

    if (!tour) {
      throw errorHandler("tour not found", 404);
    }
    const comments = await commentModel.find({ tour: req.params.id });

    let rate;
    if (comments) {
      rate = calcRate(comments);
    }

    successHandler(res, { tour, rate });
  } catch (err) {
    next(err);
  }
};
