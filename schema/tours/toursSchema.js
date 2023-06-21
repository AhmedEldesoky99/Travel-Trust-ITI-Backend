// core module
const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");

const { Schema } = mongoose;

const tourSchema = new Schema(
  {
    organizer: {
      type: Number,
      ref: "User",
      autopopulate: true,
    },
    category: [
      {
        type: Number,
        ref: "Category",
        autopopulate: true,
      },
    ],
    city: {
      type: Number,
      ref: "City",
      autopopulate: true,
    },
    title: { type: String, trim: true },
    price_per_person: {
      type: Number,
      // get: (value) => (value / 100).toFixed(2),
      // set: (value) => value * 100,
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
        // stop_location: [{ type: String, trim: true }],
        // duration: [String],
        details: [
          {
            stop_location: { type: String, trim: true },
            duration: String,
          },
        ],
        image: Array,
      },
    ],

    food_photos: {
      type: Array,
    },
    highlight_photos: { type: Array },

    meeting_point: {
      description: { type: String, trim: true },
      longitude: { type: Number, trim: true },
      latitude: { type: Number, trim: true },
    },

    status: {
      type: String,
      trim: true,
      enum: {
        values: ["complete", "publish", "draft"],
        message: ["difficulty is either : complete, publish and draft"],
      },
      default: "publish",
    },
    rate: {
      type: Number,
      default: 0,
      validation: {
        min: 0,
        max: 5,
      },
    },
    sale: {
      type: Number,
      default: 0,
    },
    reservation_number: { type: Number, default: 0 },
  },
  { timestamps: true },
  {
    toJSON: { virtuals: true, getters: true },
    toObject: { virtuals: true },
  }
);

tourSchema.plugin(autoIncrement.plugin, "Tour");
tourSchema.plugin(require("mongoose-autopopulate"));

module.exports = tourSchema;
