const Donor = require("../models/Donor");
const asyncHandler = require("express-async-handler");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

//create donor
const createDonor = asyncHandler(async (req, res) => {
    const { name, email ,age,sex,city, subcity, kebele, HNumber, mobile} = req.body;
    
    try {

        if (!name || !email) {
            console.log("Please Enter all the Feilds");
            res.status(400).json({message:"Please Enter all the Feilds"});
        }

        Donor.findOne({ name :name })
            .then((donor) => {
                if (donor) {
                    console.log(donor, "donor already exist.");
                    res.status(400).json({ message: "donor already exist." });
                } else {
                  const newDonor = new Donor({
                    name,
                    email,
                    age,
                    sex,
                    city,
                    subcity,
                    kebele,
                    HNumber,
                    mobile
                  });

                  //generate and store the verification token
                  newDonor.verificationToken = crypto
                    .randomBytes(20)
                    .toString("hex");
                const result = newDonor.save();
                  sendverificationEmail(
                    newDonor.email,
                    newDonor.verificationToken
                  );
                  
                  console.log("Registeriation Successfull", result);
                  res.status(200).json({
                    message: "Registeriation Successfull",
                    result: newDonor,
                  });
                }
            })
    } catch (error) {
        res.status(500).json({ error: "Internal se  rver error" });
    } 
});

const sendverificationEmail = async (email, verificationToken, route) => {
  //create nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "abebetizazu157@gmail.com",
      pass: "gezm fqmn asjl bqxj",
    },
  });

  //compose the email message
  const mailOption = {
    from: "abebetizazu157@gmail.com",
    to: email,
    subject: "Email verification",
    text: `please click the following link to verify your email http://127.0.0.1:4000/donor/verify/${verificationToken}`,
  };

  try {
    await transporter.sendMail(mailOption);
  } catch (error) {
    console.log("error sending email", error);
  }
};


const getVerification = asyncHandler(async (req, res) => {
    try {
    const token = req.params.tokenId;

    const donor = Donor.findOne({ verificationToken: token });

    donor.then((donor) => {
        if (!donor) {
            return res.status(404).json({ message: "Invalid token" });
        }

        donor.verified = true;
        donor.verificationToken = undefined;
        console.log(donor);
        Donor.create(donor);

        res.status(200).json({ message: "Email Verified Successfully" });
    });
    } catch (error) {
        console.log("error getting token.", error);
    res.status(500).json({ message: "Email verification failed" });
    }
})

//get all donor
const getDonor = asyncHandler(async (req, res) => {
  try {
    Donor.find()
      .maxTimeMS(20000)
      .then((respons) => {
        console.log(respons);
        res.json(respons);
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// const getDonorCount = asyncHandler(async (req, res) => {
  // try {
 
  //   const totalDonorsCount = await Donor.estimatedDocumentCount();
 
  //   const count = await Donor.countDocuments();
  //    res.status(200).json(count);
  // } catch (error) {
  //   console.error("Error:", error);
  //   res.status(500).json({ error: "Internal server error" });
  // }
// });


// displays donor by id
const getDonorById = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;;
    const donor = await Donor.findById(id).exec();

    if (!donor) {
      return res.status(404).json({ message: "Donor not found" });
    }

    res.status(200).json(donor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// displays donor by Email address
const getDonorByEmail = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body;  
    const donor = await Donor.findOne({ email }).exec();  
    if (!donor) {
      return res.status(404).json({ message: "Donor not found" });
    }
    res.status(200).json(donor);  
    console.log(donor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// Update a donor
const updateDonor = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, age, sex, city, subcity, kebele, HNumber, mobile } = req.body;

    // Assuming you have a Donor model
    const newDonor = await Donor.findByIdAndUpdate(id, {
      name : name,
      email : email,
      age : age,
      sex : sex,
      city : city,
      subcity: subcity,
      kebele: kebele,
      HNumber : HNumber,
      mobile : mobile,
    });
    const result= newDonor.save();

    res.status(200).json({ message: "Donor Updated Successfully.",result:newDonor });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

const deleteDonor = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    // Assuming you have a Donor model
    await Donor.deleteOne({ _id: id }); // Assuming the donor ID is stored in the "_id" field
    res.status(200).json({ message: "Donor deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



module.exports = {
  createDonor,
  getDonor,
  updateDonor,
  getVerification,
  getDonorById,
  deleteDonor,
  getDonorByEmail,
  // getDonorCount,
};
