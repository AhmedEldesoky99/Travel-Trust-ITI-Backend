const { tourModel: Tour } = require("../../models");
const { successHandler, errorHandler } = require("../../utils/responseHandler");

exports.getAdminTours = async (req, res, next) => {
  try {
    const { organizerID } = req.params;

    if (!organizerID) {
      throw errorHandler("user id is required", 400);
    }

    const tours = await Tour.find({ organizer: organizerID }).populate(
      "organizer"
    );

    successHandler(res, tours, tours.length);
  } catch (err) {
    next(err);
  }
};
