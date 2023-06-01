const { CitiesModal: City } = require("../../models");
const { successHandler } = require("../../utils/responseHandler");
const { citiesArr } = require("./data");

exports.getAllCities = async (req, res, next) => {
  try {
    //insert cities
    // await City.insertMany(citiesArr);

    const cities = await City.find().limit(+req.query.limit);

    successHandler(res, cities, cities.length);
  } catch (err) {
    next(err);
  }
};
