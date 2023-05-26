const { RecommendToursForUser } = require("../../ML/Recommend");
const { tourModel: Tour } = require("../../models");
const { successHandler } = require("../../utils/responseHandler");

exports.RecommendToursToUser = async (req, res, next) => {
  try {
    const { userID, limit } = req;
    const tours = await Tour.find();

    const items = tours.map((tour) => ({ id: tour.id, score: 0 }));

    // const result = await RecommendToursForUser({ userId, items });
    // console.log(result);

    // if (result.data.code === 200) {
    // }
    successHandler(res, { userId: userID, items });
  } catch (err) {
    next();
  }
};
