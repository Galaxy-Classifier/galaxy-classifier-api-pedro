const multer = require('multer');
const upload = multer({ dest: '../uploads' });

const { FILES_MAX_UPLOAD } = process.env;

const filesMaxUpload = FILES_MAX_UPLOAD || 3;

module.exports = {
  '/predict': {
    handler: 'predict',
    verb: 'post',
    middlewares: [upload.fields([{ name: 'galaxies', maxCount: filesMaxUpload }])]
  }
};