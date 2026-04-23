const Joi = require("joi");

const resgisterUserSchema = Joi.object({
  name: Joi.string().min(5).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9@#$%^&*!]{6,30}$/)
    .message(
      "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
    )
    .required(),
});

const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const resendVerificationEmailSchema = Joi.object({
  email: Joi.string().email().required(),
});

module.exports = {
    resgisterUserSchema,
    loginUserSchema,
    resendVerificationEmailSchema
}
