const { verify } = require("jsonwebtoken");

exports.authMW = (req, res, next) => {
  try {
    const { authorization: token } = req.headers;
    const payload = verify(token, process.env.JWT_SECRET);
    res.local.userID = payload.user._id;
    next();
  } catch (err) {
    res.status(401).json("invalid token " + err);
  }
};
