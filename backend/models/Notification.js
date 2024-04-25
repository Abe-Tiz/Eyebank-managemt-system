const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    donorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Donor",
    },
    newDonor: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);


const Notification = mongoose.models.Notification || mongoose.model("Notification", notificationSchema);

module.exports = Notification;