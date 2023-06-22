const express = require("express");
const { protect } = require("../../controllers/auth/auth");

//image controller
const {
  uploadMultiImages,
  uploadAnyFiles,
  resizeTourImage,
} = require("../../middlewares/upload-img/upload-img");

const adminRouter = express.Router();

module.exports = adminRouter;
