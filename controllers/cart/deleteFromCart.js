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
    const handleCart = deleteFromCartHandler(cart, tourID);

    await CartModel.findByIdAndUpdate(cart.id, {
      ...handleCart,
    });
    const newCart = await CartModel.findById(cart.id);

    req.Result = {
      data: newCart,
      message: "item removed from cart successfully",
    };
    next();
  } catch (err) {
    next(err);
  }
};

const deleteFromCartHandler = (cart, tourID) => {
  const newTours = cart.tours.filter((item) => item.id !== tourID);

  const newToursDetails = cart.tour_details.filter(
    (item) => +item._id !== tourID
  );

  const totalMoney = cart.newToursDetails?.reduce(
    (acc, item) => acc + item.money,
    0
  );

  console.log(newToursDetails, "newToursDetails", tourID);
  return {
    tours: newTours,
    tour_details: newToursDetails,
    total_money: totalMoney ?? 0,
  };
};
