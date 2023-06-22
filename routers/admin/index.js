const { Router } = require("express");

const { protect } = require("../../controllers/auth/auth");
const { getAllOrganizers } = require("../../controllers/admin/getAllOrganizer");

const adminRouter = Router();

adminRouter.get("/organizers", protect, getAllOrganizers);
// adminRouter.patch("/verify/:organizerID", protect, verifyOrganizer);

module.exports = adminRouter;
