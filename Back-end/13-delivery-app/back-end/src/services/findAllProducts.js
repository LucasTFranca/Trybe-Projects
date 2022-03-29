const { product } = require('../database/models');

module.exports = async () => {
  const productList = await product.findAll();
  return productList;
};
