const chai = require('chai');
// const sinon = require('sinon');
// chai.use(require('sinon-chai'));
const { expect } = chai;
const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists,
} = require('sequelize-test-helpers');
const ProductModel = require('../../database/models/product');

describe('The Product model', () => {
  const Product = ProductModel(sequelize, dataTypes);
  const product = new Product();
  // before(() => {
  //   sinon.stub(product, 'associate').resolves(null);
  // });
  // after(() => {
  //   sinon.reset();
  // });

  it('has the name "Product"', () => {
    checkModelName(Product)('Product');
  });

  it('has the properties "name", "price" and "url_image"', () => {
    ['name', 'price', 'url_image'].forEach(checkPropertyExists(product));
  });

  // it('has a belongsToMany association with Sale through salesProduct', () => {
  // const models = { Sale: "Some sale!" };
  // product.associate(models);
  // expect(product.belongsToMany).to.have.been.calledOnce;
  // expect(product.belongsToMany).to.have.been.calledWith(models);
  // });
});
