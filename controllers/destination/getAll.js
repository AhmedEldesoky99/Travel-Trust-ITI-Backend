const { DestinationsModal: Destination } = require("../../models/index");
const { successHandler } = require("../../utils/responseHandler");
const { destinationsArr } = require("./data");

exports.getAllDestinations = async (req, res, next) => {
  try {
    //insert data
    //  await Destination.insertMany(destinationsArr);

    const destinations = await Destination.find()
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
