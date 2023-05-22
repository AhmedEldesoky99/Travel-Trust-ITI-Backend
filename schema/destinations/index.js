const mongoose = require("mongoose");

const { Schema } = mongoose;

const DestinationsSchema = new Schema(
  {
    greater_cairo_region: [{ type: Schema.Types.ObjectId, ref: "City" }],
    alexandria_region: [{ type: Schema.Types.ObjectId, ref: "City" }],
    delta_region: [{ type: Schema.Types.ObjectId, ref: "City" }],
    suez_canal_region: [{ type: Schema.Types.ObjectId, ref: "City" }],
    north_upper_region: [{ type: Schema.Types.ObjectId, ref: "City" }],
    central_upper_region: [{ type: Schema.Types.ObjectId, ref: "City" }],
    southern_upper_region: [{ type: Schema.Types.ObjectId, ref: "City" }],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = DestinationsSchema;
