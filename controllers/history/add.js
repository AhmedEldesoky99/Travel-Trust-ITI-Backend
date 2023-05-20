const {
  HistoryModal: History,
  tourModel: Tour,
} = require("../../models/index");
const { successHandler, errorHandler } = require("../../utils/responseHandler");

exports.addToHistory = async (req, res, next) => {
  try {
    const { tourID } = req.params;
    const { userID } = req;
    const history = await History.findOne({ user: userID });
    const tour = await Tour.findById(tourID);

    let historyResponse = history;

    if (!tour) {
      throw errorHandler("tour is not found", 404);
    }

    if (!history) {
      const newHistory = new History({
        user: userID,
        tours: tourID,
      });
      historyResponse = await History.create(newHistory);

      console.log(history, "27");
    } else {
      if (!history.tours.includes(tourID)) {
        historyResponse = await History.findByIdAndUpdate(history.id, {
          tours: [...history.tours, tourID],
        });
      }
    }

    successHandler(res, historyResponse);
  } catch (err) {
    next(err);
  }
};
