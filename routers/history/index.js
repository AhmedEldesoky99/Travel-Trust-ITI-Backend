const { Router } = require("express");
const { protect } = require("../../controllers/auth/auth");
const { getUserHistory } = require("../../controllers/history/getById");
const { addToHistory } = require("../../controllers/history/add");

const historyRouter = Router();

historyRouter.get("/", protect, getUserHistory);
historyRouter.get("/:tourID", protect, addToHistory);

module.exports = historyRouter;
