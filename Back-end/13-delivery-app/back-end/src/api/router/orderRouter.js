const express = require('express');
const {
  createOrderController,
  getOrdersController,
  getOrderByIdController,
} = require('../../controllers/orderController');
const auth = require('../../middlewares/auth');

const orderRouter = express.Router();

orderRouter.post('/', auth, createOrderController);
orderRouter.get('/:id', auth, getOrdersController);
orderRouter.get('/details/:id', auth, getOrderByIdController);

module.exports = orderRouter;
