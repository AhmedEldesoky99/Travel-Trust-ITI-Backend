const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const util = require("util");

//custom module
const { userModel } = require("../../models/index");
const { errorHandler } = require("../../utils/responseHandler");

const salt = 10;

const signAsync = util.promisify(jwt.sign);

const hashPassword = async (password) =>
  await bcrypt.hash(password, (saltKey = salt));

const comparePassword = async (password, hash) => {
  const isCorrectPassword = await bcrypt.compare(password, hash);
  if (!isCorrectPassword) {
    throw errorHandler("username or password is invalid", 401);
  }
};

const signUserToken = async (id) =>
  await signAsync({ id }, process.env.JWT_SECRET);

const protect = async (req, res, next) => {
  try {
    let token;
    const { authorization } = req.headers;
    if (authorization && authorization.startsWith("Bearer")) {
      token = authorization.split(" ")[1];
    }
    if (!token) {
      throw err;
    } else if (req.cookie?.jwt) {
      token = req.cookie.jwt;
    }

    const decoded = await util.promisify(jwt.verify)(
      token,
      process.env.JWT_SECRET
    );

    const validUser = await userModel.findById(decoded.id);

    if (!validUser) throw err;

    req.userID = decoded.id;
    req.user = validUser;
    next();
  } catch (err) {
    next(errorHandler(err.message ?? "unauthorized", 401));
  }
};
const isAdmin = async (id) => {
  const user = await userModel.findById(id);
  if (user.role !== "admin") {
    throw errorHandler("admins only can create tour", 400);
  }
};

module.exports = {
  protect,
  hashPassword,
  signUserToken,
  comparePassword,
  isAdmin,
};
