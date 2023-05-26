const Router = require("express");
const { RecommendToursToUser } = require("../../controllers/RecommendTours");
const { protect } = require("../../controllers/auth/auth");

const RecommendTours = Router();

RecommendTours.get("/", protect, RecommendToursToUser);

module.exports = RecommendTours;
