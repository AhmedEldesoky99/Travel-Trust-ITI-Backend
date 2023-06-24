// core modules
const mongoose = require("mongoose");

const { Schema } = mongoose;

const autoIncrement = require("mongoose-auto-increment");

const userSchema = new Schema(
  {
    username: { type: String, trim: true },
    phone: { type: String, trim: true },
    cart: {
      type: Number,
      ref: "Cart",
      autopopulate: true,
    },
    languages: {
      type: Array,
      default: null,
    },
    governorate_expertise: [
      { type: Number, ref: "City", autopopulate: true, default: null },
    ],
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
    ssn: {
      type: String,
      trim: true,
      unique: true,
    },
    photo: {
      type: Array,
      default: null,
    },
    cover_photo: {
      type: Array,
      default: null,
    },
    civil_photos: {
      front: { type: Array, default: null },
      back: { type: Array, default: null },
    },

    role: { type: String, trim: true },
    bio: String,
    city: {
      type: Number,
      ref: "City",
      autopopulate: true,
    },
    job_profile: { type: String, trim: true },
    visited_tours: [
      { type: Number, ref: "Tour", autopopulate: true, default: null },
    ],
    favorite_tours: [
      {
        type: Number,
        ref: "Tour",
        autopopulate: true,
        default: null,
      },
    ],

    verified: {
      type: Boolean,
      default: null,
    },
    cash: Number,
    currency: { type: String, trim: true },
  },
  { timestamps: true },

  {
    toJSON: { virtual: true },
    toObject: { virtual: true },
  }
);

userSchema.plugin(autoIncrement.plugin, "User");
userSchema.plugin(require("mongoose-autopopulate"));
module.exports = userSchema;
