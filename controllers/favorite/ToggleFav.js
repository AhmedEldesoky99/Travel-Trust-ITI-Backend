const { userModel: User, tourModel: Tour } = require("../../models/index");
const { errorHandler, successHandler } = require("../../utils/responseHandler");

exports.toggleFavorite = async (req, res, next) => {
  try {
    const tour = await Tour.findById(+req.params.tourID);
    if (!tour) {
      throw errorHandler("tour not found", 404);
    }
    const user = await User.findById(req.userID);
    console.log(req.userID);
    if (!user) {
      throw errorHandler("user not found", 404);
    }
    let favTours = [...user.favorite_tours];
    let mode = "";
    if (!favTours.includes(+req.params.tourID)) {
      mode = "add";
      favTours.push(+req.params.tourID);
    } else {
      mode = "remove";
      favTours = favTours.filter((item) => item !== +req.params.tourID);
    }
    console.log(favTours, "favTours");
    await User.findByIdAndUpdate(+req.userID, {
      favorite_tours: [...favTours],
    });

    successHandler(
      res,
      undefined,
      undefined,
      `tour was ${mode} to favorites successfully`
    );
  } catch (err) {
    next(err);
  }
};
