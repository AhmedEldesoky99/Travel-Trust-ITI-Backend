const { userModel } = require("../../models/index");
const { errorHandler, successHandler } = require("../../utils/responseHandler");
const { comparePassword, signUserToken } = require("./auth");

const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { role } = req.params;

    // check if user exist
    const user = await userModel.findOne({ email }).select("password");
    const userBody = await userModel.findOne({ email }).populate("favorite_tours");
    if (!user) {
      throw errorHandler("user not found please sign up", 404);
    }
    if (role !== userBody.role) {
      throw errorHandler("user not found please sign up", 404);
    }
    await comparePassword(password, user.password);

    const access_token = await signUserToken(user.id);

    successHandler(
      res,
      {
        access_token,
        userBody,
      },
      "login successfully"
    );
  } catch (err) {
    next(err);
  }
};

module.exports = { signIn };
