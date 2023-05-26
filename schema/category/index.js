const mongoose = require("mongoose");
const { Schema } = mongoose;
const autoIncrement = require("mongoose-auto-increment");

const CategorySchema = new Schema(
  {
    name: { type: String, trim: true },
  },
  { timestamps: true },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
CategorySchema.plugin(autoIncrement.plugin, "Category");
module.exports = CategorySchema;
