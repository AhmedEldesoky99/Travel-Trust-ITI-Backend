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

    const getTour = await Tour.findById(id);

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
    let fileConsumer = { highlight_photos: [], food_photos: [] };
    if (req.files.length > 0) {
      await Promise.all(
        req.files?.map(async (item) => {
          const uploadedFile = await uploadCloud(item.file);

          if (item.name === "highlight_photos") {
            fileConsumer.highlight_photos.push(uploadedFile);
          }
          if (item.name === "food_photos") {
            fileConsumer.food_photos.push(uploadedFile);
          }

          //check if plan image
          const isPlanImage = isFinite(item.name[5]);
          if (isPlanImage)
            req.body.plan[item.name[5]].image = [{ ...uploadedFile }];
        })
      );
    }

    await Tour.findByIdAndUpdate(id, {
      ...req.body,
      highlight_photos: [
        ...getTour.highlight_photos,
        ...fileConsumer.highlight_photos,
      ],
      food_photos: [...getTour.food_photos, ...fileConsumer.food_photos],
    });

    const result = await Tour.findById(id);

    successHandler(res, result);
  } catch (err) {
    next(err);
  }
};
