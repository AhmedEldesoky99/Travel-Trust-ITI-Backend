const { tourModel: Tour, CitiesModal: City } = require("../../models");
const { successHandler } = require("../../utils/responseHandler");

exports.getCityTours = async (req, res, next) => {
  try {
    const { limit } = req.query;
    const { cityID } = req.params;
    const tours = await Tour.find({ city: cityID })
      .limit(+limit)
      .populate("city");
    const city = await City.findOne({ id: cityID });

    console.log(city);

    successHandler(res, { city, tours }, tours.length);
  } catch (err) {
    next(err);
  }
};
