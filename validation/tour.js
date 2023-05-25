const joi = require("joi");
const { errorHandler } = require("../utils/responseHandler");

const validationObj = {
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
      start_time: joi.string().regex(/^((0?[1-9]|1[0-2]):[0-5]\d [ap]m)$/),
      end_time: joi.string().regex(/^((0?[1-9]|1[0-2]):[0-5]\d [ap]m)$/),
      stop_location: joi.array().items(joi.string().required()),
      duration: joi.array().items(joi.string().required()),
    })
  ),
};

const createTourSchema = joi.object(validationObj);
const updateTourSchema = joi.object({
  ...validationObj,
  highlight_photos: joi.string(),
  sale: joi.number(),
});

const findItemInObj = (itemName, arr) => {
  const item = arr.find((item) => item.name === itemName);
  return item?.file;
};

const createValidTour = async (req, res, next) => {
  try {
    await createTourSchema.validateAsync({
      ...req.body,
      highlight_photos: findItemInObj("highlight_photos", req.files),
    });
    next();
  } catch (err) {
    next(errorHandler(err.details.map((err) => err.message)), 400);
  }
};
const updateValidTour = async (req, res, next) => {
  try {
    await updateTourSchema.validateAsync({
      ...req.body,
      highlight_photos: findItemInObj("highlight_photos", req.files),
    });
    next();
  } catch (err) {
    next(errorHandler(err.details.map((err) => err.message)), 400);
  }
};

module.exports = { createValidTour, updateValidTour };
