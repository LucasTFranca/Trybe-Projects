const express = require('express');
const {
  recipeRegister,
  getAllRecipes,
  getRecipe,
  updateRecipe,
  deleteRecipe,
  addImage,
} = require('../controllers/recipeController');
const upload = require('../multer');

const recipeRouter = express.Router();

recipeRouter.post('/', recipeRegister);

recipeRouter.get('/', getAllRecipes);

recipeRouter.get('/:id', getRecipe);

recipeRouter.put('/:id/image', upload.single('image'), addImage);

recipeRouter.put('/:id', updateRecipe);

recipeRouter.delete('/:id', deleteRecipe);

module.exports = recipeRouter;
