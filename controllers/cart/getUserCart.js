const { CartModel } = require("../../models/index");
const { successHandler } = require("../../utils/responseHandler");

exports.getCart = async (req, res, next) => {
  try {
    const cart = await CartModel.findOne({ user: req.userID });

    if (!cart) {
      await CartModel.create({ user: req.userID });
    }
    const newCart = await CartModel.findOne({ user: req.userID });

    successHandler(res, newCart);
  } catch (err) {
    next(err);
  }
};
