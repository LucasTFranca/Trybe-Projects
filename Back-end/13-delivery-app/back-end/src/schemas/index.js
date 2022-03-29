const Joi = require('@hapi/joi');

const schemaLogin = Joi.object({
  name: Joi.string().max(255),
  email: Joi.string().email().max(255).required(),
  password: Joi.string().min(6).max(255).required(),
});

const schemaOrder = Joi.object({
  products: Joi.array().items(
    Joi.object().keys({
      productId: Joi.number().required(),
      quantity: Joi.number().required(),
    }),
  ),
  totalPrice: Joi.number().required(),
  userId: Joi.number().required(),
  sellerId: Joi.number().required(),
  deliveryAddress: Joi.string().required().min(1),
  deliveryNumber: Joi.number().required(),
});

const userCreateSchema = Joi.object({
  name: Joi.string().min(12).required(),
  email: Joi.string().email().max(255).required(),
  password: Joi.string().min(6).max(255).required(),
});

const admUserCreateSchema = Joi.object({
  name: Joi.string().min(12).required(),
  email: Joi.string().email().max(255).required(),
  password: Joi.string().min(6).max(255).required(),
  role: Joi.string().max(255).required(),
});

module.exports = {
  schemaLogin,
  schemaOrder,
  userCreateSchema,
  admUserCreateSchema,
};
