const { isArray } = require("util");
const {
  tourModel: Tour,
  CitiesModal: City,
  CategoryModel: Category,
} = require("../../models");

exports.getAllTours = async (req, res, next) => {
  try {
    const { limit } = req.query;
    const { city, minPrice, maxPrice, category, rate } = req.body;

    let stages = [{ $match: { status: "publish" } }];
    if (isArray(city)) {
      stages = [...stages, { $match: { city: { $in: city } } }];
    }

    if (isArray(category)) {
      stages = [...stages, { $match: { category: { $in: category } } }];
    }

    if (minPrice) {
      stages = [
        ...stages,
        { $match: { price_per_person: { $gte: +minPrice } } },
      ];
    }
    if (maxPrice) {
      stages = [
        ...stages,
        { $match: { price_per_person: { $lte: +maxPrice } } },
      ];
    }

    if (limit) {
      stages = [...stages, { $limit: +limit }];
    }
    if (rate) {
      stages = [...stages, { $match: { rate: { $in: rate } } }];
    }

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
