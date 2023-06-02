const { CartModel } = require("../../models/index");

exports.getCart = async (req, res, next) => {
  try {
    const cart = await CartModel.findOne({ user: req.userID });

    if (!cart) {
      await CartModel.create({ user: req.userID });
    }
    const newCart = await CartModel.findOne({ user: req.userID });

    req.Result = {
      data: newCart,
    };

    next();
  } catch (err) {
    next(err);
  }
};
