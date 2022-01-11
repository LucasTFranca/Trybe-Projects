const express = require('express');
const productRouter = require('./ProductRotes');
const saleRouter = require('./SaleRoutes');

const router = express.Router();

router.use('/products', productRouter);

router.use('/sales', saleRouter);

module.exports = router;
