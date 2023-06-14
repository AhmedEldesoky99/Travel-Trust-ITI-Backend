const joi = require("joi");
const { errorHandler } = require("../utils/responseHandler");

const validationObj = joi.object({
  title: joi.string().required(),
  city: joi.number().required(),
  category: joi.array().items(joi.number().required()).required(),
  price_per_person: joi.number().required(),
  person_num: joi.number().required(),
  duration: joi.number().required(),
  start_date: joi.date().required(),
  end_date: joi.date().required(),
  description: joi.string().required(),
  dress_code: joi.string().optional(),
  include: joi.array().items(joi.string()),
  time: joi.array(),
  meeting_point: joi.object().keys({
    latitude: joi.number().min(-90).max(90).required(),
    longitude: joi.number().min(-90).max(90).required(),
  }),
  publish: joi.boolean().required().default(true),
  highlight_photos: joi
    .array()
    .items(
      joi.object().keys({
        name: joi.string(),
        file: joi.string(),
      })
    )
    .required("highlight_photos is required"),
  food_photos: joi
    .array()
    .items(
      joi.object().keys({
        name: joi.string(),
        file: joi.string(),
      })
    )
    .required("food_photos is required"),
  sale: joi.number().min(1).max(99).optional(),
  plan: joi.array().items(
    joi.object().keys({
      title: joi.string().required(),
      start_time: joi.string(),
      end_time: joi.string(),
      details: joi.array().items(
        joi.object().keys({
          stop_location: joi.string().required(),
          duration: joi.string().required(),
        })
      ),
    })
  ),
});

const findItemInObj = (fileName, array) => {
  return array.filter((item) => (item.name === fileName ? item : false));
};
const ValidTour = async (req, res, next) => {
  try {
    console.log(findItemInObj("highlight_photos", req.files));
    await validationObj.validateAsync({
      ...req.body,
      highlight_photos: findItemInObj("highlight_photos", req.files),
      food_photos: findItemInObj("food_photos", req.files),
    });

    next();
  } catch (err) {
    console.log(err);
    next(errorHandler(err?.details?.map((err) => err.message)), 400);
  }
};

module.exports = { ValidTour };
