const express = require('express');
const router = express.Router();
const { CreateContact } = require('../controller/ContactController');

const {awarenessController} = require('../controller/AwarenessController');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser'); // Add body-parser middleware
app.use(cors());
const { v4: uuidv4 } = require('uuid');
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
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
  var ext = path.extname(file.originalname);
  if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
    return callback(null, false);
  }
  callback(null, true);
};
const upload = multer({ storage, fileFilter });

router.get('/', awarenessController.getAllAwareness);

router.get('/getAwareness/:id', awarenessController.getAwarenessById);

router.put('/updateAwareness/:id', awarenessController.updateAwarenessById);

router.delete('/deleteAwarness/:id', awarenessController.deleteAwarenessById);

router.post(
  '/createAwareness',
  upload.single('photo'), // Use upload.single() for single file upload
  awarenessController.createAwareness
);

module.exports = router;