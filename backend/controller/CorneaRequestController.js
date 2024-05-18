const CorneaRequestModel = require("../models/CorneaRequest");
const nodemailer = require("nodemailer");
exports.createCorneaRequest = async (req, res) => {
  try {
    const { surgeon, hospital, isApproved,distribute, descriptionOfRequest,suiatablity} = req.body;
    const request = await CorneaRequestModel.create({
      surgeon,
      hospital,
      isApproved,
      descriptionOfRequest,
      suiatablity,
      distribute
    });

    //configure the email transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "teferamollawerkineh@gmail.com",
        pass: "ohkvhybmohzkpjim",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    
    const emailContent = `
    New Cornea Request Created:
    Surgeon: ${surgeon}
    Hospital: ${hospital}
    Is Approved: ${isApproved}
    Description: ${descriptionOfRequest}
    Suiatablity: ${suiatablity}
    Distribute: ${distribute}
  `;
    
    const mailOptions = {
      from: "teferamollawerkineh@gmail.com",
      to: "tefera2111@gmail.com,awoke668@gmail.com",
      subject: "New Cornea Request Created",
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
    const { surgeonId } = req.query; // Retrieve the surgeon ID from the query parameter
    const corneaRequests = await CorneaRequestModel.find({ surgeon: surgeonId })
      .populate("surgeon")
      .populate("hospital");
    res.json(corneaRequests);
  } catch (err) {
    res.status(500).json({ error: "An error occurred while retrieving cornea requests." });
  }
};

exports.getCorneasRequestController = async (req, res) => {
  try {
   const corneaRequests = await CorneaRequestModel.find({
     isGetCornea: false,
     isApproved: true
   })
     .populate("surgeon")
     .populate("hospital");
    res.json(corneaRequests);
  } catch (err) {
    res.json(err);
  }
};

exports.getSingleCorneaRequestController = async (req, res) => {
  try {
    const corneaRequest = await CorneaRequestModel.findById(req.params.id)
    .populate("surgeon","name")
    .populate("hospital","hospitalName");
    
    if (corneaRequest) {
      res.status(200).json(corneaRequest);
    } else {
      res.status(404).json({ error: "Cornea request not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to get cornea request" });
  }
};

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

exports.distributeCorneaRequestById = async (req, res) => {
  const { id } = req.params;
  try {
    const request = await CorneaRequestModel.findByIdAndUpdate(
      id,
      { distribute: true },
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

exports.distributedCorneaController = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the donor by ID and update their verified status
    const distributed = await CorneaRequestModel.findByIdAndUpdate(
      id,
      { distribute: true },
      { new: true }
    );

    if (!distributed) {
      return res.status(404).json({ message: "distributed is not found" });
    }

    res.status(200).json({ message: "distributed successfully", distributed });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getCorneaBLotnum =async (req, res) => {
  try {
      const { descriptionOfRequest } = req.body;
      const cornea = await CorneaRequestModel.find({
        descriptionOfRequest: { $regex: new RegExp(`^${descriptionOfRequest}`, "i") },
      }).exec();
      if (cornea.length === 0) {
          return res.status(404).json({ message: "Cornea not found" });
      }
      // console.log(cornea);
      res.status(200).json(cornea);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
  }
};