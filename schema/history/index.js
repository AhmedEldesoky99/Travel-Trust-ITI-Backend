const mongoose = require("mongoose");

const { Schema } = mongoose;

const HistorySchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    tours: [{ type: Schema.Types.ObjectId, ref: "Tour" }],
  },
  { timestamps: true },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = HistorySchema;
