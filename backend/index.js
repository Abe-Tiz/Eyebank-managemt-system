const express = require("express");
const colors = require("colors");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const userRoute = require("./routes/userRoute");
const contactRoute = require("./routes/contactRoute");
const donorRoute = require("./routes/donorRoute");
const reportRoute = require("./routes/ReportRoute");
const corneaRoute = require("./routes/CorneaRoute");
const  postRoutes= require("./routes/postRoutes.js");

// const physicalExamRoutes = require("./routes/PhysicalExamRoute");
//const RecipientRoute = require("./routes/RecipientRoute");
dotenv.config();
connectDB();
const app = express();
const port = process.env.PORT || 4000;

//!  Middleware
app.use(
    cors()
);
app.use(express.json());
app.use(cookieParser());
// app.use(express.urlencoded({ extended: false }));

//!  Allow cross-domain requests
const allowCrossDomain = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};
app.use(allowCrossDomain);

app.use('/user', userRoute)
// app.use('/contact', contactRoute)
app.use('/donor', donorRoute)
app.use('/report', reportRoute)
app.use('/cornea', corneaRoute)
app.use("/post", postRoutes);

// app.use('/routes', RecipientRoute)
// app.use('/api', physicalExamRoutes);
app.use(notFound);
app.use(errorHandler);

//! server port  
app.listen(port, () => {
    console.log(`server is running on port ${port}`.dim);;
})