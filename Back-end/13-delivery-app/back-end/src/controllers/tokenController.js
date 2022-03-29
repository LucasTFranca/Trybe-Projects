const { verifyTokenValidation } = require('../services/tokenService');
const { success } = require('../utils/library/statusCode');

const validateToken = async (req, res, next) => {
  try {
    const { token } = req.body;
    const user = await verifyTokenValidation(token);

    return res.status(success).json(user);
  } catch (error) {
    console.log(error.message);

    return next(error);
  }
};

module.exports = validateToken;
