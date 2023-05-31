const express = require("express");
const { protect } = require("../../controllers/auth/auth");
const { toggleFavorite } = require("../../controllers/favorite/ToggleFav");

const favoritesRouter = express.Router();

favoritesRouter.patch("/:tourID", protect, toggleFavorite);

module.exports = favoritesRouter;
