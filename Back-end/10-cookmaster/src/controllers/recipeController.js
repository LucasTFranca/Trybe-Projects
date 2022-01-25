const {
  recipeRegisterVerification,
  getRecipesVerification,
  updateRecipeVerification,
  deleteRecipeVerification,
  addImageVerification,
} = require('../services/recipeService');

const recipeRegister = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const recipe = req.body;
    const { userId, _id } = await recipeRegisterVerification(recipe, authorization);

    return res.status(201).json({ recipe: { ...recipe, userId, _id } });
  } catch (err) {
    console.log(`RECIPE REGISTER ${err.message}`);
    return next(err);
  }
};

const getAllRecipes = async (_req, res, next) => {
  try {
    const recipes = await getRecipesVerification();

    return res.status(200).json(recipes);
  } catch (err) {
    console.log(`RECIPE GET ALL ${err.message}`);
    return next(err);
  }
};

const getRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;
    const recipe = await getRecipesVerification(id);
  
    return res.status(200).json(recipe);
  } catch (err) {
    console.log(`RECIPE GET ${err.message}`);
    return next(err);
  }
};

const updateRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { authorization } = req.headers;
    const recipe = req.body;
    const userId = await updateRecipeVerification(recipe, id, authorization);
    
    return res.status(200).json({ _id: id, ...recipe, userId });
  } catch (err) {
    console.log(`RECIPE PUT ${err.message}`);
    return next(err);
  }
};

const deleteRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { authorization } = req.headers;
    await deleteRecipeVerification(id, authorization);

    return res.status(204).json();
  } catch (err) {
    console.log(`RECIPE DELETE ${err.message}`);
    return next(err);
  }
};

const addImage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { authorization } = req.headers;
    const recipe = await addImageVerification(id, authorization);

    return res.status(200).json(recipe);
  } catch (err) {
    console.log(`RECIPE ADD IMAGE ${err.message}`);
    return next(err);
  }
};

module.exports = {
  recipeRegister,
  getAllRecipes,
  getRecipe,
  updateRecipe,
  deleteRecipe,
  addImage,
};