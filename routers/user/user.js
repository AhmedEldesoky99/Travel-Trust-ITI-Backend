const express = require("express");
const { protect } = require("../../controllers/auth/auth");

const { getOneUser } = require("../../controllers/users/get_one");
const { updateUser } = require("../../controllers/users/update_user");

//image controller
const {
  uploadMultiImages,
  uploadAnyFiles,
  resizeTourImage,
} = require("../../middlewares/upload-img/upload-img");
const { validIdentity } = require("../../validation/uploadIdentity");
const { uploadIdentity } = require("../../controllers/users/uploadIdentity");

const userRouter = express.Router();

userRouter.get("/:id", getOneUser);
userRouter.post(
  "/upload-identity",
  protect,
  uploadAnyFiles(),
  resizeTourImage,
  validIdentity,
  uploadIdentity
);
userRouter.patch("/", uploadAnyFiles(), resizeTourImage, protect, updateUser);
module.exports = userRouter;
