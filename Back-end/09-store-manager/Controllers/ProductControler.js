const { 
  productRegisterVerification, 
  getProductsVerification,
  updateProductVerification,
  deleteProductVerification,
} = require('../Services/ProductService');

const productRegister = async (req, res, next) => {
  try {
    const { name, quantity } = req.body;

    const id = await productRegisterVerification(name, quantity);
  
    return res.status(201).json({ _id: id, name, quantity });
  } catch (erro) {
    console.log(`PRODUCT REGISTER ${erro.message}`);

    return next(erro);
  }
};

const getAllProducts = async (_req, res, next) => {
  try {
    const products = await getProductsVerification();

    res.status(200).json({ products });
  } catch (erro) {
    console.log(`GET PRODUCTS ${erro.message}`);

    return next(erro);
  }
};

const getProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await getProductsVerification(id);

    res.status(200).json(product);
  } catch (erro) {
    console.log(`GET PRODUCT ${erro.message}`);

    return next(erro);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const objResponse = { _id: id, ...req.body };

    await updateProductVerification(req.body, id);

    res.status(200).json(objResponse);
  } catch (erro) {
    console.log(`UPDATE PRODUCT ${erro.message}`);

    return next(erro);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await deleteProductVerification(id);

    res.status(200).json(product);
  } catch (erro) {
    console.log(`DELETE PRODUCT ${erro.message}`);

    next(erro);
  }
};

module.exports = { 
  productRegister,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
