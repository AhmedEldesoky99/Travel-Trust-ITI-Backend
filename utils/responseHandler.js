// function to handle error
function errorHandler(error = "Something went wrong", status = 500) {
  return {
    status,
    response: {
      success: false,
      message: error,
    },
  };
}

// function to handle success
function successHandler(
  res,
  data = [],
  length = undefined,
  message = "Data retrieved successfully",
  status = 200
) {
  res.status(status).json({
    success: true,
    length,
    message,
    data,
  });
}

module.exports = {
  errorHandler,
  successHandler,
};
