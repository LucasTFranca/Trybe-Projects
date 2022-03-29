const { loginService } = require('../services/loginService');
const { success } = require('../utils/library/statusCode');

const loginController = async (req, res, next) => {
  try {
    const login = await loginService(req.body);
    req.user = login;
    return res.status(success).json(login);
  } catch (error) {
    console.log(error, 'Error, Login Controller');
    next(error);
  }
};

module.exports = {
  loginController,
};