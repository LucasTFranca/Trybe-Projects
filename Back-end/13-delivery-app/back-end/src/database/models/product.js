module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('product', {
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL(4, 2),
    urlImage: {
      type: DataTypes.INTEGER,
      field: 'url_image'
    },
  },
    { timestamps: false, underscored: true });

  return Product;
};
