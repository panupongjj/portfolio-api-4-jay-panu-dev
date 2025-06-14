const jwt = require("jsonwebtoken");
const configs = require("../configs");

// CUSTOM MIDDLEWARE: Checks token is in header = AUTHENTICATED
const verifyToken = (req, res, next) => {
  // FIND TOKEN IN HEADER
  const token = req.header("x-auth-token"); //Loads token from the header
  if (!token) {
    return res.status(401).send("Access Denied! No token provided");
  }

  // CHECK TOKEN IS CORRECTLY MINTED BY APP
  try {
    const decoded = jwt.verify(token, configs.apiAuthSecretKey);
    req.user = decoded; // Pass to NEXT piece of middleware
    next(); // Call next middleware!
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};

module.exports = verifyToken;
