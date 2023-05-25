// core module
const { number, string } = require("joi");
const mongoose = require("mongoose");

const { Schema } = mongoose;

const tourSchema = new Schema(
  {
    organizer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    category: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
    city: {
      type: Schema.Types.ObjectId,
      ref: "City",
    },
    title: { type: String, trim: true },
    price_per_person: {
      type: Number,
      get: (value) => (value / 100).toFixed(2),
      set: (value) => value * 100,
    },
    person_num: {
      type: Number,
    },
    duration: Number,

    description: { type: String, trim: true },
    start_date: Date,
    end_date: Date,
    dress_code: { type: String, trim: true },
    include: {
      type: Array,
    },

    plan: [
      {
        title: { type: String, trim: true },
        start_time: String,
        end_time: String,
        stop_location: [{ type: String, trim: true }],
        duration: [String],
        image: Array,
      },
    ],

    food_photos: {
      type: Array,
    },
    highlight_photos: { type: Array },

    meeting_point: {
      longitude: { type: Number, trim: true },
      latitude: { type: Number, trim: true },
    },
    pubish: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      trim: true,
      enum: {
        values: ["complete", "incomplete"],
        message: ["difficulty is either : complete, incomplete"],
      },
      default: "incomplete",
    },
    sale: {
      type: Number,
      default: 0,
    },
    reservation_number: Number,
  },
  { timestamps: true },
  {
    toJSON: { virtuals: true, getters: true },
    toObject: { virtuals: true },
  }
);

module.exports = tourSchema;
