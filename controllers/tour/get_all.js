const { isArray } = require("util");
const {
  tourModel: Tour,
  CitiesModal: City,
  CategoryModel: Category,
} = require("../../models");

exports.getAllTours = async (req, res, next) => {
  try {
    const { limit } = req.query;

    let stages = [
      { $match: { status: "publish" } },
      { $limit: +limit || undefined },
    ];

    const tours = await Tour.find({}).limit(+limit);

    req.Result = {
      data: tours,
      length: tours.length,
    };
    next();
  } catch (err) {
    next(err);
  }
};
