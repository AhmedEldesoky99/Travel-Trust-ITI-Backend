const express = require("express");
const { protect } = require("../../controllers/auth/auth");
const { deleteFromCart } = require("../../controllers/cart/deleteFromCart");
const { getCart } = require("../../controllers/cart/getUserCart");

const { addToCart } = require("../../controllers/cart/postCart");
const { ClearAllItemsInCart } = require("../../controllers/cart/clearCartItem");
const { responseFactory } = require("../../controllers/factory/factory");

const cartRouter = express.Router();

cartRouter.get("/", protect, getCart, responseFactory);
cartRouter.post("/", protect, getCart, ClearAllItemsInCart, responseFactory);
cartRouter.post("/:tourID", protect, addToCart, responseFactory);
cartRouter.delete("/:tourID", protect, deleteFromCart, responseFactory);

module.exports = cartRouter;
