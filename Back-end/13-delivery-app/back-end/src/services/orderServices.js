const Sequelize = require('sequelize');
const { salesProduct, sale, user, product } = require('../database/models');
const errorConstructor = require('../utils/functions/errorConstructor');
const { badRequest, notFound } = require('../utils/library/statusCode');
const { schemaOrder } = require('../schemas/index');
const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);

const transactionService = async (transaction, 
  { products, userId, sellerId, totalPrice, deliveryAddress, deliveryNumber }) => {
  try {
    const saleCreated = await sale.create(
      { userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, status: 'Pendente' }, 
      { transaction },
    );
    const salesProductItems = products.map((item) => ({
      saleId: saleCreated.dataValues.id,
      ...item,
    }));
    await salesProduct.bulkCreate([...salesProductItems], { transaction });
    await transaction.commit();

    return saleCreated.id;
  } catch (e) {
    console.log(e.message, 'Log order');
    await transaction.rollback();
    throw errorConstructor(badRequest, e.message);
  }
};

const createOrderService = async (
  { products, userId, sellerId, totalPrice, deliveryAddress, deliveryNumber }) => {
  const { error } = schemaOrder.validate(
    { products, userId, sellerId, totalPrice, deliveryAddress, deliveryNumber },
  );
  const transaction = await sequelize.transaction();
  if (error) {
    throw errorConstructor(badRequest, error.message);
  }
  const id = await transactionService(transaction, 
    { products, userId, sellerId, totalPrice, deliveryAddress, deliveryNumber });
  
  return id;
};

const getOrdersService = async (id) => {
  const userFound = await user.findOne({ where: { id } });

  if (!userFound) throw errorConstructor(notFound, 'User not found');

  let orders = [];
  if (userFound.role === 'customer') {
    orders = await sale.findAll({ where: { userId: id } });
  } else if (userFound.role === 'seller') {
    orders = await sale.findAll({ where: { sellerId: id } });
  }
  
  if (!orders) throw errorConstructor(notFound, 'There is no orders yet');

  return orders;
};

const getOrderByIdService = async (id) => {
  const orderDetails = await sale.findOne({ where: { id },
    attributes: { exclude: ['sellerId'] },
    include: [{ model: user, as: 'seller', attributes: { exclude: ['password', 'role'] } },
  { model: product, as: 'products', through: { attributes: ['quantity'], as: 'quantityTotal' } }],
  });

  return orderDetails;
};

module.exports = {
  createOrderService,
  getOrdersService,
  getOrderByIdService,
};
