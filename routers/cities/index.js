const { Router } = require("express");
const { getAllCities } = require("../../controllers/cities/getAll");

const citiesRouter = Router();

citiesRouter.get("/", getAllCities);

module.exports = citiesRouter;
