const User = require("../models/User");

const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};


const checkLoginValidation = (req, res, next) => {
  const { username, password, token } = req.body;;
  
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required." });
  }
  
  next();
};

 

// const getloggedInUser = asyncHandler(async (req, res) => {
//   const { token } = req.body;
//   try {
//     const user = jwt.verify(token, process.env.JWT_SECRET, (err, res) => {
//       if (err) {
//         return "token expired";
//       }
//       return res;
//     });
//     console.log(user);
//     if (user === "token expired") {
//       return res.send({ status: "error", data: "token expired" });
//     }

//     const useremail = user.email;
//     User.findOne({ email: useremail })
//       .then((data) => {
//         res.send({ status: "ok", data: data });
//       })
//       .catch((error) => {
//         res.send({ status: "error", data: error });
//       });
//   } catch (error) {
//     res.send({ status: "error", data: error });
//   }
// });


module.exports = { notFound, errorHandler, checkLoginValidation };
