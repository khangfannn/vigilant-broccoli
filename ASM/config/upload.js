const multer = require('multer');
const path = require('path');
const fs = require('fs');

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`)
  }
});

function checkFileUpload(req, file, cb) {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error('You must provide a file name'))
  }
  cb(null, true)
}

let upload = multer({ storage: storage, fileFilter: checkFileUpload })

module.exports = upload;
