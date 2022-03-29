const { expect } = require('chai');
const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists,
} = require('sequelize-test-helpers');

const SalesProductModel = require('../../database/models/salesProduct');

describe('The SalesProduct model', () => {
  const SalesProduct = SalesProductModel(sequelize, dataTypes);
  const salesProduct = new SalesProduct();
  const Sale = "Some sale!";
  const Product = "Beer!";

  it('has the name "SalesProduct"', () => {
    checkModelName(SalesProduct)('SalesProduct');
  });

  it('has the properties "sale_id", "product_id" and "quantity"', () => {
    ['sale_id', 'product_id', 'quantity',].forEach(checkPropertyExists(salesProduct));
  });

  // it('has a Sale belongsToMany association with Product through salesProduct', () => {
  //   before(() => {
  //     Product.associate({ Sale });
  //   });
  //   expect(Product.belongsToMany).to.have.been.calledWith(Sale, {
  //     through: salesProduct,
  //   });
  // });

  // it('has a Product belongsToMany association with Sale through salesProduct', () => {
  //   before(() => {
  //     Sale.associate({ Product });
  //   });
  //   expect(Sale.belongsToMany).to.have.been.calledWith(Product, {
  //     through: salesProduct,
  //   });
  // });
});
