const {
  tourModel: Tour,
  CitiesModal: City,
  CategoryModel: Category,
} = require("../../models");
const { successHandler, errorHandler } = require("../../utils/responseHandler");

exports.getAllTours = async (req, res, next) => {
  try {
    const { limit, city, minPrice, maxPrice, category, status, rate } =
      req.query;
    let stages = [{ $match: { publish: true } }];

    if (city) {
      const cityResult = await City.findById(+city);
      if (!cityResult) {
        throw errorHandler("city id not found");
      }
      stages = [...stages, { $match: { city: +city } }];
    }

    if (category) {
      const categoryResult = await Category.findById(+category);
      if (!categoryResult) {
        throw errorHandler("category id not found");
      }
      stages = [...stages, { $match: { category: +category } }];
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
    if (status === "complete" || status !== "complete") {
      stages = [...stages, { $match: { status: status } }];
    }
    if (limit) {
      stages = [...stages, { $limit: +limit }];
    }
    if (rate) {
      stages = [...stages, { $match: { rate: +rate } }];
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
      {
        $lookup: {
          from: "cities",
          localField: "city",
          foreignField: "_id",
          as: "city",
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
    ]);

    successHandler(res, tours, tours.length);
  } catch (err) {
    next(err);
  }
};
