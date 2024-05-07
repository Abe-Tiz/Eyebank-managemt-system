const express = require("express");
const mongoose = require("mongoose");

const app = express();
const colors = require("colors");
const Donor = require("../models/Donor");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`🔗 MongoDB Connected: ${conn.connection.host}`.cyan.underline);
        const db = mongoose.connection;

        db.once("open", () => {
            const userChangeStream = Donor.watch();

            userChangeStream.on("change", (change) => {
                if (change.operationType === "insert") {
                    console.log("New user inserted:", change.fullDocument);
                    // You can emit an event or send a notification
                    // For simplicity, let's send a response to the client
                    // You could also use Socket.io to emit a real-time notification to the client
                    app.get("/notify", (req, res) => {
                        res.json({
                            message: "New user inserted",
                            user: change.fullDocument,
                        });
                    });
                }
            });
        });
    } catch (error) {
        console.error(`Error: ${error.message}`.red.bold);
        process.exit(1); //!  Exit with a non-zero status code to indicate an error
    }
};

module.exports = connectDB;
