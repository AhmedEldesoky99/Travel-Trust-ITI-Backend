const mongoose = require("mongoose");

//app schema
const userSchema = require("../schema/user/userSchema");
const tourSchema = require("../schema/tours/toursSchema");
const commentSchema = require("../schema/comments/commentSchema");
const CartSchema = require("../schema/cart/cartSchema");

//app models
const userModel = mongoose.model("User", userSchema);
const tourModel = mongoose.model("Tour", tourSchema);
const commentModel = mongoose.model("Comment", commentSchema);
const CartModel = mongoose.model("Cart", CartSchema);

module.exports = {
  userModel,
  tourModel,
  commentModel,
  CartModel,
};
