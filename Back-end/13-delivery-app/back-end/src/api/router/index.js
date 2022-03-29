const express = require('express');

const loginRouter = require('./loginRouter');
const orderRouter = require('./orderRouter');
const productRouter = require('./productRouter');
const imageRouter = require('./imageRouter');
const userRouter = require('./userRouter');
const sellerRouter = require('./sellerRouter');
const tokenRouter = require('./tokenRouter');

const router = express.Router();

router.use('/login', loginRouter);
router.use('/user', userRouter);
router.use('/order', orderRouter);
router.use('/product', productRouter);
router.use('/images', imageRouter);
router.use('/seller', sellerRouter);
router.use('/token', tokenRouter);

module.exports = router;
