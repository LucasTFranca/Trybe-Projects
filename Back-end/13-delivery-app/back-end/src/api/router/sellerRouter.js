const express = require('express');
const getAllSellers = require('../../controllers/sellerController');

const sellerRouter = express.Router();

sellerRouter.get('/', getAllSellers);

module.exports = sellerRouter;
