const { success } = require('../utils/library/statusCode');
const findAllProducts = require('../services/findAllProducts');

const findAllProductController = async (_request, resolve, next) => {
  try {
    const productsList = await findAllProducts();
    return resolve.status(success).json(productsList);
  } catch (error) {
    console.log('GET ALL PRODUCTS:', error);
    next(error);
  }
};

module.exports = {
  findAllProductController,
};
