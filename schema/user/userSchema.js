// core modules
const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: { type: String, trim: true },
    phone: { type: String, trim: true },
    cart: {
      type: Schema.Types.ObjectId,
      ref: "Cart",
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      trim: true,
      select: false,
    },
    ssn: { type: String, trim: true, unique: true },
    photo: {
      type: Array,
      default: null,
    },
    cover_photo: Array,
    role: { type: String, trim: true },
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
    currency: { type: String, trim: true },
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
