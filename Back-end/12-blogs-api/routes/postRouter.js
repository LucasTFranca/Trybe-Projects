const express = require('express');
const {
  postRegister,
  getAllPost,
  getPost,
  postUpdate,
  postDelete,
  getPostByTitle,
} = require('../controllers/postController');
const jwtAuth = require('../middlewares/jwtValidation');

const postRouter = express.Router();

postRouter.post('/', jwtAuth, postRegister);

postRouter.get('/', jwtAuth, getAllPost);

postRouter.get('/search', jwtAuth, getPostByTitle);

postRouter.get('/:id', jwtAuth, getPost);

postRouter.put('/:id', jwtAuth, postUpdate);

postRouter.delete('/:id', jwtAuth, postDelete);

module.exports = postRouter;
