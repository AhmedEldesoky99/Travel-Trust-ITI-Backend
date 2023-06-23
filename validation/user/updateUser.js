const joi = require("joi");

//custom module
const { errorHandler } = require("../../utils/responseHandler");

const updateProfileSchema = joi.object({
  username: joi.string().min(3).required(),
  phone: joi.string().min(11).required(),
  bio: joi.string(),
  city: joi.number(),
  languages: joi.array(),
  job_profile: joi.string(),
  governorate_expertise: joi.array(),
});

const updateProfileValidator = async (req, res, next) => {
  try {
    await updateProfileSchema.validateAsync(req.body);
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
  updateProfileValidator,
};
