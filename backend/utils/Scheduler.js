const nodeCron = require("node-cron");
const Cornea = require("../models/Cornea");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const pass = process.env.EMAIL_PASS;
const user =process.env.EMAIL_USER;
// console.log("userrrrrrrrr:", pass);
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: user,
        pass: pass,
    },
    tls: {
        rejectUnauthorized: false,
    },
});

// Function to send an email to the admin
const sendEmailToAdmin = (cornea) => {
    const mailOptions = {
      from: "abebetizazu157@gmail.com",
      to: "abebe.tizazu33@gmail.com",
      subject: "Cornea Expiration Notification",
      text: `The cornea with ID ${cornea._id} is about to expire in ${
        14 - cornea.expirationDate
      } day. Please take the necessary action.`,
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent successfully: " + info.response);
        }
    });
};

/*
    Daily job to update expiration status and send email if necessary
    This will run every day at midnight  to handle the expire date of cornea
    Check if the expiration status is less than 14 before incrementing
*/
const scheduleExpirationCheck = () => {
    nodeCron.schedule("00 00 * * *", async () => {
        console.log("Running a task at 6:00 PM Every Mid night!!");
        const corneas = await Cornea.find({});
        corneas.forEach(async (cornea) => {
          const createdAtDate = new Date(cornea.createdAt);
          const currentDate = new Date();
          const daysSinceCreation = Math.floor(
            (currentDate - createdAtDate) / (1000 * 60 * 60 * 24)
            );
             cornea.expirationDate = daysSinceCreation;
            await cornea.save();
            console.log(`Cornea expire date all: ${cornea.expirationDate}`);
            // if (cornea.expirationDate < 14) {
            if (cornea.expirationDate === 13) {
              sendEmailToAdmin(cornea);
              console.log(`Cornea expire date: ${cornea.expirationDate}`);
            }
            // }
        });
  });
}

module.exports = { scheduleExpirationCheck };
