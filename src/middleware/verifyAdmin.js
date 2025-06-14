const configs = require("../configs");
// CUSTOM MIDDLEWARE: Checks token has high privledge = AUTHORISED
const isAdmin = async (req, res, next) => {
  if (req.user && req.user.role === configs.admin) {
    next();
  } else {
    res.status(403).json({ error: "Unauthorized" });
  }
};

module.exports = isAdmin;
