const joi = require("joi");
const { errorHandler } = require("../utils/responseHandler");

const uploadIdentity = joi.object({
  front: joi.array().required(),
  back: joi.array().required(),
});

const findItemInObj = (fileName, array) => {
  return array?.filter((item) => (item.name === fileName ? item : false));
};
const validIdentity = async (req, res, next) => {
  try {
    console.log("validIdentity");
    await uploadIdentity.validateAsync({
      front: findItemInObj("front_civil_photo", req.files),
      back: findItemInObj("back_civil_photo", req.files),
    });

    next();
  } catch (err) {
    errorHandler(
      err?.details?.map((err) => err.message),
      400
    );
  }
};
module.exports = { validIdentity };
