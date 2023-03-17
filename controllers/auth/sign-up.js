const { userModel } = require("../../models/index");
const { errorHandler, successHandler } = require("../../utils/responseHandler");
const { hashPassword, signUserToken } = require("./auth");

exports.signUp = async (req, res, next) => {
  try {
    const { username, phone, email, ssn, password } = req.body;

    const { role } = req.params;
    if (!role || !["admin", "user"].includes(role)) {
      throw errorHandler("role must be admin or user");
    }
    if (role === "admin" && !ssn) {
      throw errorHandler("ssn is required for admin");
    }

    // check if user exist
    const checkedUser = await userModel.findOne({ email });
    if (checkedUser) {
      throw errorHandler(
        "email is already exist try different email or sign in",
        400
      );
    }
    // hash password
    const pass = await hashPassword(password);

    // create new user

    await userModel.create({ ...req.body, password: pass, role });

    //get the user
    const newUser = await userModel.findOne({ email });

    //add access token
    const access_token = await signUserToken(newUser.id);

    // handle response
    successHandler(res, {
      access_token,
      user: newUser,
    });
  } catch (err) {
    next(err);
  }
};
