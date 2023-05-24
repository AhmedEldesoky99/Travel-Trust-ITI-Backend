const { uploadCloud } = require("../../middlewares/cloudinary/cloudinary");
const {
  tourModel: Tour,
  CitiesModal: City,
  CategoryModel: Category,
} = require("../../models/index");
const { errorHandler, successHandler } = require("../../utils/responseHandler");

exports.updateTour = async (req, res, next) => {
  try {
    const { id } = req.params;

    const getTour = await Tour.findById(id).populate("organizer");

    if (!getTour) {
      throw errorHandler("invalid tour id", 404);
    }

    if (getTour.organizer.id !== req.userID) {
      throw errorHandler("unauthorized", 401);
    }
    const city = await City.findById(req.body.city);
    if (!city) {
      throw errorHandler("city id is invalid", 400);
    }
    const category = await Category.findById(req.body.category);
    if (!category) {
      throw errorHandler("category id is invalid", 400);
    }

    await Promise.all(
      req.files?.map(async (item) => {
        const uploadedFile = await uploadCloud(item.file);

        req.body[item.name] = [{ ...uploadedFile }];

        //check if plan image
        const isPlanImage = isFinite(item.name[5]);
        if (isPlanImage)
          req.body.plan[item.name[5]].image = [{ ...uploadedFile }];
      })
    );

    const tour = {
      organizer: req.userID,
      ...req.body,
    };

    await Tour.updateOne({ id }, { ...tour });

    next();
  } catch (err) {
    next(err);
  }
};
