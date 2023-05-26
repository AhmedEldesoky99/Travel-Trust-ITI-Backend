const mongoose = require("mongoose");
const { Schema } = mongoose;
const autoIncrement = require("mongoose-auto-increment");
const HistorySchema = new Schema(
  {
    user: {
      type: Number,
      ref: "User",
    },
    tours: [{ type: Number, ref: "Tour" }],
  },
  { timestamps: true },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

HistorySchema.plugin(autoIncrement.plugin, "History");
module.exports = HistorySchema;
