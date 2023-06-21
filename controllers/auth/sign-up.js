const { userModel } = require("../../models/index");
const { errorHandler, successHandler } = require("../../utils/responseHandler");
const { hashPassword, signUserToken } = require("./auth");

exports.signUp = async (req, res, next) => {
  try {
    const { username, phone, email, ssn, password } = req.body;

    const { role } = req.params;
    if (!role || !["organizer", "user"].includes(role)) {
      throw errorHandler("role must be organizer or user ");
    }
    if (role === "organizer" && !ssn) {
      throw errorHandler("ssn is required for organizer");
    }
    // check if user exist
    const checkedUserEmail = await userModel.findOne({ email });

    if (checkedUserEmail) {
      throw errorHandler(
        "email is already exist try different email or sign in",
        400
      );
    }
    const checkedUserName = await userModel.findOne({ username });
    if (checkedUserName) {
      throw errorHandler(
        "username is already exist try different username ",
        400
      );
    }
    const checkedUserSSN = await userModel.findOne({ ssn });
    if (checkedUserSSN) {
      throw errorHandler("ssn is already exist try different ssn ", 400);
    }
    // hash password
    const pass = await hashPassword(password);

    // create new user

    const createUser = await userModel.create({
      ...req.body,
      password: pass,
      role,
      ssn: role === "user" ? username : ssn,
    });

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
