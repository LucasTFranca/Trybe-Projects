const { ObjectId } = require('mongodb');
const connection = require('./connection');

const recipeInsert = async (recipe, userId) => {
  const db = await connection();

  const { insertedId } = await db.collection('recipes').insertOne({ ...recipe, userId, image: '' });

  return insertedId;
};

const recipesFind = async () => {
  const db = await connection();

  const response = await db.collection('recipes').find({}).toArray();

  return response;
};

const recipeFindById = async (id) => {
  const db = await connection();

  const response = await db.collection('recipes').findOne({ _id: ObjectId(id) });

  return response;
};

const recipeUpdate = async (recipe, id) => {
  const db = await connection();

  await db.collection('recipes').updateOne({ _id: ObjectId(id) }, { $set: recipe });
};

const recipeDelete = async (id) => {
  const db = await connection();

  await db.collection('recipes').deleteOne({ _id: ObjectId(id) });
};

module.exports = {
  recipeInsert,
  recipesFind,
  recipeFindById,
  recipeUpdate,
  recipeDelete,
};
