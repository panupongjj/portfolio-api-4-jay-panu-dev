//External import
const bcrypt = require("bcrypt");
const _ = require("lodash");

//Internal import
const { User } = require("../models/userModel");

const register = async (req, res) => {
  try {
    //console.log(req.body);
    // AUTH: Validate user is unique (email must be unique)
    let existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      // ERROR 400: DUPLICATE USER
      return res.status(400).send("Email already in use");
    }

    // Generate user object document with HASHED PWD
    const salt = await bcrypt.genSalt(10);
    let newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, salt),
      role: req.body.role,
    });

    // Save the user to db
    await newUser.save();

    // // Generate token & issue res
    // const token = newUser.generateAuthToken();
    // res.header("x-auth-token", token)

    let userData = _.pick(newUser, ["_id", "username", "email", "role"]);
    // userData.token = token;
    res.status(200).send(userData);
  } catch (err) {
    // LOG ERROR + ISSUE 500 RESPONSE
    console.log(err);
    res.status(500).json({
      message: "An internal server error has occurred 🔥",
    });
  }
};

const login = async (req, res) => {
  try {
    //console.log(req.body);

    // AUTH: Validate user is unique (email must be unique)
    let existingUser = await User.findOne({ email: req.body.email });
    if (!existingUser) {
      // ERROR 400: DUPLICATE USER
      return res.status(400).send("Invalid email or password");
    }

    // AUTH: CHECK PASSWORD MATCHES
    const validPassword = await bcrypt.compare(
      req.body.password,
      existingUser.password
    );
    if (!validPassword) {
      return res.status(400).send("Invalid email or password");
    }

    // AUTHENTICATION = LOGGED IN: ISSUE TOKEN & RESPONSE
    const token = existingUser.generateAuthToken();
    res.header("x-auth-token", token);
    //console.log(`x-auth-token = ${token}`);
    res.status(200).send(token);
  } catch (err) {
    // LOG ERROR + ISSUE 500 RESPONSE
    console.log(err);
    res.status(500).json({
      message: "An internal server error has occurred 🔥",
    });
  }
};

module.exports = { login, register };

// POST NEW USER
