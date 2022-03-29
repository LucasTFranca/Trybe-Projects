// const SequelizeMock = require('sequelize-mock');
// const userCreate = require('../../services/userCreate');
// const proxyquire = require('proxyquire').noCallThru();

// const DBConnectionMock = new SequelizeMock();

// const UserMock = DBConnectionMock.define('users',
//   {
//     'name': 'blink',
//     'email': 'email@email.com',
//     'password': 'blink123',
//     'role': 'customer'
//   }, {
//   instanceMethods: {
//     create: function () {
//       return this;
//     },
//   },
// });
// // .get('name', 'email', 'password', 'role')

// describe('User create service', () => {
//   before(() => {
//     proxyquire('../../database/models/user', UserMock);
//   });
//   after(() => {
//     proxyquire.callThru();
//   });
//   const user = {
//     'name': 'Xablau Xabloso',
//     'email': 'xablau@email.com',
//     'password': '123456',
//     'role': 'customer'
//   };
//   describe('Tests the succesful case', () => {
//     it('returns the an object', async () => {
//       const newUser = await userCreate(user);
//       expect(newUser).to.be.an('object');
//     });
//   });
// });
