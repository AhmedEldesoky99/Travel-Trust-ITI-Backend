const { CartModel, tourModel } = require("../../models/index");
const { errorHandler } = require("../../utils/responseHandler");

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

    if (+subscriber_number > tour.person_num - tour.reservation_number) {
      throw errorHandler(
        `tour have only ${
          tour.person_num - tour.reservation_number
        } persons available`
      );
    }
    if (!cart) {
      total_money = +subscriber_number * +tour.price_per_person;
      const Cart = new CartModel({
        user: req.userID,
        tours: tourID,
        total_money,
        reservation_number: tour.reservation_number + subscriber_number,
        tour_details: { tour_id: tourID, money: total_money },
      });

      createdCart = await CartModel.create(Cart);
      console.log("33");
    } else {
      total_money =
        +subscriber_number * +tour.price_per_person + cart.total_money;
      let tours;

      const toursIDs = cart.tours.map((item) => +item.id);
      console.log(toursIDs, "toursIDs");
      if (toursIDs.includes(+tourID)) {
        throw errorHandler("tour is already in cart", 400);
      } else {
        tours = [...cart.tours, tourID];
      }

      await CartModel.findByIdAndUpdate(cart?.id, {
        total_money,
        tours,
        tour_details: [
          ...cart.tour_details,
          {
            tour_id: tourID,
            money: +subscriber_number * +tour.price_per_person,
          },
        ],
      });
    }
    newCart = await CartModel.findOne({ user: req.userID });

    req.Result = {
      data: newCart ? newCart : createdCart,
      message: "item added to cart successfully",
    };
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
};
