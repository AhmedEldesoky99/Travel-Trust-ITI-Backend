// function to handle error
function errorHandler(error, status) {
  return {
    status,
    response: {
      success: false,
      message: [error],
    },
  };
}

// function to handle success
function successHandler(
  res,
  data = undefined,
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
