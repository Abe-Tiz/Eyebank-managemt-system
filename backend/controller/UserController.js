const User = require("../models/User");
const Bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
 
const createUser = asyncHandler(async (req, res) => {
  const { name, email, image, password, role } = req.body;
  try {
    User.findOne({ email: email }).then((user) => {
      if (user) {
        console.log(user, "User already exist.");
        res.status(400).json({ message: "User already exist." });
      } else {
        Bcrypt.hash(password, 10)
          .then((hash) => {
            const newUser = new User({
              name,
              email,
              image,
              password: hash,
              role,
            });
            //generate and store the verification token
            newUser.verificationToken = crypto.randomBytes(20).toString("hex");
            newUser.save();
            sendverificationEmail(newUser.email, newUser.verificationToken);
            console.log(result);
            res.status(200).json({ message: "Registeriation Successfull" });
          })
          .catch((err) => res.json(err));
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Internal se  rver error" });
  }
});

const sendverificationEmail = async (email, verificationToken, route) => {
  //! create nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "abebetizazu157@gmail.com",
      pass: "gezm fqmn asjl bqxj",
    },
  });

  //! compose the email message
  const mailOption = {
    from: "abebetizazu157@gmail.com",
    to: email,
    subject: "Email verification",
    text: `please click the following link to verify your email http://127.0.0.1:4000/user/verify/${verificationToken}`,
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

    const user = User.findOne({ verificationToken: token });

    user.then((user) => {
        if (!user) {
            return res.status(404).json({ message: "Invalid token" });
        }

        user.verified = true;
        user.verificationToken = undefined;
        console.log(user);
        User.create(user);

        res.status(200).json({ message: "Email Verified Successfully" });
    });
    } catch (error) {
        console.log("error getting token.", error);
    res.status(500).json({ message: "Email verification failed" });
    }
})

const loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      console.log("User is not found.");
      return res.status(404).json({ message: "User is not found." });
    }

    const passwordMatch = await Bcrypt.compare(password, user.password);

    if (passwordMatch) {
      if (user.verified) {
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });

        res.status(200).json({ status: "ok", data: token, user });
      } else {
        console.log("User not verified");
        res.json({ message: "Not verified" });
      }
    } else {
      console.log("Password is not matched");
      res.status(500).json({ message: "Password is not matched" });
    }
  } catch (error) {
    console.error("Error in loginUser:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const getloggedInUser = asyncHandler(async (req, res) => {
    const { token } = req.body;
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET, (err, res) => {
        if (err) {
          return "token expired";
        }
        return res;
      });
      console.log(user);
      if (user === "token expired") {
        return res.send({ status: "error", data: "token expired" });
      }

      const useremail = user.email;
      User.findOne({ email: useremail })
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

const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
          if (user.verified) {
            const token = jwt.sign(
              { userId: user._id },
              process.env.JWT_SECRET,
              {
                expiresIn: "1d",
              }
            );

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
              subject: "Reset Password Link",
              text: `http://127.0.0.1:3000/reset_password/${user._id}/${token}`,
            };

            transporter.sendMail(mailOption, function (error, info) {
              if (error) {
                console.log(error);
              } else {
                return res.send({ Status: "Success" });
              }
            });
            res.status(200).json({ user, token });
            console.log(user);
          } else {
            console.log(
              "You are not a verified user. Please verify your account first."
            );
            res.json({ message: "not verified" });
          }
    } else {
      console.log("User is not found.");
      return res.status(404).json({ message: "User is not found." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.userId !== id) {
      return res
        .status(403)
        .json({ status: "Forbidden", message: "Invalid token for this user" });
    }
    const hashedPassword = await Bcrypt.hash(password, 10);
    const updatedUser = await User.findByIdAndUpdate(
      { _id: id },
      { password: hashedPassword }
    );

    if (!updatedUser) {
      return res
        .status(404)
        .json({ status: "Not Found", message: "User not found" });
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

const getUser = asyncHandler(async (req, res) => {
    try {
    User.find()
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

const deleteUser =  asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    // Assuming you have a Donor model
    await User.deleteOne({ _id: id }); // Assuming the donor ID is stored in the "_id" field
    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = {
  createUser,
  getUser,
  getVerification,
  loginUser,
  deleteUser,
  forgotPassword,
  resetPassword,
  getloggedInUser,
};

