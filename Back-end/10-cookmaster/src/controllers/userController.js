const {
  userRegisterVerification,
  signInVerification,
  adminRegisterVerification,
} = require('../services/userSevice');

const userRegister = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const id = await userRegisterVerification(req.body);

    return res.status(201).json({ user: { name, email, role: 'user', _id: id } });
  } catch (err) {
    console.log(`USER REGISTER ${err.message}`);
    return next(err);
  }
};

const signIn = async (req, res, next) => {
  try {
    const token = await signInVerification(req.body);

    return res.status(200).json({ token });
  } catch (err) {
    console.log(`USER SIGN IN ${err.message}`);
    return next(err);
  }
};

const adminRegister = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const id = await adminRegisterVerification(req.body, req.email);

    return res.status(201).json({ user: { name, email, role: 'admin', _id: id } });
  } catch (err) {
    console.log(`ADMIN REGISTER ${err.message}`);
    return next(err);
  }
};

module.exports = {
  userRegister,
  signIn,
  adminRegister,
};
