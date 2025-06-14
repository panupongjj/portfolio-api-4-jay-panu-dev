const jwt = require('jsonwebtoken');
const configs = require('../configs')

const generateToken = async (req, res, next) => {

  const { username, email, role='guest' } = req.body;

  try {
    const token = jwt.sign(
      { username, email, role }, 
      configs.apiAuthSecretKey, 
      {expiresIn: "1h"}
   );

    req.token = token; 
    next(); 

  } catch (error) {
    console.error("JWT Generation Error:", error);
    return res.status(500).json({ error: "Token generation failed" });
  }
};

module.exports = generateToken;
