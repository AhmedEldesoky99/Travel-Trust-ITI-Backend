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

    let tour = {
      organizer: req.userID,
      highlight_photos: getTour.highlight_photos,
      food_photos: getTour.food_photos,
    };

    if (req.files.length > 0) {
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
      console.log("highlight_photos", req.body?.highlight_photos);
      if (req.body?.highlight_photos)
        tour = {
          ...tour,
          highlight_photos: [
            ...tour.highlight_photos,
            ...req.body.highlight_photos,
          ],
        };
      console.log("food_photos", req.body?.food_photos);

      if (req.body?.food_photos)
        tour = {
          ...tour,
          food_photos: [...tour.food_photos, ...req.body?.food_photos],
        };
    }

    await Tour.findByIdAndUpdate(id, { ...req.body, ...tour });

    const result = await Tour.findById(id);

    successHandler(res, result);
  } catch (err) {
    next(err);
  }
};
