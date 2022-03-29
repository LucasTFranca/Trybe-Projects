const findSellers = require('../services/sellerService');
const { success } = require('../utils/library/statusCode');

const getAllSellers = async (_req, res, next) => {
  try {
    const sellers = await findSellers();

    return res.status(success).json(sellers);
  } catch (error) {
    console.log(error.message);

    return next(error);
  }
};

module.exports = getAllSellers;
