const RecipientModel = require("../models/Recipient");
const HospitalModel = require("../models/Hospital");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

const createRecipient = async (req, res) => {
  const {
    recipientName,
    recipientId,
    age,
    registrationDate,
    diagnosis,
    surgeonName,
    hospital,
  } = req.body;
  try {
    const recipient = await RecipientModel.create({
      recipientName: recipientName,
      recipientId: recipientId,
      age: age,
      registrationDate: registrationDate,
      diagnosis: diagnosis,
      surgeonName: surgeonName,
      hospital: hospital,
    });
    if (recipient) {
      res.status(200).json({ recipient });
    }
  } catch (error) {
    throw error;
  }
};

// Retrieve all recipients
const getRecipients = async (req, res) => {
  const recipients = await RecipientModel.find()
    .populate({
      path: "surgeonName",
      select: "name",
    })
    .populate({
      path: "hospital",
      select: "hospitalName address",
    });
  res.send(recipients);
};

// Retrieve a recipient by id
const getRecipient = async (req, res) => {
  const recipient = await RecipientModel.findById(req.params.id);
  res.send(recipient);
};

// Update a recipient
const updateRecipient = async (req, res) => {
  const recipient = await RecipientModel.findOneAndUpdate(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.send(recipient);
};

// Delete a recipient
const deleteRecipient = async (req, res) => {
  const recipient = await RecipientModel.findByIdAndDelete(req.params.id);
  res.send(recipient);
};

module.exports = {
  createRecipient,
  getRecipients,
  getRecipient,
  updateRecipient,
  deleteRecipient,
};