const mongoose = require('mongoose');

const VideoModelSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: String,
  video: String,
});

const VideoModel = mongoose.model('video', VideoModelSchema);
module.exports = VideoModel;