const express = require('express');
const { 
  saleRegister,
  getAllSales,
  getSale,
  updateSale,
  deleteSale,
} = require('../Controllers/SaleControler');

const saleRouter = express.Router();

saleRouter.post('/', saleRegister);

saleRouter.get('/', getAllSales);

saleRouter.get('/:id', getSale);

saleRouter.put('/:id', updateSale);

saleRouter.delete('/:id', deleteSale);

module.exports = saleRouter;
