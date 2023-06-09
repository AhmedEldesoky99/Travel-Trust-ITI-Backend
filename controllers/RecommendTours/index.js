const { RecommendToursForUser } = require("../../ML/Recommend");
const { tourModel: Tour } = require("../../models");
const { successHandler } = require("../../utils/responseHandler");

exports.RecommendToursToUser = async (req, res, next) => {
  try {
    const { userID } = req;
    const { limit } = req.query;

    const tours = await Tour.find({ publish: true });

    const items = tours.map((tour) => ({ id: +tour.id, score: 0 }));

    const result = await RecommendToursForUser({ userId: +userID, items });
    console.log(result, "result");
    let response = [];

    if (result.code === 200) {
      response = await Promise.all(
        result.items
          .slice(0, +limit || result.items.length)
          .map(async (item) => await Tour.findById(+item.id))
      );
    }
    console.log(response, "response");
    successHandler(res, response, response.length);
  } catch (err) {
    next();
  }
};