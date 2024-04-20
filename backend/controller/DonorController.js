const Donor = require("../models/Donor");
const asyncHandler = require("express-async-handler");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
const twilio = require("twilio");

const express = require("express");
const app = express();
const http = require("http");
const socketIo = require("socket.io");
// const Donor = require("../models/Donor");
// const Donor = require("../models/Donor");
const server = http.createServer(app);
const io = socketIo(server);

let newDonorCount = 0;

const NotifyNewDonors = async () => {
  try {
    const changeStream = Donor.watch();

    changeStream.on("change", (data) => {
      console.log(
        "data : ",
        data,
        `operation Type : ${data.operationType}`,
        `time: ${data.wallTime}`
      );

      if (data.operationType === "insert") {
        console.log("Inserted Document:", data.fullDocument);
        newDonorCount++; // Increment the new donor count
        io.emit("newDonor", { count: newDonorCount }); // Emit socket event with the count
      }
    });
  } catch (error) {
    console.log(`error : ${error}`);
  }
};

//! Initialize Twilio client
const accountSid = process.env.ACCOUNT_SID;;
const authToken = process.env.AUTHTOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONENUMBER;
const client = twilio(accountSid, authToken);
 
//! create donor
const createDonor = asyncHandler(async (req, res) => {
    const {
        name,
        email,
        age,
        sex,
        city,
        subcity,
        kebele,
        HNumber,
        mobile,
        isVolunter,
        donate
    } = req.body;

    try {

        if (!name || !email) {
            console.log("Please Enter all the Feilds");
            res.status(400).json({ message: "Please Enter all the Feilds" });
        }

        Donor.findOne({ name: name })
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
                    mobile,
                    isVolunter,
                  });

                  //generate and store the verification token
                  newDonor.verificationToken = crypto
                    .randomBytes(20)
                    .toString("hex");

                  const result = newDonor.save();
                 
                    // NotifyNewDonors();
                    
                  console.log("new donor notify:",result);
                  console.log("Registeriation Successfull", result);
                  res.status(200).json({
                    message: "Registeriation Successfull",
                    result: newDonor,
                  });
                }
            })
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});


const loginDonor = asyncHandler(async (req, res) => {
    try {
        const { email, code } = req.body;

        const donor = await Donor.findOne({ email });

        if (!donor) {
            console.log("Donor is not found.");
            return res.status(404).json({ message: "Donor is not found." });
        }

        // Assuming 'code' is stored in the database as 'verificationCode'
        if (donor.verificationCode !== code) {
            console.log("Code is not matched");
            return res.status(400).json({ message: "Code is not matched" });
        } else {
            if (donor.verified) {
                console.log(donor)
                res.status(200).json({ status: "ok", data: donor });
            } else {
                console.log("donor not verified");
                res.status(401).json({ message: "donor not verified" });
            }
        }
    } catch (error) {
        console.error("Error in logindonor:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

const getloggedInDonor = asyncHandler(async (req, res) => {
    const { code } = req.body;
    try {
        Donor.findOne({ email: code })
            .then((data) => {
                res.send({ status: "ok", data: data });
            })
            .catch((error) => {
                res.send({ status: "error", data: error });
            });
    } catch (error) {
        res.send({ status: "error", data: error });
    }
});

//! send verification
const sendverificationEmail = async (email, verificationToken, route) => {
    //create nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "abebetizazu157@gmail.com",
            pass: "gezm fqmn asjl bqxj",
        },
    });

    //create nodemailer transporter


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

//! get verificaton
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


const forgotCode = asyncHandler(async (req, res) => {
    const { email } = req.body;
    try {
        const donor = await Donor.findOne({ email: email });
        if (donor) {
            if (donor.verified) {
                const token = jwt.sign({ donorId: donor._id }, process.env.JWT_SECRET, {
                    expiresIn: "1d",
                });

                //! create nodemailer transporter
                const transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                        user: "abebetizazu157@gmail.com",
                        pass: "gezm fqmn asjl bqxj",
                    },
                    tls: {
                        rejectUnauthorized: false,
                    },
                });

                //! compose the email message
                const mailOption = {
                    from: "abebetizazu157@gmail.com",
                    to: email,
                    subject: "Reset Code Link",
                    text: ` Please use This Link to change the short code : http://127.0.0.1:3000/reset_code/${donor._id}/${token}`,
                };

                transporter.sendMail(mailOption, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        return res.send({ Status: "Success" });
                    }
                });

                res.status(200).json({ donor, token });
                console.log(donor, token);
            } else {
                console.log(
                    "You are not a verified donor. Please verify your account first."
                );
                res.json({ message: "not verified" });
            }
        } else {
            console.log("donor is not found.");
            return res.status(404).json({ message: "donor is not found." });
        }
    } catch (error) {
        console.error("error::::", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


const resetCode = asyncHandler(async (req, res) => {
    const { id, token } = req.params;
    const { code } = req.body;

    try {
        // Verify the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.donorId !== id) {
            return res
                .status(403)
                .json({ status: "Forbidden", message: "Invalid token for this donor" });
        }
        // const hashedPassword = await Bcrypt.hash(password, 10);
        const updateddonor = await Donor.findByIdAndUpdate(
            { _id: id },
            { verificationCode: code }
        );

        if (!updateddonor) {
            return res
                .status(404)
                .json({ status: "Not Found", message: "donor not found" });
        }

        res.json({ status: "Success", message: "Password reset successfully" });
    } catch (error) {
        console.error(error);

        if (error.name === "JsonWebTokenError") {
            return res
                .status(401)
                .json({ status: "Unauthorized", message: "Invalid token" });
        }

        res
            .status(500)
            .json({ status: "Internal Server Error", error: error.message });
    }
});

//! get all donor
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

// displays donor by id
const getDonorById = asyncHandler(async (req, res) => {
    try {
        const id = req.params.id;;
        const donor = await Donor.findById(id);

        if (!donor) {
            return res.status(404).json({ message: "Donor not found" });
        }

        res.status(200).json(donor);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
    console.log(donor);
    res.status(200).json(donor);

});

//! displays donor by Email address
const getDonorByEmail = asyncHandler(async (req, res) => {
    try {
        const { email } = req.body;
        const donor = await Donor.findOne(
            { email },
            { new: true }
        ).exec();
        if (!donor) {
            return res.status(404).json({ message: "Donor not found" });
        }
          console.log(donor);
    res.status(200).json(donor);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});
//! displays donor by Email address
const getDonorByName = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    const donor = await Donor.find(
      // Search by name starting with the provided string, ignoring case
      { name: { $regex: new RegExp(`^${name}`, "i") } }
    ).exec();

    if (donor.length === 0) {
      return res.status(404).json({ message: "Donors not found" });
    }

    console.log(donor);
    res.status(200).json(donor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});



//! Update a donor
const updateDonor = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, age, sex, city, subcity, kebele, HNumber, mobile } =
        req.body;

        // Assuming you have a Donor model
        const updatedDonor = await Donor.findByIdAndUpdate(
        id,
        {
            name: name,
            email: email,
            age: age,
            sex: sex,
            city: city,
            subcity: subcity,
            kebele: kebele,
            HNumber: HNumber,
            mobile: mobile,
        },
        { new: true }
        );

        NotifyNewDonors();
        res
          .status(200)
          .json({
            message: "Donor Updated Successfully.",
            result: updatedDonor
          });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});


