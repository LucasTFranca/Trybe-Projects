/* eslint-disable max-lines-per-function */
const Categories = (sequelize, DataTypes) => {
  const categories = sequelize.define(
    'Categories',
    {
      name: DataTypes.STRING,
    },
    { timestamps: false },
  );

  categories.associate = (models) => {
    categories.belongsToMany(models.BlogPosts, {
      through: models.PostsCategories,
      foreignKey: 'categoryId',
    });
  };
  
  return categories;
};

module.exports = Categories;