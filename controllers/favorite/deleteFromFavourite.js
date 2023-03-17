const { userModel, tourModel} = require("../../models/index");
const { errorHandler, successHandler } = require("../../utils/responseHandler");


exports.deleteFromFavorites = async (req, res, next) =>{
    try {
        const { tourID } = req.params;
        const tour = await tourModel.findById(tourID);
        const user = await userModel.findById(req.userID);
        console.log(tour,user);
        if (!tour) {
            throw errorHandler("tour not found", 404);
          }
          if (!user) {
            throw errorHandler("user not found", 404);
          }
          let favoritesArr = [...user.favorite_tours];
          const result = favoritesArr.filter(
            (item) => parseInt(item) !== parseInt(tourID)
          );
          await userModel.findByIdAndUpdate(req.userID,
            { favorite_tours: result }
          );
          const updatedUser = await userModel.findById(req.userID);
        successHandler(res, updatedUser, "tour was removed from favorites successfully");
    } catch (err) {
        next(err);
    }
}