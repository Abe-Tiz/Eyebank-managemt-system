const express = require('express');
const router = express.Router();

const videoController = require('../controller/VideoController');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
app.use(cors());
const { v4: uuidv4 } = require('uuid');
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(
      null,
      uuidv4() +
        file.fieldname +
        '-' +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

const fileFilter = function (req, file, callback) {
  const ext = path.extname(file.originalname);
  if ( ext !== '.mp4') {
    return callback(null, false);
  }
  callback(null, true);
};

const upload = multer({ storage, fileFilter });

router.get('/getVideo', videoController.getAllVideo);

router.get('/getVideo/:id', videoController.getVideoById);

router.put('/updateVideo/:id', videoController.updateVideoById);

router.delete('/deleteVideo/:id', videoController.deleteVideoById);

router.post(
  '/createVideo',
  upload.single('video'), // Use upload.single() for single file upload
  videoController.createVideo
);

module.exports = router;

