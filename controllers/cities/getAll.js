const { CitiesModal: City, tourModel: Tour } = require("../../models");
const { successHandler } = require("../../utils/responseHandler");
const { citiesArr } = require("./data");

exports.getAllCities = async (req, res, next) => {
  try {
    //insert cities
    // await City.insertMany(citiesArr);

    const noToursOfCity = await Tour.aggregate([
      { $group: { _id: "$city", tours_number: { $sum: 1 } } },
    ]);

    await Promise.all(
      noToursOfCity.map(async (item) => {
        await City.findByIdAndUpdate(item._id, {
          tours_number: item.tours_number,
        });
      })
    );

    const cities = await City.find().limit(+req.query.limit);

    successHandler(res, cities, cities.length);
  } catch (err) {
    next(err);
  }
};
