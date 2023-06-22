const { userModel: User } = require("../../models");
const { successHandler } = require("../../utils/responseHandler");
const { isAdmin } = require("../auth/auth");

exports.getAllOrganizers = async (req, res, next) => {
  try {
    isAdmin(next, req.userID);

    const users = await User.find({ role: "organizer" }).limit(
      req.params.limit
    );

    successHandler(res, users, users.length);
  } catch (err) {
    next(err);
  }
};
