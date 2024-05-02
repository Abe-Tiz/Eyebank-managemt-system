const express = require("express");
const colors = require("colors");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const { notFound, errorHandler, checkLoginValidation } = require("./middleware/errorMiddleware");
const userRoute = require("./routes/userRoute");
//const contactRoute = require("./routes/contactRoute");
const donorRoute = require("./routes/donorRoute");
const ReportRoute = require("./routes/ReportRoute");
const corneaRoute = require("./routes/CorneaRoute");
const postRoutes = require("./routes/postRoutes.js");
const HospitalRoute = require("./routes/HospitalRoute");
const RecipientRoute = require("./routes/RecipientRoute");
const AccidentRoute = require("./routes/AccidentRoute");
const http = require("http");
const socketIO = require("socket.io");
const Donor = require("./models/Donor.js");

const corneaRequest = require("./routes/CorneaRequestRout");
const physicalExamRoutes = require("./routes/PhysicalExamRoute");
const AccidentalRoute = require("./routes/AccidentRoute");
const BloodRoute = require("./routes/BloodRoute");
const RequestRoute = require("./routes/RequestRoute");
const DistributionRoute = require("./routes/DistributionRoute");
const { scheduleExpirationCheck } = require("./utils/Scheduler.js");

//const RecipientRoute = require("./routes/RecipientRoute");
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
app.use("/report", ReportRoute);
app.use("/cornea", corneaRoute);
app.use("/post", postRoutes);
app.use("/hospital", HospitalRoute);
app.use("/recipient", RecipientRoute);
app.use('/hospital', HospitalRoute)
app.use('/recipient', RecipientRoute)
app.use('/requestCornea', corneaRequest)
app.use('/accident', AccidentRoute)



//! check the expiration date of the cornea
scheduleExpirationCheck();

// Notification logic
const NotifyNewDonors = async () => {
    try {
        const changeStream = Donor.watch();

    changeStream.on("change", (data) => {
      if (data.operationType === "insert") {
        notificationCount++;  
        io.emit("newDonorNotification", {
          donor: data.fullDocument,
          count: notificationCount,  
        });
      }
    });
  } catch (error) {
    console.log(`error : ${error}`);
  }
};

// Call NotifyNewDonors when the server starts
NotifyNewDonors();


app.use('/accident', AccidentalRoute)
app.use('/api', physicalExamRoutes);
app.use('/blood', BloodRoute)
app.use('/request', RequestRoute);
app.use('/distribution', DistributionRoute);
//app.use('/recipient', RecipientRoute)
app.use(notFound);
app.use(errorHandler);



//! check the expiration date of the cornea
scheduleExpirationCheck();

// Notification logic
// const NotifyNewDonors = async () => {
//   try {
//     const changeStream = Donor.watch();

//     changeStream.on("change", (data) => {
//       if (data.operationType === "insert") {
//         notificationCount++;  
//         io.emit("newDonorNotification", {
//           donor: data.fullDocument,
//           count: notificationCount,  
//         });
//       }
//     });
//   } catch (error) {
//     console.log(`error : ${error}`);
//   }
// };

// Call NotifyNewDonors when the server starts
// NotifyNewDonors();



//! server port
server.listen(port, () => {
    console.log(`✅ server is running on port ${port}`.dim);
});
