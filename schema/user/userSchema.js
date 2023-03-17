// core modules
const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
    },
    phone: {
      type: String,
    },
    cart: {
      type: Schema.Types.ObjectId,
      ref: "Cart",
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      select: false,
    },
    ssn: String,
    photo: {
      type: Array,
      default: null,
    },
    cover_photo: Array,
    role: {
      type: String,
    },
    bio: String,
    city: String,
    visited_tours: Array,
    favorite_tours: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tour",
      },
    ],
    cash: Number,
    currency: String,
    created_at: {
      type: Date,
      default: Date.now(),
      select: false,
    },
  },
  { timestamps: true },

  {
    toJSON: { virtual: true },
    toObject: { virtual: true },
  }
);
module.exports = userSchema;
