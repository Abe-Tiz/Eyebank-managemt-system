const RecipientModel = require("../models/Recipient");
const HospitalModel = require("../models/Hospital");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Distribution = require("../models/CorneaDistribution");

const createRecipient = async (req, res) => {
    const {
        recipientname,
        age,
        diagnosis,
        surgeryType,
        address,
        hospital,
        sex,
        phone,
        registerDate,
        surgeonName,
    } = req.body;
    try {
        const recipient = await RecipientModel.create({
            recipientname,
            age,
            diagnosis,
            surgeryType,
            address,
            hospital,
            sex,
            phone,
            registerDate,
            surgeonName,
            ocularPost: {
                Post: req.body.Post,
                dateOfSurgry: req.body.dateOfSurgry,
                lotNo: req.body.lotNo,
                ocularOperativeEye: req.body.ocularOperativeEye,
                ocularNonOperativeEye: req.body.ocularNonOperativeEye,
            },
            adverse: {
                adversePost: req.body.adversePost,
                lotNo: req.body.lotNo,
                adverseReaction: req.body.adverseReaction,
                probablityCase: req.body.probablityCase,
                donorTissue: req.body.donorTissue,
                dateOfadverse: req.body.dateOfadverse,
            }
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
    try {
        const { surgeonName } = req.query; // Retrieve the surgeon ID from the query parameter
        const recipents = await RecipientModel.find({ name: surgeonName })
            .populate("surgeonName")
            .populate("hospital");
        res.json(recipents);
        console.log(surgeonName);
    } catch (err) {
        res.status(500).json({ error: "An error occurred while retrieving recipents." });
    }
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
const ocularPost = async (req, res) => {
    try {
        const recipient = await RecipientModel.findOneAndUpdate({ _id: req.params.id }, { $set: req.body });
        res.send(recipient);
    }
    catch (error) {
        throw error;
    }

}
const GetocularPost = async (req, res) => {
    try {
        const ocular = await RecipientModel.find();
        res.send(ocular);
    }
    catch (error) {
        throw error;
    }

}
const adverseReaction = async (req, res) => {
    try {
        const recipient = await RecipientModel.findOneAndUpdate({ _id: req.params.id }, { $set: req.body });
        // const adversed = Distribution.find();
        //  console.log("adversed:", adversed);
        res.send(recipient);
    }
    catch (error) {
        throw error;
    }
}
const SearchRecipient = async (req, res) => {
    try {
        const { recipientname } = req.body;
        const recipent = await RecipientModel.find({
            recipientname: { $regex: new RegExp(`^${recipientname}`, "i") },
        }).exec();
        if (recipent.length === 0) {
            return res.status(404).json({ message: "Recipient not found" });
        }
        // console.log(cornea);
        res.status(200).json(recipent);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
  createRecipient,
  getRecipients,
  getRecipient,
  updateRecipient,
  deleteRecipient,
  ocularPost,
  adverseReaction,
  SearchRecipient,
  GetocularPost,
};
