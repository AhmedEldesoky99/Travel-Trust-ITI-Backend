const { CitiesModal: City } = require("../../models");
const { successHandler } = require("../../utils/responseHandler");

exports.getAllCities = async (req, res, next) => {
  try {
    const cities = await City.find();

    successHandler(res, cities);
  } catch (err) {
    next(err);
  }
};
