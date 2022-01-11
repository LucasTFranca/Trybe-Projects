const Joi = require('joi');

const saleSchema = Joi.array().items({
  productId: Joi.string().length(24).required(),
  quantity: Joi.number().greater(0).required(),
});

module.exports = { 
  saleSchema,
};
