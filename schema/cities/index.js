const mongoose = require("mongoose");

const { Schema } = mongoose;

const CitiesSchema = new Schema(
  {
    title: String,
    description: String,
    home_image: String,
    full_image: String,
    section_image: String,
    tours_number: Number,
  },
  { timestamps: true },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = CitiesSchema;
