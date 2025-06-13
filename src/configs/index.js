require("dotenv").config();

module.exports = {
  Port: process.env.PORT,
  apiAuthSecretKey: process.env.API_AUTH_SECRET_KEY,
  connectionStr: process.env.IS_CLOUD_USING
    ? process.env.MONGO_CLOUD_ATLAS
    : process.env.MONGO_DOCKER_ATLAS,
  isCloud: process.env.IS_CLOUD_USING,
  admin: process.env.ROLE_ADMIN,
  guest: process.env.ROLE_GUEST,
};
