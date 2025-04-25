const Joi = require("joi");

const signupValidation = (req, res, next) => {
  const { DOB } = req.body;

  if (DOB) {
    const birthDate = new Date(DOB);
    const today = new Date();

    // Check if DOB is in the future
    if (birthDate > today) {
      return res.status(400).json({
        message: "Date of Birth cannot be in the future",
        success: false,
      });
    }

    // Calculate age
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    // Check if user is under 16
    if (age < 16) {
      return res.status(400).json({
        message: "User must be at least 16 years old",
        success: false,
      });
    }
  }

  const schema = Joi.object({
    seeker_name: Joi.string().min(4).max(30).required(),
    email: Joi.string().email().required(),
    location: Joi.string().min(2).max(50).required(),
    qualification: Joi.string().min(2).max(200).required(),
    DOB: Joi.date().required(),
    password: Joi.string().min(6).max(12).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
      success: false,
    });
  }

  next();
};

const updateValidation = (req, res, next) => {
  const schema = Joi.object({
    seeker_name: Joi.string().min(4).max(30).required(),
    email: Joi.string().email().required(),
    location: Joi.string().min(2).max(50).required(),
    qualification: Joi.string().min(2).max(200).required(),
    DOB: Joi.date().required(), // YYYY-MM-DD
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
    email: Joi.string().email().required(),
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
  updateValidation,
};
