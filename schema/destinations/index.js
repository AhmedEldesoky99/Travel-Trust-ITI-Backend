const mongoose = require("mongoose");
const { Schema } = mongoose;
const autoIncrement = require("mongoose-auto-increment");

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

DestinationsSchema.plugin(autoIncrement.plugin, "Destination");
module.exports = DestinationsSchema;
