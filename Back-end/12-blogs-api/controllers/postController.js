const {
  postRegisterVerification,
  getAllPostVerification,
  getPostVerification,
  postUpdateVerification,
  postDeleteVerification,
  getPostByTitleVerification,
} = require('../services/postService');

const postRegister = async (req, res, next) => {
  try {
    const newPost = req.body;
    const { user } = req;
    const post = await postRegisterVerification(newPost, user);

    return res.status(201).json(post);
  } catch (error) {
    console.log(`POST REGISTER ${error.message}`);
    return next(error);
  }
};

const getAllPost = async (req, res, next) => {
  try {
    const posts = await getAllPostVerification();

    return res.status(200).json(posts);
  } catch (error) {
    console.log(`POST GET ALL ${error.message}`);
    return next(error);
  }
};

const getPost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await getPostVerification(id);

    return res.status(200).json(post);
  } catch (error) {
    console.log(`POST GET ${error.message}`);
    return next(error);
  }
};

const postUpdate = async (req, res, next) => {
  try {
    const { user } = req;
    const { id } = req.params;
    const postToUpdate = req.body;
    const updatedPost = await postUpdateVerification(id, user, postToUpdate);

    return res.status(200).json(updatedPost);
  } catch (error) {
    console.log(`POST UPDATE ${error.message}`);
    return next(error);
  }
};

const postDelete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { user } = req;
    await postDeleteVerification(id, user);

    return res.status(204).json();
  } catch (error) {
    console.log(`POST DELETE ${error.message}`);
    return next(error);
  }
};

const getPostByTitle = async (req, res, next) => {
  try {
    const { q } = req.query;
    const posts = await getPostByTitleVerification(q);

    return res.status(200).json(posts);
  } catch (error) {
    console.log(`POST GET BY TITLE ${error.message}`);
    return next(error);
  }
};

module.exports = {
  postRegister,
  getAllPost,
  getPost,
  postUpdate,
  postDelete,
  getPostByTitle,
};
