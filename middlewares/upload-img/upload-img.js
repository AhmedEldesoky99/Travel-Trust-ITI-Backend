const multer = require("multer");
const sharp = require("sharp");
const { errorHandler } = require("../../utils/responseHandler");

exports.sharpHandler = async (buffer, id) => {
  const uniqueNumber = Date.now();
  await sharp(buffer)
    .resize({
      width: 600,
      fit: "contain",
      background: { r: 255, g: 255, b: 255, alpha: 0 },
    })
    .flatten({ background: "#fff" })
    .toFormat("jpeg")
    .webp({ quality: 80 })
    .toFile(`uploads/user-${id}-${uniqueNumber}.jpeg`);
  return `uploads/user-${id}-${uniqueNumber}.jpeg`;
};

//file
const storage = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, "uploads");
  },
  filename: (req, file, cd) => {
    const ext = file.mimetype.split("/")[1];
    cd(null, `user-${req.userID}-${Date.now()}.${ext}`);
  },
});
//buffer
const multerStorage = multer.memoryStorage();

const fileFilter = (req, file, cd) => {
  if (file.mimetype.startsWith("image")) cd(null, true);
  else cb(errorHandler("file must be image", 400), false);
};

exports.resizeTourImage = async (req, res, next) => {
  req.files = await Promise.all(
    req.files.map(async (item) => ({
      name: item.fieldname,
      file: await this.sharpHandler(item.buffer, req.userID),
    }))
  );
  next();
};

const upload = multer({ storage: multerStorage, fileFilter });
//upload single image
exports.uploadSingleImage = (image) => upload.single(image);

//upload multiple image
exports.uploadMultiImages = (arrayOfFields, edit = false) => {
  if (arrayOfFields.length === 0 && !edit) {
    throw errorHandler("require images ", 400);
  }
  return upload.fields(arrayOfFields);
};

exports.uploadAnyFiles = () => {
  return upload.any();
};
