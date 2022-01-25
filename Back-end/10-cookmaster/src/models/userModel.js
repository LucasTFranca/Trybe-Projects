const connection = require('./connection');

const userInsert = async (user) => {
  const db = await connection();

  const { insertedId } = await db.collection('users').insertOne({ ...user, role: 'user' });

  return insertedId;
};

const userFindByEmail = async (email) => {
  const db = await connection();

  const response = await db.collection('users').findOne({ email });

  return response;
};

const adminInsert = async (user) => {
  const db = await connection();

  const { insertedId } = await db.collection('users').insertOne({ ...user, role: 'admin' });

  return insertedId;
};

module.exports = {
  userInsert,
  userFindByEmail,
  adminInsert,
};
