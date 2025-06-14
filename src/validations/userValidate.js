const Joi = require("joi");

const userSchema = Joi.object({
  username: Joi.string().min(3).max(50).alphanum().required(),
  email: Joi.string().min(5).max(255).required().email(),
  password: Joi.string().min(5).max(1024).required(),
  role: Joi.string().valid("admin", "guest").default("guest"),
});

const validateNewUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);

  if (error) {
    return res.status(400).send({ error: error.details[0].message });
  }

  next();
};

module.exports = validateNewUser;
