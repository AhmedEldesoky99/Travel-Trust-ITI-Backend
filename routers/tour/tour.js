const express = require("express");
const { protect } = require("../../controllers/auth/auth");

const { createTour } = require("../../controllers/tour/create_tour");
const { deleteOneTour } = require("../../controllers/tour/delete_one");
const { getAdminTours } = require("../../controllers/tour/getAdminTours");

const { getAllTours } = require("../../controllers/tour/get_all");
const { getOneTour } = require("../../controllers/tour/get_one");
const { updateTour } = require("../../controllers/tour/update_tour");
//controllers
const {
  uploadMultiImages,
  resizeTourImage,
  uploadAnyFiles,
} = require("../../middlewares/upload-img/upload-img");
const { ValidTour } = require("../../validation/tour");
const { getCityTours } = require("../../controllers/tour/getCityTours");
const { getToursOnSale } = require("../../controllers/tour/getToursOnSale");
const { ToursStats } = require("../../controllers/tour/toursStats");
const { responseFactory } = require("../../controllers/factory/factory");
const { search } = require("../../controllers/tour/search");

const tourRouter = express.Router();

tourRouter.post(
  "/",
  protect,
  uploadAnyFiles(),
  resizeTourImage,
  ValidTour,
  createTour
);
tourRouter.post("/search", search, responseFactory);

tourRouter.patch(
  "/:id",
  protect,
  uploadAnyFiles(),
  resizeTourImage,
  ValidTour,
  updateTour
);

tourRouter.delete("/:id", protect, deleteOneTour);

tourRouter.get("/", getAllTours, responseFactory);
tourRouter.get("/statistics", getAllTours, ToursStats, responseFactory);
tourRouter.get("/sales", getToursOnSale);
tourRouter.get("/:id", getOneTour);
tourRouter.get("/organizer/:organizerID", getAdminTours);
tourRouter.get("/city/:cityID", getCityTours);

module.exports = tourRouter;
