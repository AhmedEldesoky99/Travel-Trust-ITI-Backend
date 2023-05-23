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
const { validTour } = require("../../validation/tour");
const { getCityTours } = require("../../controllers/tour/getCityTours");

const tourRouter = express.Router();

tourRouter.post(
  "/",
  protect,
  uploadAnyFiles(),
  // validTour,
  resizeTourImage,
  createTour
);
tourRouter.put(
  "/:id",
  protect,
  uploadMultiImages(
    [
      { name: "highlight_photos", maxCount: 4 },
      { name: "food_photos", maxCount: 4 },
    ],
    true
  ),
  validTour,
  resizeTourImage,
  updateTour
);

tourRouter.delete("/:id", protect, deleteOneTour);
tourRouter.get("/:id", getOneTour);
tourRouter.get("/", getAllTours);
tourRouter.get("/organizer/:organizerID", getAdminTours);
tourRouter.get("/city/:cityID", getCityTours);

module.exports = tourRouter;
