module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sales', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true, 
        type: Sequelize.INTEGER },
      userId: { allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'user_id'
      },
      sellerId: { allowNull: false, 
        type: Sequelize.INTEGER, 
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE', 
        onDelete: 'CASCADE',
        field: 'seller_id' },
      totalPrice: { allowNull: false,
        type: Sequelize.DECIMAL(9, 2),
        field: 'total_price' },
      deliveryAddress: { allowNull: false, type: Sequelize.STRING, field: 'delivery_address' },
      deliveryNumber: { allowNull: false, type: Sequelize.STRING, field: 'delivery_number' },
      saleDate: { allowNull: false, type: Sequelize.DATE, field: 'sale_date', defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      status: { allowNull: false, type: Sequelize.STRING } });
    },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('sales');
  },
};
