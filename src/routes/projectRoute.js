const express = require("express");
const router = express.Router();

// Import Controller to Handle query
const projectController = require("../controllers/projectController");
// Import Validation to Check incoming data
const projectsValidate = require("../validations/projectsValidate");
// MIDDLE WARE
//const verifyToken = require("../middleware/verifyAuth");
//const verifyAdmin = require("../middleware/verifyAdmin");

// GET http://localhost:5000/api/project getProjectById
router.get("/", projectController.getAllProject);
router.get("/:id", projectController.getProjectById);
router.post("/", projectsValidate, projectController.addNewProject);
router.put("/:id", projectsValidate, projectController.updateProject);
router.delete("/:id", projectController.deleteProject);

//Export the router
module.exports = router;
