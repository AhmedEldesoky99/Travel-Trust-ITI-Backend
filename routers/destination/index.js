const { Router } = require("express");
const { getAllDestinations } = require("../../controllers/destination/getAll");

const destinationRouter = Router();

destinationRouter.get("/", getAllDestinations);

module.exports = destinationRouter;
