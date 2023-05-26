const { CitiesModal: City } = require("../../models");
const { successHandler } = require("../../utils/responseHandler");
const { citiesArr } = require("./data");

exports.getAllCities = async (req, res, next) => {
  try {
    //insert cities
    // await City.insertMany(citiesArr);

    const cities = await City.find();

    successHandler(res, cities);
  } catch (err) {
    next(err);
  }
};
