const Joi = require("joi");

const signupSchema = Joi.object({
  firstname: Joi.string().required().messages({
    "string.empty": "First name is required",
  }),
  lastname: Joi.optional(),
  email: Joi.string().email().required().messages({
    "string.email": "Email must be a valid email",
    "string.empty": "Email is required",
  }),

  password: Joi.string().required().messages({
    "string.empty": "Password is required",
  }),
  avatar: Joi.optional()
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Email must be a valid email",
    "string.empty": "Email is required",
  }),

  password: Joi.string().required().messages({
    "string.empty": "Password is required",
  }),

});

const taskSchema = Joi.object({
  title: Joi.string().required().messages({
    "string.empty": "Title is required",
  }),
  description: Joi.optional(),
  email : Joi.optional(),
  status: Joi.string().required().messages({
    "string.empty": "Status is required",
  }),
});

const validateSignup = async (req, res, next) => {
  try {
    const { error } = signupSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

const validateLogin = async (req, res, next) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

const validateTask = async (req, res, next) => {
  try {
    const { error } = taskSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong!" });
  }
};

module.exports = {
  validateSignup,
  validateLogin,
  validateTask,
};
