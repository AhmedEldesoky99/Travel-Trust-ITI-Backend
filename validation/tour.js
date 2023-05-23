const joi = require("joi");
const { errorHandler } = require("../utils/responseHandler");

const tourSchema = joi.object({
  title: joi.string().required(),
  city: joi.string().required(),
  category: joi.string().required(),
  price_per_person: joi.number().required(),
  person_num: joi.number().required(),
  duration: joi.number().required(),
  start_date: joi.date().required(),
  end_date: joi.date().required(),
  description: joi.string(),
  dress_code: joi.string(),
  include: joi.array().items(joi.string()),
  meeting_point: joi.string(),
  pubish: joi.boolean(),
  highlight_photos: joi.string().required(),
  plan: joi.array().items(
    joi.object().keys({
      title: joi.string().required(),
      start_date: joi.date().required(),
      end_date: joi.date().required(),
      stop_location: joi.string().required(),
      duration: joi.number().required(),
    })
  ),
});

const findItemInObj = (itemName, arr) => {
  const item = arr.find((item) => item.name === itemName);
  return item?.file;
};

const validTour = async (req, res, next) => {
  try {
    await tourSchema.validateAsync({
      ...req.body,
      highlight_photos: findItemInObj("highlight_photos", req.files),
    });
    next();
  } catch (err) {
    next(errorHandler(err.details.map((err) => err.message)), 400);
  }
};

module.exports = { validTour };
