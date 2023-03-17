const mongoose = require("mongoose");

const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    title: String,
    content: String,
    rating: Number,
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
module.exports = commentSchema;
