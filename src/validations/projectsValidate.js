const Joi = require("joi");

// LOGIN VALIDATION

const projectSchema = Joi.object({
  projectName: Joi.string().min(3).max(50).required(),
  // Map with Mixed values: accept string, array
  technologiesHandles: Joi.object().pattern(
    Joi.string(),
    Joi.alternatives().try(Joi.string(), Joi.array().items(Joi.string()))
  ),
  // Maps with only string values
  showCaseStatusHandles: Joi.object().pattern(Joi.string(), Joi.string()),
  linkHandles: Joi.object().pattern(Joi.string(), Joi.string()),
  picturesHandles: Joi.object().pattern(Joi.string(), Joi.string()),
});

const validateProject = (req, res, next) => {
  const { error } = projectSchema.validate(req.body);

  if (error) {
    return res.status(400).send({ error: error.details[0].message });
  }
  next();
};

module.exports = validateProject;
/*
Example usage
const project = {
  projectName: 'My Portfolio',
  technologiesHandles: {
   languages: ["HTML", "Java"],
   frameworks: ["Node.js", "Express"],
   theories: ["Closure", "Singletons"],
   databases: ["MongoDB"],
  },
  showCaseStatusHandles: {
    display: 'pined', // pined, hide, show
    priority: '10' // 1-100
  },
  linkHandles: {
    github: 'https://github.com/example',
    website: 'https://example.com'
  },
  picturesHandles: {
    thumbnail: 'https://example.com/thumb.jpg',
    banner: 'https://example.com/banner.jpg'
    icon:'https://example.com/icon.jpg'
  }
};

*/
