const express = require('express');
const sendImages = require('../../middlewares/sendImages');

const imageRouter = express.Router();

imageRouter.get('/:name', sendImages);

module.exports = imageRouter;
