const { DestinationsModal: Destination } = require("../../models/index");
const { successHandler } = require("../../utils/responseHandler");

exports.getAllDestinations = async (req, res, next) => {
  try {
    const destinations = await Destination.find({}, { _id: 0 })
      .populate("greater_cairo_region")
      .populate("alexandria_region")
      .populate("delta_region")
      .populate("suez_canal_region")
      .populate("north_upper_region")
      .populate("central_upper_region")
      .populate("southern_upper_region");

    successHandler(res, destinations);
  } catch (err) {
    next();
  }
};
