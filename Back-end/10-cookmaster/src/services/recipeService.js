const errorConstructor = require('../utils/functions/erroHandler');
const { recipeSchema, idSchema } = require('../schemas/schemas');
const {
  badRequest,
  unauthorized,
  notFound,
} = require('../utils/dictionary/statusCode');
const { invalidEntries,
  jwtFail,
  recipeFail,
  authToken,
} = require('../utils/dictionary/errorMessages');
const { decodeToken } = require('../utils/auth/jwt');
const { userFindByEmail } = require('../models/userModel');
const {
  recipeInsert,
  recipesFind,
  recipeFindById,
  recipeUpdate,
  recipeDelete,
} = require('../models/recipeModel');

const recipeRegisterVerification = async (recipe, token) => {
  const { error } = recipeSchema.validate(recipe);

  if (error) throw errorConstructor(badRequest, invalidEntries);

  const payload = decodeToken(token);

  if (!payload) throw errorConstructor(unauthorized, jwtFail);

  const { _id: userId } = await userFindByEmail(payload.email);

  const id = await recipeInsert(recipe, userId);

  return { userId, _id: id };
};

const getRecipesVerification = async (id) => {
  if (!id) return recipesFind();

  const { error } = idSchema.validate(id);

  if (error) throw errorConstructor(notFound, recipeFail);

  const recipe = await recipeFindById(id);

  if (!recipe) throw errorConstructor(notFound, recipeFail);

  return recipe;
};

const updateRecipeVerification = async (recipeToUpdate, id, token) => {
  const { userId } = await recipeFindById(id);

  if (!token) throw errorConstructor(unauthorized, authToken);

  const { email } = decodeToken(token);

  const user = await userFindByEmail(email);

  if (!user) throw errorConstructor(unauthorized, jwtFail);

  if (user.email !== email && user.role !== 'admin') throw errorConstructor(unauthorized, jwtFail);

  await recipeUpdate(recipeToUpdate, id);

  return userId;
};

const deleteRecipeVerification = async (id, token) => {
  const { error } = idSchema.validate(id);

  if (error) throw errorConstructor(notFound, invalidEntries);

  if (!token) throw errorConstructor(unauthorized, authToken);

  const payload = await decodeToken(token);

  if (!payload) throw errorConstructor(unauthorized, jwtFail);

  await recipeDelete(id);
};

const addImageVerification = async (id, token) => {
  const { error } = idSchema.validate(id);

  if (error) throw errorConstructor(notFound, invalidEntries);

  if (!token) throw errorConstructor(unauthorized, authToken);
  
  const payload = await decodeToken(token);

  if (!payload) throw errorConstructor(unauthorized, jwtFail);

  const recipe = await recipeFindById(id);

  recipe.image = `localhost:3000/src/uploads/${id}.jpeg`;

  await recipeUpdate(recipe);

  return recipe;
};

module.exports = { 
  recipeRegisterVerification,
  getRecipesVerification,
  updateRecipeVerification,
  deleteRecipeVerification,
  addImageVerification,
};
