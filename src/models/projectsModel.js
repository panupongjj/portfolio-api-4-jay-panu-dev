const mongoose = require("mongoose");

// SCHEMA: "What will the data in this collection look like?"
const projectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50,
  },
  technologiesHandles: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
  },
  showCaseStatusHandles: {
    type: Map,
    of: String,
  },
  linkHandles: {
    type: Map,
    of: String,
  },
  picturesHandles: {
    type: Map,
    of: String,
  },
});

// MODEL: Provides database functionality "Add new user"
const ProjectsList = mongoose.model("ProjectsList", projectSchema);

exports.ProjectsList = ProjectsList;
