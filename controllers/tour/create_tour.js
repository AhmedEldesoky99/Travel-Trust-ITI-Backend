const { uploadCloud } = require("../../middlewares/cloudinary/cloudinary");
const { uploadCloudBB } = require("../../middlewares/imgBB");
const {
  tourModel: Tour,
  CitiesModal: City,
  CategoryModel: Category,
} = require("../../models/index");
const { errorHandler, successHandler } = require("../../utils/responseHandler");
const { isOrganizer } = require("../auth/auth");

exports.createTour = async (req, res, next) => {
  try {
    await isOrganizer(next, req.userID);

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
        req.files.map(async (item) => {
          console.log(item.file);
          const uploadedFile = await uploadCloudBB(item.file);

          if (item.name === "highlight_photos") {
            fileConsumer.highlight_photos.push(uploadedFile);
          }
          if (item.name === "food_photos") {
            fileConsumer.food_photos.push(uploadedFile);
          }

          //check if plan image
          const isPlanImage = isFinite(item.name[5]);
          if (isPlanImage) {
            // console.log(item.name[5]);
            req.body.plan[item.name[5]].image = [{ ...uploadedFile }];
          }
        })
      );
    }

    const noToursOfCity = await Tour.aggregate([
      { $group: { _id: "$city", tours_number: { $sum: 1 } } },
    ]);
    await Promise.all(
      noToursOfCity.map(async (item) => {
        await City.findByIdAndUpdate(item._id, {
          tours_number: item.tours_number,
        });
      })
    );

    const tour = new Tour({
      organizer: req.userID,
      ...req.body,
      highlight_photos: [...fileConsumer.highlight_photos],
      food_photos: [...fileConsumer.food_photos],
    });
    const createdTour = await Tour.create(tour);

    successHandler(res, createdTour, "tour created successfully");
  } catch (err) {
    next(err);
  }
};
