const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: 'dxmamwpfy',
  api_key: '246991766556959',
  api_secret: 'EPF9mzWP_fvT89yVNhcAmj5NJrc',
});

 const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ['jpg', 'png'],
   filename: function (req, file, cb) {
     cb(null, file.originalname);
   },
 });

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads')
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname + '-' + Date.now() + '.jpg')
//   }
// });

const uploadCloud = multer({ storage });

module.exports = uploadCloud;
