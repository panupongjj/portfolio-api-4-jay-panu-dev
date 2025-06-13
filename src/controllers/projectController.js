const { Project } = require("../models/projectsModel");

// CREATE
const addNewProject = async (req, res) => {
  try {
    //  let project = new Project({
    //    projectName: req.body.projectName,
    //    technologiesHandles: {
    //      languages: req.body.technologiesHandles.languages,
    //      frameworks: req.body.technologiesHandles.frameworks,
    //      theories: req.body.technologiesHandles.theories,
    //      databases: req.body.technologiesHandles.databases,
    //    },
    //  });

    let project = new Project(req.body);
    // ISSUE DATABASE MODEL QUERY: Save to db
    project = await project.save();
    //console.log("ssss" + project);

    // ISSUE THE RESPONSE
    res.status(201).json({
      project: project,
      message: `The project, ${project.projectName}, has been saved 🐱`,
    });
  } catch (err) {
    // LOG ERROR + ISSUE 500 RESPONSE
    console.log(err);
    res.status(500).json({
      message: "An internal server error has occurred 🔥",
    });
  }
};

//  READ ALL
const getAllProject = async (req, res) => {
  try {
    console.log("Retrieving All Projects ...");
    const projects = await Project.find().sort("projectName");
    res.status(200).send(projects);
  } catch (err) {
    // LOG ERROR + ISSUE 500 RESPONSE
    console.log(err);
    res.status(500).json({
      message: "An internal server error has occurred 🔥",
    });
  }
};

//READ ONE BY ID
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).send("Project not found");
    res.send(project);
  } catch (err) {
    res.status(400).send("Invalid ID");
  }
};
//  Update by ID
// http://localhost:5000/api/project/[id]
const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!project) return res.status(404).send("Project not found");
    res.send(project);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

// Delete by ID
// http://localhost:5000/api/project/[id]
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).send("Project not found");
    res.send(project);
  } catch (err) {
    res.status(400).send("Invalid ID");
  }
};

module.exports = {
  getAllProject,
  getProjectById,
  addNewProject,
  updateProject,
  deleteProject,
};
