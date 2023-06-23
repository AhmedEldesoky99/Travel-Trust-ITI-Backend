const { userModel } = require("../../models");
const { tourModel: Tour } = require("../../models");

const { successHandler, errorHandler } = require("../../utils/responseHandler");
const { toursStats } = require("../tour/helper");
exports.getOneUser = async (req, res, next) => {
  try {
    const user = await userModel.findOne({ _id: req.params.id });

    if (!user) {
      throw errorHandler("user not found", 404);
    }

    let result = { user };
    const { role } = user;

    if (role === "organizer") {
      const tours = await Tour.find({ organizer: req.params.id }).select(
        "civil_photos"
      );
      result = { ...result, stats: toursStats(tours) };
    }

    successHandler(res, result);
  } catch (err) {
    next(err);
  }
};