//! delete donor
const deleteDonor = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;

        // Assuming you have a Donor model
        await Donor.deleteOne(
            { _id: id },
            { new: true }
        );
        res.status(200).json({ message: "Donor deleted successfully." });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//! send email 
const sendEmail = async (email, verificationCode) => {
    //create nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "abebetizazu157@gmail.com",
            pass: "gezm fqmn asjl bqxj",
        },
        tls: {
            rejectUnauthorized: false,
        },
    });

    //compose the email message
    const mailOption = {
        from: "abebetizazu157@gmail.com",
        to: email,
        subject: "Email Activation Code ",
        text: `please click the following link to Login your Profile  verification code:${verificationCode} email: ${email} and use This Link: http://localhost:3000/donor-login`,
    };

    try {
        await transporter.sendMail(mailOption);
    } catch (error) {
        console.log("error sending email", error);
    }
};


//! activate the donor by admin
const activateDonor = async (req, res) => {
    const { id } = req.params;

    try {
        // Find the donor by ID and update their verified status
        const donor = await Donor.findByIdAndUpdate(
            id,
            { verified: true },
            { new: true }
        );

        if (!donor) {
            return res.status(404).json({ message: "Donor not found" });
        }

        // Generate and store verification code
        const verificationCode = Math.floor(1000 + Math.random() * 9000).toString();
        donor.verificationCode = verificationCode;
        await donor.save();

        console.log(donor.email, donor.verificationCode);

        sendEmail(donor.email, donor.verificationCode);
        // Send short code to donor's mobile number
        // await client.messages.create({
        //   body: `Your verification code is ${verificationCode}. Please login using this code and print  your card.`,
        //   from: twilioPhoneNumber,
        //   to: `+251${donor.mobile}`,
        // });

        res.status(200).json({ message: "Donor activated successfully", donor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

//! verify code
const verifyCode = async (req, res) => {
    const { mobile, code } = req.body;

    try {
        // Find the donor by mobile number and check if the code matches
        const donor = await Donor.findOne({ mobile });

        if (!donor || donor.verificationCode !== code) {
            return res.status(400).json({ message: 'Invalid verification code' });
        }

        res.status(200).json({ message: 'Verification successful', donor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

//////////
const donatedDonor=async(req,res)=>{
const Donor= await Donor.findOneAndUpdate({_id:req.params.id},{$set:req.body})
res.send(Donor)
}
//////////

const getRecentDonors = async (req, res) => {
  try {
      const recentDonors = await Donor.find().sort({
          _id: -1
      }).limit(5);

      if (recentDonors) {
        //    console.log("recent donors:", recentDonors);
           res.status(200).json(recentDonors);
      }
  } catch (error) {
    // console.error(`Error: ${error}`);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving recent donors." });
  }
};


module.exports = {
  createDonor,
  getDonor,
  updateDonor,
  getVerification,
  getDonorById,
  deleteDonor,
  getDonorByEmail,
  activateDonor,
  verifyCode,
  loginDonor,
  getloggedInDonor,
  forgotCode,
  resetCode,
  getDonorByName,
  getRecentDonors,
  donatedDonor
};
