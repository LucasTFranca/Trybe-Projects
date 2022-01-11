const express = require('express');
const { 
  productRegister, 
  getAllProducts, 
  getProduct, 
  updateProduct,
  deleteProduct,
} = require('../Controllers/ProductControler');

const productRouter = express.Router();

productRouter.post('/', productRegister);

productRouter.get('/', getAllProducts);

productRouter.get('/:id', getProduct);

productRouter.put('/:id', updateProduct);

productRouter.delete('/:id', deleteProduct);

module.exports = productRouter;
