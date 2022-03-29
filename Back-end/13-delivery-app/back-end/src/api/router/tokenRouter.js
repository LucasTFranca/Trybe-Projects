const express = require('express');
const validateToken = require('../../controllers/tokenController');

const tokenRouter = express.Router();

tokenRouter.post('/', validateToken);

module.exports = tokenRouter;
