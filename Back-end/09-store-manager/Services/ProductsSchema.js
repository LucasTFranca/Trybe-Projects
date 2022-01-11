const Joi = require('joi');

const productsSchema = Joi.object({
  name: Joi.string().min(5).required(),
  quantity: Joi.number().greater(0).required().messages({
    'number.greater': '"quantity" must be larger than or equal to 1',
  }),
  
});

const idSchema = Joi.string().length(24).required().messages({
  'string.length': 'Wrong id format',
});

module.exports = { 
  productsSchema,
  idSchema,
};
