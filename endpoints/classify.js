const multer = require('multer');

const { FILES_MAX_UPLOAD } = process.env;

const filesMaxUpload = FILES_MAX_UPLOAD || 3;

const multerStorage = multer.memoryStorage();
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) return cb(null, true);
  return cb('Non-image file received', false);
}

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
const uploadFiles = upload.array('images', filesMaxUpload);
 
module.exports = {
  '/predict': {
    handler: 'predict',
    verb: 'post',
    middlewares: [uploadFiles]
  }
};