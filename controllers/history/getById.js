const { HistoryModal: History } = require("../../models/index");
const { successHandler } = require("../../utils/responseHandler");

exports.getUserHistory = async (req, res, next) => {
  try {
    const { userID } = req;
    const history = await History.findOne({ user: userID }).populate("tours");

    successHandler(res, history || []);
  } catch (err) {
    next(err);
  }
};
