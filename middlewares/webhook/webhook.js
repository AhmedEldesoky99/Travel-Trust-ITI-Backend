const dotenv = require("dotenv");
dotenv.config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { CartModel } = require("../../models");

exports.webhookCheckout = async (req, res, next) => {
  try {
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK
      );
    } catch (err) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
      //event.client_reference_id
      //event.customer_email
      console.log("handle order here", event.data.object);
      CreateOrder(event.data.object.client_reference_id);
    }
  } catch (err) {
    next(err);
  }
};
const CreateOrder = async (id) => {
  await CartModel.findByIdAndRemove(id);
};
