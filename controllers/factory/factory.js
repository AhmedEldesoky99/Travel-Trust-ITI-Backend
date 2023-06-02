const { successHandler } = require("../../utils/responseHandler");

exports.responseFactory = async (req, res, next) => {
  try {
    successHandler(
      res,
      req.Result?.data,
      req.Result?.length,
      req.Result?.message,
      req.Result?.status
    );
  } catch (err) {
    next(err);
  }
};
