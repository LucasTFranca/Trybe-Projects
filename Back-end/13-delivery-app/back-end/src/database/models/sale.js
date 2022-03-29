module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('sale', {
    userId: {
      type: DataTypes.INTEGER,
      field: 'user_id'
    },
    sellerId: {
      type: DataTypes.INTEGER,
      field: 'seller_id'
    },
    totalPrice:{ type: DataTypes.DECIMAL(9, 2),
      field: 'total_price'
    },
    deliveryAddress: { type: DataTypes.STRING,
      field: 'delivery_address'
    },
    deliveryNumber: { type: DataTypes.STRING,
      field: 'delivery_number'
    },
    saleDate: { type: DataTypes.DATE,
      field: 'sale_date'
    },
    status: DataTypes.STRING,
  },
    { timestamps: false, underscored: true });

  Sale.associate = (models) => {
    Sale.belongsTo(models.user, { as: 'user', foreignkey: 'userId' });
    Sale.belongsTo(models.user, { as: 'seller', foreignkey: 'sellerId' });
  };
  return Sale;
};
