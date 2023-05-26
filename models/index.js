const mongoose = require("mongoose");
const connection = mongoose.createConnection(process.env.DATABASE);

const autoIncrement = require("mongoose-auto-increment");

autoIncrement.initialize(connection);

//app schema
const userSchema = require("../schema/user/userSchema");
const tourSchema = require("../schema/tours/toursSchema");
const commentSchema = require("../schema/comments/commentSchema");
const CartSchema = require("../schema/cart/cartSchema");
const CategorySchema = require("../schema/category");
const HistorySchema = require("../schema/history");
const CitiesSchema = require("../schema/cities");
const DestinationsSchema = require("../schema/destinations");

//app models
const userModel = connection.model("User", userSchema);
const tourModel = connection.model("Tour", tourSchema);
const commentModel = connection.model("Comment", commentSchema);
const CartModel = connection.model("Cart", CartSchema);
const CategoryModel = connection.model("Category", CategorySchema);
const HistoryModal = connection.model("History", HistorySchema);
const CitiesModal = connection.model("City", CitiesSchema);
const DestinationsModal = connection.model("Destination", DestinationsSchema);

module.exports = {
  userModel,
  tourModel,
  commentModel,
  CartModel,
  CategoryModel,
  HistoryModal,
  CitiesModal,
  DestinationsModal,
};
