const { tourModel: Tour } = require("../../models");
const { successHandler } = require("../../utils/responseHandler");

exports.getAllTours = async (req, res, next) => {
  try {
    const { limit } = req.query;

    const tours = await Tour.find()
      .limit(+limit)
      .populate("organizer")
      .populate("city")
      .populate("category");

    successHandler(res, tours, tours.length);
  } catch (err) {
    next(err);
  }
};
