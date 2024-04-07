const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
},
    role: {
      type: String,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    verificationToken: String,
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.models.User || mongoose.model("User", userSchema);
module.exports = User;
