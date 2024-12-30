const Joi = require("joi");

const signupValidation = (req, res, next) => {
  const schema = Joi.object({
    company_name: Joi.string().min(4).max(30).required(),
    location: Joi.string().min(2).max(50).required(),
    description: Joi.string().min(20).max(200).required(),
    username: Joi.string().min(4).max(18).required(),
    password: Joi.string().min(6).max(12).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: "Bad request",
      error,
    });
  }
  next();
};

const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().min(4).max(18).required(),
    password: Joi.string().min(6).max(12).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: "Bad request",
      error,
    });
  }
  next();
};

module.exports = {
  signupValidation,
  loginValidation,
};
