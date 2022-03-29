const { 
  createOrderService, 
  getOrdersService, 
  getOrderByIdService, 
} = require('../services/orderServices');
const { success, created } = require('../utils/library/statusCode');

const createOrderController = async (req, res, next) => {
  try {
    const id = await createOrderService(req.body);

    res.status(created).json({ id });
  } catch (error) {
    console.log(`ORDER -> ${error.message}`);
    next(error);
  }
};

const getOrdersController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const orders = await getOrdersService(id);

    res.status(success).json(orders);
  } catch (error) {
    console.log(`GET ORDERS -> ${error.message}`);
    next(error);
  }
};

const getOrderByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await getOrderByIdService(id);

    res.status(success).json(order);
  } catch (error) {
    console.log(`GET ORDER BY ID -> ${error.message}`);
    next(error);
  }
};

module.exports = {
  createOrderController,
  getOrdersController,
  getOrderByIdController,
};
