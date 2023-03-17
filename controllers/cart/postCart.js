const { CartModel, tourModel } = require("../../models/index");
const { errorHandler, successHandler } = require("../../utils/responseHandler");

exports.addToCart = async (req, res, next) => {
  try {
    const { tourID } = req.params;
    const { subscriber_number } = req.body;
    const tour = await tourModel.findById(tourID);
    const cart = await CartModel.findOne({ user: req.userID });
    if (!tour) {
      throw errorHandler("tour is not found", 400);
    }
    let total_money, createdCart, newCart;
    if (!cart) {
      total_money = +subscriber_number * +tour.person_cost;
      const Cart = new CartModel({
        user: req.userID,
        tours: tourID,
        total_money,
        tour_details: { tour_id: tourID, money: total_money },
      });

      createdCart = await CartModel.create(Cart);
    } else {
      total_money = +subscriber_number * +tour.person_cost + cart.total_money;
      let tours;

      if (cart.tours.includes(tourID)) {
        throw errorHandler("tour is already in cart", 400);
      } else {
        tours = [...cart.tours, tourID];
      }

      await CartModel.findByIdAndUpdate(cart.id, {
        total_money,
        tours,
        tour_details: [
          ...cart.tour_details,
          { tour_id: tourID, money: +subscriber_number * +tour.person_cost },
        ],
      });
    }
    newCart = await CartModel.findById(cart.id);
    successHandler(
      res,
      newCart ? newCart : createdCart,
      "cart created successfully"
    );
  } catch (err) {
    console.log(err);
    next(err);
  }
};
