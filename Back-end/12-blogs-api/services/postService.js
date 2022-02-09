const { StatusCodes } = require('http-status-codes');
const { Op } = require('sequelize');
const { postSchema, postUpdateSchema } = require('../schemas');
const { BlogPosts, PostsCategories, Categories, Users } = require('../models');
const errorConstructor = require('../utils/functions/errorHandler');
const {
  categoryNotExists,
  postNotExists,
  unauthorizedUser,
  categoriesCannotBeEdited,
} = require('../utils/dictionary/errorMessage');

const OPTIONS = {
  include: [{
    model: Users,
    as: 'user',
    attributes: { exclude: ['password'] },
  }, {
    model: Categories,
    as: 'categories',
    through: { attributes: [] },
  }],
};

const postRegisterVerification = async (newPost, user) => {
  const { error } = postSchema.validate(newPost);
  if (error) throw errorConstructor(StatusCodes.BAD_REQUEST, error.message);

  const categories = await Categories.findAll({ where: { id: newPost.categoryIds } });
  if (categories.length !== newPost.categoryIds.length) {
    throw errorConstructor(StatusCodes.BAD_REQUEST, categoryNotExists);
  }

  const post = await BlogPosts.create({
    userId: user.id, title: newPost.title, content: newPost.content,
  });

  const postCategoriesValues = newPost.categoryIds.map((categoryId) => {
    const postCategoriesObj = {
      postId: post.id,
      categoryId,
    };

    return postCategoriesObj;
  });

  await PostsCategories.bulkCreate(postCategoriesValues);

  return post;
};

const getAllPostVerification = async () => {
  const posts = await BlogPosts.findAll(OPTIONS);

  return posts;
};

const getPostVerification = async (id) => {
  const post = await BlogPosts.findByPk(id, OPTIONS);

  if (!post) throw errorConstructor(StatusCodes.NOT_FOUND, postNotExists);

  return post;
};

const postUpdateVerification = async (id, user, postToUpdate) => {
  if (postToUpdate.categoryIds) { 
    throw errorConstructor(StatusCodes.BAD_REQUEST, categoriesCannotBeEdited);
  }

  const { error } = postUpdateSchema.validate(postToUpdate);
  if (error) throw errorConstructor(StatusCodes.BAD_REQUEST, error.message);

  const postBeforeUpdate = await BlogPosts.findByPk(id);
  
  if (user.id !== postBeforeUpdate.userId) { 
    throw errorConstructor(StatusCodes.UNAUTHORIZED, unauthorizedUser);
  }
  
  await BlogPosts.update({ ...postToUpdate }, { where: { id } });
  
  const updatedPost = await BlogPosts.findByPk(id, {
    include: [{
      model: Categories,
      as: 'categories',
      through: { attributes: [] },
    }],
  });

  return updatedPost;
};

const postDeleteVerification = async (id, user) => {
  const post = await BlogPosts.findByPk(id);
  if (!post) throw errorConstructor(StatusCodes.NOT_FOUND, postNotExists);

  if (post.userId !== user.id) throw errorConstructor(StatusCodes.UNAUTHORIZED, unauthorizedUser);

  await BlogPosts.destroy({ where: { id } });
};

const getPostByTitleVerification = async (q) => {
  const posts = await BlogPosts.findAll({
    where: {
      [Op.or]: {
        title: { [Op.like]: `%${q}%` },
        content: { [Op.like]: `%${q}%` },
      },
    },
    ...OPTIONS,
  });

  return posts;
};

module.exports = {
  postRegisterVerification,
  getAllPostVerification,
  getPostVerification,
  postUpdateVerification,
  postDeleteVerification,
  getPostByTitleVerification,
};
