const { Router } = require("express");
const { getAllCategory } = require("../../controllers/category/getAll");

const categoryRouter = Router();

categoryRouter.get("/", getAllCategory);

module.exports = categoryRouter;
