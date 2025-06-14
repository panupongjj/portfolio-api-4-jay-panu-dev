const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const userValidate = require("../validations/userValidate");
const generateToken = require("../middleware/generateToken");
const loginValidate = require("../validations/loginValidate");

// POST http://localhost:5000/api/user/register
router.post("/register", userValidate, userController.register);

// POST http://localhost:5000/api/user/login
router.post("/login", loginValidate, generateToken, userController.login);

module.exports = router;
