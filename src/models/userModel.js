const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const configs = require("../configs");

// SCHEMA: "What will the data in this collection look like?"
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50,
  },
  email: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 255,
    unique: true,
    // match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/ , 'Please enter a valid email address']
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 1024,
  },
  role: {
    type: String,
    enum: ["admin", "guest"],
    default: "guest",
  },
});

// BINDING METHOD generateAuthToken TO MODEL:
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.email,
      role: this.role,
    },
    configs.apiAuthSecretKey
  );
  return token;
};

// MODEL: Provides database functionality "Add new user"
const User = mongoose.model("User", userSchema);

exports.User = User;
