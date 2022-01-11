const { productFindById, productUpdate } = require('../Models/ProductModel');
const { 
  saleInsert,
  salesFind,
  saleFindById,
  saleUpdate,
  saleDelete,
} = require('../Models/SaleModel');
const errorConstructor = require('../Utils/errorHandler');
const { idSchema } = require('./ProductsSchema');
const { saleSchema } = require('./SaleSchema');

const saleRegisterVerification = async (itensSold) => {
  const { error } = saleSchema.validate(itensSold);
  
  if (error) throw errorConstructor(422, 'invalid_data', 'Wrong product ID or invalid quantity');

  const product = await productFindById(itensSold[0].productId);

  if (product.quantity < itensSold[0].quantity) { 
    throw errorConstructor(404, 'stock_problem', 'Such amount is not permitted to sell');
  }

  const quantityUpdated = product.quantity - itensSold[0].quantity;

  productUpdate({ quantity: quantityUpdated }, itensSold[0].productId);

  const id = await saleInsert(itensSold);

  return id;
};

const getSalesVerification = async (id) => {
  if (!id) return salesFind();
  const { error } = idSchema.validate(id);

  if (error) throw errorConstructor(404, 'not_found', 'Sale not found');

  const sale = await saleFindById(id);

  if (!sale) throw errorConstructor(404, 'not_found', 'Sale not found');

  return sale;
};

const updateSaleVerification = async (id, itensSold) => {
  const { error } = saleSchema.validate(itensSold);

  if (error) throw errorConstructor(422, 'invalid_data', 'Wrong product ID or invalid quantity');

  await saleUpdate(id, itensSold);
};

const deleteSaleVerification = async (id) => {
  const { error } = idSchema.validate(id);

  if (error) throw errorConstructor(422, 'invalid_data', 'Wrong sale ID format');

  const sale = await saleFindById(id);

  if (!sale) throw errorConstructor(422, 'not_found', 'Sale not found');

  const product = await productFindById(sale.itensSold[0].productId);

  const quantityUpdated = product.quantity + sale.itensSold[0].quantity;

  await productUpdate({ quantity: quantityUpdated }, sale.itensSold[0].productId);

  await saleDelete(id);

  return sale;
};

module.exports = {
  saleRegisterVerification,
  getSalesVerification,
  updateSaleVerification,
  deleteSaleVerification,
};
