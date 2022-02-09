const express = require('express');
const jwtAuth = require('../middlewares/jwtValidation');
const { categorieRegister, getAllCategories } = require('../controllers/categorieController');

const categorieRouter = express.Router();

categorieRouter.post('/', jwtAuth, categorieRegister);

categorieRouter.get('/', jwtAuth, getAllCategories);

module.exports = categorieRouter;
