const mongoose = require("mongoose");
const { Schema } = mongoose;
const autoIncrement = require("mongoose-auto-increment");

const CartSchema = new Schema(
  {
    user: {
      type: Number,
      ref: "User",
    },
    tours: [
      {
        type: Number,
        ref: "Tour",
        autopopulate: true,
      },
    ],
    tour_details: Array,
    total_money: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
CartSchema.plugin(autoIncrement.plugin, "Cart");
CartSchema.plugin(require("mongoose-autopopulate"));

module.exports = CartSchema;
