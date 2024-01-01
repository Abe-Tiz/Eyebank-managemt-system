const path = require('path');
const AwarenessModel = require('../models/awareness');

exports.getAllAwareness = async (req, res) => {
  try {
    const awareness = await AwarenessModel.find({});
    res.json(awareness);
  } catch (err) {
    res.json(err);
  }
};

exports.getAwarenessById = async (req, res) => {
  try {
    const id = req.params.id;
    const awareness = await AwarenessModel.findOne({ _id: id });
    res.json(awareness);
  } catch (err) {
    res.json(err);
  }
};

exports.updateAwarenessById = async (req, res) => {
    try {
      const id = req.params.id;
      const awareness = await AwarenessModel.findOneAndUpdate(
        { _id: id },
        {
          title: req.body.title,
          content: req.body.content,
          photo: req.body.photo,
          date:req.body.date,
        },
        { new: true }
      );
      res.json(awareness);
    } catch (err) {
      res.json(err);
    }
  };

exports.deleteAwarenessById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await AwarenessModel.findByIdAndDelete({ _id: id });
    res.json(result);
  } catch (err) {
    res.json(err);
  }
};

exports.createAwareness = async (req, res) => {
    try {
      const { title, content,date} = req.body;
      const photo = req.file.filename;
      const awareness = await AwarenessModel.create({ title, date,content, photo});
      res.json(awareness);
    } catch (err) {
      res.json(err);
    }
  };
