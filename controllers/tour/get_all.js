const { isArray } = require("util");
const {
  tourModel: Tour,
  CitiesModal: City,
  CategoryModel: Category,
} = require("../../models");

exports.getAllTours = async (req, res, next) => {
  try {
    const { limit } = req.query;

    let stages = [{ $match: { status: "publish" } }, { $limit: +limit }];

    const tours = await Tour.aggregate([
      ...stages,
      {
        $lookup: {
          from: "users",
          localField: "organizer",
          foreignField: "_id",
          as: "organizer",
        },
      },
      { $unwind: "$organizer" },

      {
        $lookup: {
          from: "cities",
          localField: "city",
          foreignField: "_id",
          as: "city",
        },
      },
      { $unwind: "$city" },

      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      // { $unwind: "$category" },
    ]);

    req.Result = {
      data: tours,
      length: tours.length,
    };
    next();
  } catch (err) {
    next(err);
  }
};
