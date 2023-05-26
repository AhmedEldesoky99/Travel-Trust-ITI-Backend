const mongoose = require("mongoose");
const { Schema } = mongoose;
const autoIncrement = require("mongoose-auto-increment");

const commentSchema = new Schema(
  {
    title: { type: String, trim: true },
    content: { type: String, trim: true },
    rating: {
      type: Number,
      default: 0,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    tour: {
      type: Schema.Types.ObjectId,
      ref: "Tour",
      require: true,
    },
  },
  { timestamps: true },

  {
    toJSON: { virtual: true },
    toObject: { virtual: true },
  }
);

commentSchema.plugin(autoIncrement.plugin, "Comment");
module.exports = commentSchema;
