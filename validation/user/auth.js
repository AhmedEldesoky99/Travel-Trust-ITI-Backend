const joi = require("joi");

//custom module
const { errorHandler } = require("../../utils/responseHandler");

const signupSchema = joi.object({
  username: joi.string().min(3).required(),
  email: joi.string().email().required(),
  phone: joi.string().min(11).required(),
  password: joi.string().required().min(6),
  ssn: joi.string().length(16),
  confirm_password: joi
    .any()
    .valid(joi.ref("password"))
    .required()
    .label("confirm password")
    .messages({ "any.only": "{{#label}} does not match" }),
});

const signinScehma = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required().min(6),
});

const signupValid = async (req, res, next) => {
  try {
    await signupSchema.validateAsync(req.body);
    next();
  } catch (err) {
    next(
      errorHandler(
        err.details.map((err) => err.message),
        400
      )
    );
  }
};

const signinValid = async (req, res, next) => {
  try {
    await signinScehma.validateAsync(req.body);
    next();
  } catch (err) {
    next(
      errorHandler(
        err.details.map((err) => err.message),
        400
      )
    );
  }
};

module.exports = {
  signupValid,
  signinValid,
};
