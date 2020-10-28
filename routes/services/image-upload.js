const aws = require('aws-sdk');
const multer = require('multer')
const multerS3 = require('multer-s3');
require('dotenv').config();
const AWS_ID = process.env.AWS_ACCESS_KEY_ID;
const AWS_KEY = process.env.AWS_SECRET_ACCESS_KEY 
const AWS_REGION = process.env.AWS_REGION

aws.config.update({
  secretAccessKey: AWS_KEY,
  accessKeyId: AWS_ID,
  region: AWS_REGION
})
 
const s3 = new aws.S3();

const fileFilter = (req,file, cb) => {
  if(file.mimetype.toLowerCase() ==='image/jpeg' || file.mimetype.toLowerCase() === 'image/png' || file.mimetype.toLowerCase() === 'image/jpg') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type, only jpeg and png is allowed.'),false);
  }
}
const upload = multer({
  fileFilter: fileFilter,
  acl: 'public-read',
  storage: multerS3({
    s3: s3,
    bucket: 'discgolfimages',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, req.user.id)
    }
  })
});

module.exports = upload;