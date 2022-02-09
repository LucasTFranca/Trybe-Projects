const express = require('express');
const categorieRouter = require('./categorieRouter');
const loginRouter = require('./loginRouter');
const postRouter = require('./postRouter');
const userRouter = require('./userRouter');

const router = express.Router();

router.use('/user', userRouter);

router.use('/login', loginRouter);

router.use('/categories', categorieRouter);

router.use('/post', postRouter);

module.exports = router;
