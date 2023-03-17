const dotenv = require("dotenv");
const { tourModel, userModel, CartModel } = require("../../models");
const { errorHandler, successHandler } = require("../../utils/responseHandler");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.getCheckoutSession = async (req, res, next) => {
  try {
    const { cartID } = req.params;
    const cart = await CartModel.findById(cartID)
      .populate("user")
      .populate("tours");

    console.log(cart);
    if (!cart) {
      throw errorHandler("cart id not found", 400);
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      success_url: `${process.env.FRONTEND_DOMAIN}/payment-sucess`,
      cancel_url: `${process.env.FRONTEND_DOMAIN}/payment-failed`,
      client_reference_id: req.params.cartID,
      customer_email: cart.user.email,
      line_items: [
        {
          price_data: {
            currency: "egp",
            unit_amount: cart.total_money * 100,
            product_data: {
              name: `tours`,
              description: "welcome in Travel ",
            },
          },
          quantity: cart.tours.length,
        },
      ],
    });

    successHandler(res, session, "start payment session");
  } catch (err) {
    next(err);
  }
};
