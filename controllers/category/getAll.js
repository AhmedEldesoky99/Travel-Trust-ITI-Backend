const { CategoryModel } = require("../../models");
const { successHandler } = require("../../utils/responseHandler");

exports.getAllCategory = async (req, res, next) => {
  try {
    const categories = await CategoryModel.find();

    successHandler(res, categories, categories.length);
  } catch (err) {
    next(err);
  }
};
