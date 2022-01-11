const { 
  productInsert, 
  productFindByName, 
  productsFind, 
  productFindById,
  productUpdate,
  productDelete,
} = require('../Models/ProductModel');
const errorConstructor = require('../Utils/errorHandler');
const { productsSchema, idSchema } = require('./ProductsSchema');

const productRegisterVerification = async (name, quantity) => {
  const { error } = productsSchema.validate({ name, quantity });
  
  if (error) throw errorConstructor(422, 'invalid_data', error.message);

  const product = await productFindByName(name);

  if (product) throw errorConstructor(422, 'invalid_data', 'Product already exists');

  const id = await productInsert(name, quantity);

  return id;
};

const getProductsVerification = async (id) => {
  if (!id) return productsFind();
  const { error } = idSchema.validate(id);
  
  if (error) throw errorConstructor(422, 'invalid_data', error.message);

  const product = await productFindById(id);

  if (!product) throw errorConstructor(422, 'invalid_data', 'Wrong id format');
  
  return product;
};

const updateProductVerification = async (body, id) => {
  const { error } = productsSchema.validate(body);

  if (error) throw errorConstructor(422, 'invalid_data', error.message);

  await productUpdate(body, id);
};

const deleteProductVerification = async (id) => {
  const { error } = idSchema.validate(id);
  
  if (error) throw errorConstructor(422, 'invalid_data', error.message);

  const product = await productFindById(id);

  if (!product) throw errorConstructor(422, 'invalid_data', 'Product don`t exists');

  await productDelete(id);

  return product;
};

module.exports = { 
  productRegisterVerification,
  getProductsVerification,
  updateProductVerification,
  deleteProductVerification,
};
