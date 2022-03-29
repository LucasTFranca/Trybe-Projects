module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('salesProducts', {
      saleId: { 
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'sales',
          key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'sale_id'
      },
      productId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'products',
          key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'product_id'
      },
      quantity: { allowNull: false,
        type: Sequelize.INTEGER } });
},
  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('salesProducts');
  },
};
