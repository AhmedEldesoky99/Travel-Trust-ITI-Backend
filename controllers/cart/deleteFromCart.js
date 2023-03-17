const { CartModel, tourModel } = require("../../models/index");
const { errorHandler, successHandler } = require("../../utils/responseHandler");

exports.deleteFromCart = async (req, res, next) => {
  try {
    const { tourID } = req.params;
    const tour = await tourModel.findById(tourID);
    const cart = await CartModel.findOne({ user: req.userID });

    if (!tour) {
      throw errorHandler("tour is not found ", 400);
    }
    if (!cart) {
      throw errorHandler("cart is not found", 400);
    }
    const handleCart = deleteFromCart(cart, tourID);
    console.log(handleCart.tours[0]);
    // if (!handleCart.tours.includes(tourID)) {
    //   throw errorHandler("tour is not found", 400);
    // }
    await CartModel.findByIdAndUpdate(cart.id, {
      ...handleCart,
    });
    const newCart = await CartModel.findById(cart.id);
    successHandler(res, newCart, "item removed from cart successfully");
  } catch (err) {
    next(err);
  }
};

const deleteFromCart = (cart, tourID) => {
  const newTours = cart.tours.filter(
    (item) => parseInt(item) !== parseInt(tourID)
  );

  const newToursDetails = cart.tour_details.filter(
    (item) => item.tour_id !== tourID
  );
  const totalMoney = cart.newToursDetails?.reduce(
    (acc, item) => acc + item.money,
    0
  );

  return {
    tours: newTours,
    tour_details: newToursDetails,
    total_money: totalMoney ?? 0,
  };
};
