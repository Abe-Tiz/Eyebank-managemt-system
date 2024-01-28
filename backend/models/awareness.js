const mongoose = require('mongoose');

const AwarenessModelSchema = new mongoose.Schema({
  title: String,
  content: String,
  photo: String,
  date: Date,
});

const AwarenessModel = mongoose.model('awareness', AwarenessModelSchema);
module.exports = AwarenessModel;