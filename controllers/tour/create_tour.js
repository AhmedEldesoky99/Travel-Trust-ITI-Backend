const { uploadCloud } = require("../../middlewares/cloudinary/cloudinary");
const {
  tourModel: Tour,
  CitiesModal: City,
  CategoryModel: Category,
} = require("../../models/index");
const { errorHandler, successHandler } = require("../../utils/responseHandler");
const { isAdmin } = require("../auth/auth");

exports.createTour = async (req, res, next) => {
  try {
    await isAdmin(req.userID);

    const city = await City.findById(req.body.city);
    if (!city) {
      throw errorHandler("city id is invalid", 400);
    }
    const category = await Category.findById(req.body.category);
    if (!category) {
      throw errorHandler("category id is invalid", 400);
    }

    await Promise.allSettled(
      req.files.map(async (item) => {
        const uploadedFile = await uploadCloud(item.file);

        req.body[item.name] = [{ ...uploadedFile }];

        //check if plan image
        const isPlanImage = isFinite(item.name[5]);
        if (isPlanImage)
          req.body.plan[item.name[5]].image = [{ ...uploadedFile }];
      })
    );

    const noToursOfCity = await Tour.aggregate([
      { $group: { _id: "$city", tours_number: { $sum: 1 } } },
    ]);

    await Promise.allSettled(
      noToursOfCity.map(async (item) => {
        await City.findByIdAndUpdate(item._id, {
          tours_number: item.tours_number,
        });
      })
    );

    const tour = new Tour({
      organizer: req.userID,
      ...req.body,
    });
    const createdTour = await Tour.create(tour);
    successHandler(res, createdTour, "tour created successfully");
  } catch (err) {
    next(err);
  }
};
