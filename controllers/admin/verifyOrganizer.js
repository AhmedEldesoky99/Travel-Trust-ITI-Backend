const { userModel: User } = require("../../models");
const { successHandler } = require("../../utils/responseHandler");
const { isAdmin } = require("../auth/auth");

exports.verifyOrganizer = async (req, res, next) => {
  try {
    isAdmin(next, req.userID);

    await User.findByIdAndUpdate(req.userID, { verified: true });
    const organizer = await User.findById(req.userID).select("civil_photos");
    successHandler(res, organizer, `organizer verified Successfully`);
  } catch (err) {
    next(err);
  }
};
