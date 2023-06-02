const { CartModel: Cart } = require("../../models");

exports.ClearAllItemsInCart = async (req, res, next) => {
  try {
    if (req.Result.data.user === +req.userID) {
      await Cart.findByIdAndRemove(req.Result.data.id);
    }
    req.Result = {
      data: undefined,
      message: "Cart is Empty",
    };
    next();
  } catch (err) {
    next(err);
  }
};
