const PostsCategories = (sequelize, DataTypes) => {
  const postsCategories = sequelize.define(
    'PostsCategories',
    {
      postId: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
    },
    { timestamps: false },
  );

  return postsCategories;
};

module.exports = PostsCategories;