const {
  categorieRegisterVerification,
  getAllCategoriesVerification,
} = require('../services/categorieService');

const categorieRegister = async (req, res, next) => {
  try {
    const newCategorie = req.body;
    const categorie = await categorieRegisterVerification(newCategorie);

    return res.status(201).json(categorie);
  } catch (error) {
    console.log(`CATEGORIE REGISTER ${error.message}`);
    return next(error);
  }
};

const getAllCategories = async (_req, res, next) => {
  try {
    console.log('a');
    const categories = await getAllCategoriesVerification();

    return res.status(200).json(categories);
  } catch (error) {
    console.log(`CATEGORIE GET ALL ${error.message}`);
    return next(error);
  }
};

module.exports = {
  categorieRegister,
  getAllCategories,
};
