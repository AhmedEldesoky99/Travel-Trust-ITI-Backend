const express = require("express");
const { protect } = require("../../controllers/auth/auth");
const { addToFavorites } = require("../../controllers/favorite/addToFavorites");
const { deleteFromFavorites } = require("../../controllers/favorite/deleteFromFavourite");


const favoritesRouter = express.Router();


favoritesRouter.patch("/:tourID",protect,addToFavorites
)
favoritesRouter.delete("/:tourID",protect,deleteFromFavorites);

module.exports = favoritesRouter;