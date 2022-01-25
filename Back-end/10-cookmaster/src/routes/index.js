const express = require('express');
const loginRouter = require('./loginRouter');
const recipeRouter = require('./recipeRouter');
const userRouter = require('./userRouter');

const router = express.Router();

router.use('/users', userRouter);

router.use('/login', loginRouter);

router.use('/recipes', recipeRouter);

module.exports = router;