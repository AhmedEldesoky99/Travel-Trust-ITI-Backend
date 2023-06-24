const { userModel: User } = require("../../models");
const { successHandler } = require("../../utils/responseHandler");
const { isAdmin } = require("../auth/auth");

exports.verifyOrganizer = async (req, res, next) => {
  try {
    isAdmin(next, req.userID);

    await User.findByIdAndUpdate(req.params.organizerID, { verified: true });

    successHandler(
      res,
      undefined,
      undefined,
      `organizer verified Successfully`
    );
  } catch (err) {
    next(err);
  }
};
