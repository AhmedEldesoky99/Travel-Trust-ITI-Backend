const { isArray } = require("util");
const {
  tourModel: Tour,
  CitiesModal: City,
  CategoryModel: Category,
} = require("../../models");

exports.getAllTours = async (req, res, next) => {
  try {
    const { limit } = req.query;

    const tours = await Tour.find({ status: "publish" }).limit(+limit);

    req.Result = {
      data: tours,
      length: tours.length,
    };
    next();
  } catch (err) {
    next(err);
  }
};
