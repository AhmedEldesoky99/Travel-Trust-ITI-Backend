const { toursStats } = require("./helper");

exports.ToursStats = async (req, res, next) => {
  try {
    const { data } = req.Result;

    req.Result = {
      ...req.Result,
      length: undefined,
      data: {
        ...toursStats(data),
      },
    };
    next();
  } catch (err) {
    next(err);
  }
};
