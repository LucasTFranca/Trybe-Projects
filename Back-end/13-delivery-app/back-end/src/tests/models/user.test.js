const { expect } = require('chai');
const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists,
} = require('sequelize-test-helpers');

const UserModel = require('../../database/models/user');

describe('The User model', () => {
  const User = UserModel(sequelize, dataTypes);
  const user = new User();

  it('has the name "User"', () => {
    checkModelName(User)('User');
  });

  it('has the properties "name", "email", "password" and "role"', () => {
    ['name', 'email', 'password', 'role'].forEach(checkPropertyExists(user));
  });

  // it('has a hasMany association with Sale', () => {
  //   before(() => {
  //     const Sale = "Some sale!";
  //     User.associate({ Sale });
  //   });
  //   expect(User.hasMany).to.have.been.calledWith(Sale);
  // });
});
