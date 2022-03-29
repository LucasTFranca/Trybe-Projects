const express = require('express');
const auth = require('../../middlewares/auth');
const { findAllProductController } = require('../../controllers/productsControllers');

const productRouter = express.Router();

productRouter.get('/', auth, findAllProductController);

module.exports = productRouter;
