const express = require("express");
const { protect } = require("../../controllers/auth/auth");
const { deleteFromCart } = require("../../controllers/cart/deleteFromCart");
const { getCart } = require("../../controllers/cart/getUserCart");

const { addToCart } = require("../../controllers/cart/postCart");

const cartRouter = express.Router();

cartRouter.get("/", protect, getCart);
cartRouter.post("/:tourID", protect, addToCart);
cartRouter.delete("/:tourID", protect, deleteFromCart);

module.exports = cartRouter;
