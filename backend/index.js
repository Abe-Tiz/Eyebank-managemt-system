const express = require("express");
const colors = require("colors");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const userRoute = require("./routes/userRoute");
const donorRoute = require("./routes/donorRoute");
const reportRoute = require("./routes/ReportRoute");
const corneaRoute = require("./routes/CorneaRoute");
const postRoutes = require("./routes/postRoutes.js");
const HospitalRoute = require("./routes/HospitalRoute");
const RecipientRoute = require("./routes/RecipientRoute");
const http = require("http");
const socketIO = require("socket.io");
const Donor = require("./models/Donor.js");

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 4000;

const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Initialize notification counter
let notificationCount = 0; 

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
  // Listen for a reset event to reset the notification count
  socket.on("resetNotificationCount", () => {
    if (notificationCount > 0) {
      notificationCount--;
    }
    io.emit("notificationCountReset", { count: notificationCount });
  });
  // Send the current count to the client when connected
  socket.emit("notificationCountReset", { count: notificationCount });
});

//! Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//! Allow cross-domain requests
const allowCrossDomain = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
};

app.use(allowCrossDomain);
app.use("/user", userRoute);
app.use("/donor", donorRoute);
app.use("/report", reportRoute);
app.use("/cornea", corneaRoute);
app.use("/post", postRoutes);
app.use("/hospital", HospitalRoute);
app.use("/recipient", RecipientRoute);

// Notification logic
const NotifyNewDonors = async () => {
  try {
    const changeStream = Donor.watch();

    changeStream.on("change", (data) => {
      if (data.operationType === "insert") {
        // console.log(
        //   "Inserted Document:",
        //   data.fullDocument,
        //   `time: ${data.wallTime}`
        // );
        notificationCount++; // Increment the notification counter
        io.emit("newDonorNotification", {
          donor: data.fullDocument,
          count: notificationCount, // Send the updated count to the client
        });
      }
    });
  } catch (error) {
    console.log(`error : ${error}`);
  }
};

// Call NotifyNewDonors when the server starts
NotifyNewDonors();

app.use(notFound);
app.use(errorHandler);

//! server port
server.listen(port, () => {
  console.log(`✅ server is running on port ${port}`.dim);
});
