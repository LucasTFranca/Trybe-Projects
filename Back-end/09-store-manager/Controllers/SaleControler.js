const { 
  saleRegisterVerification, getSalesVerification, updateSaleVerification, deleteSaleVerification,
} = require('../Services/SaleService');

const saleRegister = async (req, res, next) => {
  try {
    const itensSold = req.body;
    const id = await saleRegisterVerification(itensSold);
  
    return res.status(200).json({ _id: id, itensSold });
  } catch (erro) {
    console.log(`SALE REGISTER ${erro.message}`);

    return next(erro);
  }
};

const getAllSales = async (_req, res, next) => {
  try {
    const sales = await getSalesVerification();

    res.status(200).json({ sales });
  } catch (erro) {
    console.log(`GET SALES ${erro.message}`);

    return next(erro);
  }
};

const getSale = async (req, res, next) => {
  try {
    const { id } = req.params;

    const sale = await getSalesVerification(id);

    res.status(200).json(sale);
  } catch (erro) {
    console.log(`GET SALE ${erro.message}`);

    return next(erro);
  }
};

const updateSale = async (req, res, next) => {
  try {
    const { id } = req.params;
    const itensSold = req.body;
    const objResponse = { _id: id, itensSold };

    await updateSaleVerification(id, itensSold);

    res.status(200).json(objResponse);
  } catch (erro) {
    console.log(`UPDATE SALE ${erro.message}`);

    return next(erro);
  }
};

const deleteSale = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sale = await deleteSaleVerification(id);

    res.status(200).json(sale);
  } catch (erro) {
    console.log(`DELETE SALE ${erro.message}`);

    next(erro);
  }
};

module.exports = {
  saleRegister,
  getAllSales,
  getSale,
  updateSale,
  deleteSale,
};
