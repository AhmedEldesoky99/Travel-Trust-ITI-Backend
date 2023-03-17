const express = require("express");
const { protect } = require("../../controllers/auth/auth");

const { getOneUser } = require("../../controllers/users/get_one");
const { updateUser } = require("../../controllers/users/update_user");

//image controller
const {
  uploadMultiImages,
} = require("../../middlewares/upload-img/upload-img");

const userRouter = express.Router();

userRouter.get("/:id", getOneUser);
userRouter.patch(
  "/",
  uploadMultiImages([
    { name: "photo", maxCount: 1 },
    { name: "cover_photo", maxCount: 1 },
  ]),
  protect,
  updateUser
);

module.exports = userRouter;
