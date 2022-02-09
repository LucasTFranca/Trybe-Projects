const {
  userRegisterVerification,
  userLoginVerification,
  getAllUsersVerification,
  getUserVerification,
  deleteUserVerification,
} = require('../services/userService');

const userRegister = async (req, res, next) => {
  try {
    const newUser = req.body;
    const token = await userRegisterVerification(newUser);

    return res.status(201).json({ token });
  } catch (error) {
    console.log(`USER REGISTER ${error.message}`);
    return next(error);
  }
};

const userLogin = async (req, res, next) => {
  try {
    const login = req.body;
    const token = await userLoginVerification(login);

    return res.status(200).json({ token });
  } catch (error) {
    console.log(`USER LOGIN ${error.message}`);
    return next(error);
  }
};

const getAllUsers = async (_req, res, next) => {
  try {
    const users = await getAllUsersVerification();

    return res.status(200).json(users);
  } catch (error) {
    console.log(`USER GET ALL ${error.message}`);
    return next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await getUserVerification(id);

    return res.status(200).json(user);
  } catch (error) {
    console.log(`USER GET ${error.message}`);
    return next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { user } = req;
    await deleteUserVerification(user);

    return res.status(204).json();
  } catch (error) {
    console.log(`USER DELETE ${error.message}`);
    return next(error);
  }
};

module.exports = {
  userRegister,
  userLogin,
  getAllUsers,
  getUser,
  deleteUser,
};
