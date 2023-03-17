const { number } = require("joi");
const mongoose = require("mongoose");

const { Schema } = mongoose;

const CartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    tours: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tour",
      },
    ],
    tour_details: Array,
    total_money: {
      type: Number,
      default: 0,
    },
    created_at: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

module.exports = CartSchema;
