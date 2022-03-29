module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
  },
    { timestamps: false });

  User.associate = (models) => {
    User.hasMany(models.sale, { as: 'user', foreignKey: 'userId' });
    User.hasMany(models.sale, { as: 'seller', foreignKey: 'sellerId' });
  };
  return User;
};
