const { expect } = require('chai');
const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists,
} = require('sequelize-test-helpers');

const SaleModel = require('../../database/models/sale');

describe('The Sale model', () => {
  const Sale = SaleModel(sequelize, dataTypes);
  const sale = new Sale();

  describe('has the name "Sale"', () => {
    checkModelName(Sale)('Sale');
  });

  it('has all the correct properties,', () => {
    ['user_id',
      'seller_id',
      'total_price',
      'delivery_address',
      'delivery_number',
      'sale_date',
      'status'].forEach(checkPropertyExists(sale));
  });

  // it('has a belongsTo association with User', () => {
  //   before(() => {
  //     const User = "The one who uses!";
  //     Sale.associate({ User });
  //   });
  //   expect(Sale.belongsTo).to.have.been.calledWith(User);
  // });
});
