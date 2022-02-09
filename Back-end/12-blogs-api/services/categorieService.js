const { StatusCodes } = require('http-status-codes');
const { categorieSchema } = require('../schemas');
const { Categories } = require('../models');
const errorConstructor = require('../utils/functions/errorHandler');
const { categoryExists } = require('../utils/dictionary/errorMessage');

const categorieRegisterVerification = async (newCategorie) => {
  const { error } = categorieSchema.validate(newCategorie);
  if (error) throw errorConstructor(StatusCodes.BAD_REQUEST, error.message);

  const [categorie, wasCreated] = await Categories.findOrCreate({
     where: { name: newCategorie.name },
     defaults: newCategorie.name,
    });

  if (!wasCreated) throw errorConstructor(StatusCodes.CONFLICT, categoryExists);

  return categorie.dataValues;
};

const getAllCategoriesVerification = async () => {
  const categories = await Categories.findAll();

  return categories;
};

module.exports = {
  categorieRegisterVerification,
  getAllCategoriesVerification,
};
