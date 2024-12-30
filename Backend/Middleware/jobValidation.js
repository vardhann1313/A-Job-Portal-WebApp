const Joi = require("joi");

const insertJob = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().min(2).max(18).required(),
    location: Joi.string().min(2).max(50).required(),
    type: Joi.string().min(6).max(9).required(),
    role: Joi.string().min(4).max(50).required(),
    salary: Joi.number().required(),
    requirements: Joi.string().min(10).max(500).required(),
    is_active: Joi.boolean().required(),
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
  insertJob,
};
