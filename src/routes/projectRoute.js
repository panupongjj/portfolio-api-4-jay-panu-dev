const express = require("express");
const router = express.Router();

// Import Controller to Handle query
const projectController = require("../controllers/projectController");

// Import Validation to Check incoming data
const projectsValidate = require("../validations/projectsValidate");
// MIDDLE WARE
const verifyToken = require("../middleware/verifyToken");
const verifyAdmin = require("../middleware/verifyAdmin");

// GET http://localhost:5000/api/project getProjectById
router.get("/", verifyToken, projectController.getAllProject);
router.get("/:id", verifyToken, projectController.getProjectById);
router.post("/", verifyToken, verifyAdmin, projectsValidate, projectController.addNewProject);
router.put("/:id",verifyToken,verifyAdmin, projectsValidate, projectController.updateProject);
router.delete("/:id", verifyToken, verifyAdmin, projectController.deleteProject);

//Export the router
module.exports = router;
