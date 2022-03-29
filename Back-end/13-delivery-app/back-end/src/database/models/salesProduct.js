module.exports = (sequelize, DataTypes) => {
  const SalesProduct = sequelize.define('salesProduct', {
    saleId: { type: DataTypes.INTEGER,
      field: 'sale_id'
    },
    productId: { type: DataTypes.INTEGER,
      field: 'product_id'
    },
    quantity: DataTypes.INTEGER 
  },
    { timestamps: false, underscored: true, tableName: 'salesProducts' });
    
  SalesProduct.associate = (models) => {
    models.sale.belongsToMany(models.product, {
      as: 'products',
      through: SalesProduct,
      foreignKey: 'saleId',
      otherKey: 'productId' 
    });

    models.product.belongsToMany(models.sale, {
      as: 'sales',
      through: SalesProduct,
      foreignKey: 'productId',
      otherKey: 'saleId' 
    });
  };
  return SalesProduct;
};
