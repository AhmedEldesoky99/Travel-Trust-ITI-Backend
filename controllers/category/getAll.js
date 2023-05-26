const { CategoryModel: Category } = require("../../models");
const { successHandler } = require("../../utils/responseHandler");
const { categoriesArr } = require("./data");

exports.getAllCategory = async (req, res, next) => {
  try {
    //insertCategory
    // await Category.insertMany(categoriesArr);
    const categories = await Category.find();
    successHandler(res, categories, categories.length);
  } catch (err) {
    next(err);
  }
};
