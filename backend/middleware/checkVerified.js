const checkVerified = (req, res, next) => {
  const user = req.user;  

  if (user && user.verified) {
    next();  
  } else {
    res.status(403).json({ message: "Unverified user" });
  }
};

module.exports = checkVerified;
