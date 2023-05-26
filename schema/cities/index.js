const mongoose = require("mongoose");
const { Schema } = mongoose;
const autoIncrement = require("mongoose-auto-increment");

const CitiesSchema = new Schema(
  {
    title: { type: String, trim: true },
    description: { type: String, trim: true },
    home_image: { type: String, trim: true },
    full_image: { type: String, trim: true },
    section_image: { type: String, trim: true },
    tours_number: Number,
  },
  { timestamps: true },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
CitiesSchema.plugin(autoIncrement.plugin, "City");
module.exports = CitiesSchema;
