const { userModel, tourModel} = require("../../models/index");
const { errorHandler, successHandler } = require("../../utils/responseHandler");

exports.addToFavorites = async (req, res, next) =>{
    try {
      const { tourID } = req.params;
      const tour = await tourModel.findById(tourID);
      const user = await userModel.findById(req.userID);
      if (!tour) {
           throw errorHandler("tour not found", 404);
        }
      console.log(tour);
      if (!user) {
        throw errorHandler("user not found", 404);
      }
      let favoritesArr = [...user.favorite_tours];
      if (!user.favorite_tours.includes(tourID)) {   
        favoritesArr.push(tourID);
        await userModel.findByIdAndUpdate( req.userID,
          { favorite_tours: favoritesArr }
         );
      }else{
        throw errorHandler("tour is already added to favorites",400);
      }
      const updatedUser = await userModel.findById(req.userID);
        successHandler(res,updatedUser, "tour was add to favorites successfully");
    } catch (err) {
        next(err);
    }
}