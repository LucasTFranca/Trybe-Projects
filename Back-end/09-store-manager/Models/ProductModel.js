const { ObjectId } = require('mongodb');
const connection = require('./Connection');

const productInsert = async (name, quantity) => {
  const db = await connection();

  const { insertedId } = await db.collection('products').insertOne({ name, quantity });

  return insertedId;
};

const productFindByName = async (name) => {
  const db = await connection();

  const response = await db.collection('products').findOne({ name: { $eq: name } });

  return response;
};

const productsFind = async () => {
  const db = await connection();

  const response = await db.collection('products').find({}).toArray();

  return response;
};

const productFindById = async (id) => {
  const db = await connection();

  const response = await db.collection('products').findOne({ _id: ObjectId(id) });

  return response;
};

const productUpdate = async ({ name, quantity }, id) => {
  const db = await connection();

  await db.collection('products').updateOne({
     _id: ObjectId(id) }, { $set: name ? { name, quantity } : { quantity },
    });
};

const productDelete = async (id) => {
  const db = await connection();

  await db.collection('products').remove({ _id: ObjectId(id) });
};

module.exports = { 
  productInsert,
  productFindByName,
  productsFind,
  productFindById,
  productUpdate,
  productDelete,
};