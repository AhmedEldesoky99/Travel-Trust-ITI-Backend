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
      type: Number,
      ref: "User",
      require: true,
      autopopulate: true,
    },
    tour: {
      type: Number,
      ref: "Tour",
      require: true,
      autopopulate: true,
    },
  },
  { timestamps: true },

  {
    toJSON: { virtual: true },
    toObject: { virtual: true },
  }
);

commentSchema.plugin(autoIncrement.plugin, "Comment");
commentSchema.plugin(require("mongoose-autopopulate"));
module.exports = commentSchema;
