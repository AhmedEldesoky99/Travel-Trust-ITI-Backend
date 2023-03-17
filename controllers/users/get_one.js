const { userModel } = require("../../models");
const { successHandler, errorHandler } = require("../../utils/responseHandler");
exports.getOneUser = async (req, res, next) => {
  try {

    const user = await userModel
      .findOne({ _id: req.params.id })
      .populate("favorite_tours");
      console.log(user.id);
      console.log( req.params.id );
    if (!user) {
      throw errorHandler("user not found", 404);
    } else {
      successHandler(res, user);
    }
  } catch (err) {
    next(err);
  }
};
