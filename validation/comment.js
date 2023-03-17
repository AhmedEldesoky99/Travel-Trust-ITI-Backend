const joi = require("joi");
const { errorHandler } = require("../utils/responseHandler");

const CommentSchema = joi.object({
  title: joi.string().required(),
  content: joi.string().required(),
  rating: joi.number().min(1).max(5).required(),
});

const validComment = async (req, res, next) => {
  try {
    await CommentSchema.validateAsync(req.body);
    next();
  } catch (err) {
    next(errorHandler(err.details.map((err) => err.message)), 400);
  }
};

module.exports = { validComment };
