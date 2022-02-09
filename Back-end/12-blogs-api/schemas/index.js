const Joi = require('joi');

const userSchema = Joi.object({
  displayName: Joi.string().min(8).required().messages({
    'string.min': '"displayName" length must be at least 8 characters long',
  }),
  email: Joi.string().email().required().messages({
    'string.email': '"email" must be a valid email',
    'string.required': '"email" is required',
  }),
  password: Joi.string().length(6).required().messages({
    'string.required': '"password" is required',
  }),
  image: Joi.string().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': '"email" must be a valid email',
    'string.required': '"email" is required',
  }),
  password: Joi.string().length(6).required().messages({
    'string.required': '"password" is required',
  }),
});

const categorieSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.required': '"name" is required',
  }),
});

const postSchema = Joi.object({
  title: Joi.string().required(),
  categoryIds: Joi.array().required(),
  content: Joi.string().required(),
});

const postUpdateSchema = Joi.object({
  title: Joi.string().required().messages({
    'string.required': '"title" is required',
  }),
  categoryIds: Joi.boolean().falsy(),
  content: Joi.string().required().messages({
    'string.required': '"content" is required',
  }),
});

module.exports = {
  userSchema,
  loginSchema,
  categorieSchema,
  postSchema,
  postUpdateSchema,
};
