const { tourModel: Tour, commentModel } = require("../../models");
const { successHandler, errorHandler } = require("../../utils/responseHandler");
const { calcRate } = require("./helper");

exports.getAllTours = async (req, res, next) => {
  try {
    const { location, all, limit } = req.query;

    let tours;
    if (!location && limit) {
      tours = await Tour.find().limit(+limit).populate("organizer");
    } else if (location && limit) {
      tours = await Tour.find({ location }).limit(+limit).populate("organizer");
    } else if (location && !limit) {
      tours = await Tour.find({ location }).populate("organizer");
    } else {
      tours = await Tour.find().populate("organizer");
    }

    if (!tours) {
      throw errorHandler("tours not found", 400);
    }

    if (all) {
      const listOfCities = tours.map((tour) => tour.location);
      const set = new Set(listOfCities);
      tours = [...set];
    }

    successHandler(res, tours, tours.length);
  } catch (err) {
    next(err);
  }
};
