const mongoose = require("mongoose");
const { Schema } = mongoose;
const autoIncrement = require("mongoose-auto-increment");

const DestinationsSchema = new Schema(
  {
    greater_cairo_region: [{ type: Number, ref: "City" }],
    alexandria_region: [{ type: Number, ref: "City" }],
    delta_region: [{ type: Number, ref: "City" }],
    suez_canal_region: [{ type: Number, ref: "City" }],
    north_upper_region: [{ type: Number, ref: "City" }],
    central_upper_region: [{ type: Number, ref: "City" }],
    southern_upper_region: [{ type: Number, ref: "City" }],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

DestinationsSchema.plugin(autoIncrement.plugin, "Destination");
module.exports = DestinationsSchema;
