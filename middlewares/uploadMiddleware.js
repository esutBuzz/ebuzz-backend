const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

// Define file filter for multer
const fileFilter = (req, file, callback) => {
  // Accept only image and video files
  if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
    callback(null, true);
  } else {
    callback(new Error('Only image and video files are allowed.'), false);
  }
};

const upload = multer({
    storage: storage,
    limits:{fileSize: 1024 * 1024 * 5}, // max fileSize is set to 5mb
    fileFilter: fileFilter
});

const uploadMiddleware = upload.array('files', 5); // max no of uploads is set to 5

module.exports = uploadMiddleware;
