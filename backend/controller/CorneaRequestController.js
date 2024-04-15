const CorneaRequestModel = require("../models/CorneaRequest");
const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");
exports.createCorneaRequest = async (req, res) => {
  try {
    const { surgeon, hospital, isApproved, descriptionOfRequest } = req.body;
    const request = await CorneaRequestModel.create({
      surgeon,
      hospital,
      isApproved,
      descriptionOfRequest,
    });
    //configure the email transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "teferamollawerkineh@gmail.com",
        pass: "ohkvhybmohzkpjim",
      },
    });




    // Define the email content
    const emailContent = `
    New Cornea Request Created:
    Surgeon: ${surgeon}
    Hospital: ${hospital}
    Is Approved: ${isApproved}
    Description: ${descriptionOfRequest}
  `;
    // Send the email
    const mailOptions = {
      from: 'teferamollawerkineh@gmail.com',
      to: 'abebe.tizazu33@gmail.com, abebetizazu157@gmail.com, tefera2111@gmail.com,awoke668@gmail.com',
      subject: 'New Cornea Request Created',
      text: emailContent,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent successfully: " + info.response);
      }
    });
    res.json(request);
  } catch (err) {
    res.json(err);
  }
};

exports.getCorneaRequestController = async (req, res) => {
  try {
    const corneaRequests = await CorneaRequestModel.find({})
      .populate("surgeon")
      .populate("hospital");
    res.json(corneaRequests);
  } catch (err) {
    res.json(err);
  }
};

exports.getSingleCorneaRequestController = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    const corneaRequest = await CorneaRequestModel.findById(id).exec();

    if (!corneaRequest) {
      return res.status(404).send({
        success: false,
        message: "Cornea request not found",
      });
    }

    console.log(corneaRequest);
    console.log("tefera");

    res.status(200).send({
      success: true,
      message: "Single request fetched",
      corneaRequest,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting single cornea request",
      error: error.message,
    });
  }
});

exports.deleteCorneaRequestController = async (req, res) => {
  try {
    await CorneaRequestModel.findByIdAndDelete(req.params.pid);
    res.status(200).json({
      success: true,
      message: "Cornea request deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error while deleting cornea request",
      error,
    });
  }
};

exports.approveCorneaRequestController = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the donor by ID and update their verified status
    const request = await CorneaRequestModel.findByIdAndUpdate(
      id,
      { isApproved: true },
      { new: true }
    );

    if (!request) {
      return res.status(404).json({ message: "request is not found" });
    }

    res.status(200).json({ message: "request approved successfully", request });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateCorneaRequestController = async (req, res) => {
  try {
    const { id } = req.params;
    const { descriptionOfRequest, isApproved } = req.body;

    const newRequest = await CorneaRequestModel.findByIdAndUpdate(id, {
      descriptionOfRequest: descriptionOfRequest,
      isApproved: isApproved,
    });
    const result = newRequest.save();
    res
      .status(200)
      .json({ message: "request Updated Successfully.", result: newRequest });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
