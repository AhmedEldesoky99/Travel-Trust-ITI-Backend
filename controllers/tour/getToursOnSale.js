const { tourModel: Tour } = require("../../models");
const { successHandler } = require("../../utils/responseHandler");

exports.getToursOnSale = async (req, res, next) => {
  try {
    const { limit } = req.query;
    const tours = await Tour.find({ sale: { $gt: 0 } }).limit(+limit);
    successHandler(res, tours, tours.length);
  } catch (err) {
    next(err);
  }
};
