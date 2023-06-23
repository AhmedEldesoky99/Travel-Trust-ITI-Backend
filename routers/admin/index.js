const { Router } = require("express");

const { protect } = require("../../controllers/auth/auth");
const { getAllOrganizers } = require("../../controllers/admin/getAllOrganizer");
const { verifyOrganizer } = require("../../controllers/admin/verifyOrganizer");
const { uploadIdentity } = require("../../controllers/users/uploadIdentity");

const adminRouter = Router();

adminRouter.get("/organizers", protect, getAllOrganizers, uploadIdentity);
adminRouter.patch("/verify/:organizerID", protect, verifyOrganizer);

module.exports = adminRouter;
