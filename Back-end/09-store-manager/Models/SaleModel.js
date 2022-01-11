const { ObjectId } = require('mongodb');
const connection = require('./Connection');

const saleInsert = async (itensSold) => {
  const db = await connection();

  const { insertedId } = await db.collection('sales').insertOne({ itensSold });

  return insertedId;
};

const salesFind = async () => {
  const db = await connection();

  const response = await db.collection('sales').find({}).toArray();

  return response;
};

const saleFindById = async (id) => {
  const db = await connection();

  const response = await db.collection('sales').findOne({ _id: ObjectId(id) });

  return response;
};

const saleUpdate = async (id, itensSold) => {
  const db = await connection();

  await db.collection('sales').updateOne({ _id: ObjectId(id) }, { $set: { itensSold } });
};

const saleDelete = async (id) => {
  const db = await connection();

  await db.collection('sales').remove({ _id: ObjectId(id) });
};

module.exports = {
  saleInsert,
  salesFind,
  saleFindById,
  saleUpdate,
  saleDelete,
};
