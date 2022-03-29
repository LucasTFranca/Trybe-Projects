const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const sinon = require('sinon');
const server = require('../../api/app');
const { expect } = chai;
const { badRequest, noContent, unauthorized, success } = require('../../utils/library/statusCode');

const users = [
  {
    id: 1,
    name: 'Delivery App Admin',
    email: 'adm@deliveryapp.com',
    password: 'a4c86edecc5aee06eff8fdeda69e0d04',
    role: 'administrator',
  }, {
    id: 2,
    name: 'Fulana Pereira',
    email: 'fulana@deliveryapp.com',
    password: '3c28d2b0881bf46457a853e0b07531c6',
    role: 'seller',
  }, {
    id: 3,
    name: 'Cliente Zé Birita',
    email: 'zebirita@email.com',
    password: '1c37466c159755ce1fa181bd247cb925',
    role: 'customer',
  }, {
    id: 4,
    name: 'Xablau',
    email: 'xablou@email.com',
    password: 'e10adc3949ba59abbe56e057f20f883e',
    role: 'customer',
  }
];

describe('Tests the GET/user endpoint', async () => {
  describe('When the find all users in the database is successful', () => {
    const payloadLogin = {
      email: 'adm@deliveryapp.com',
      password: '--adm2@21!!--',
    };
    let response;
    let token;

    before(async () => {
      response = await chai.request(server)
        .post('/login')
        .send(payloadLogin);
      token = response.token;
      response = await chai.request(server)
        .get('/user')
        .auth(token)
    });

    it('should return a SUCCESS status', () => {
      expect(response).to.have.status(success)
    });
    it('should return a response with the correct array', () => {
      expect(response.body).to.be.an('array');
      expect(response.body.length).to.be.eq(3);
      expect(response.body[0]).to.be.eq(users[0]);
      expect(response.body[1]).to.be.eq(users[1]);
      expect(response.body[2]).to.be.eq(users[2]);
    });

    describe('When find all users is successful after adding one', () => {
      const payloadLogin = {
        email: 'adm@deliveryapp.com',
        password: '--adm2@21!!--',
      };
      const payloadUser = {
        name: 'Xablau xabloso',
        email: 'xablou@email.com',
        password: '123456',
        role: 'customer',
      };
      let response;
      let token;

      before(async () => {
        response = await chai.request(server)
          .post('/login')
          .send(payloadLogin);
        token = response.token;
        response = await chai.request(server)
          .post('/admin')
          .auth(token)
          .send(payloadUser);
        response = await chai.request(server)
          .get('/user')
          .auth(token)
      });

      it('should return a NO CONTENT status', () => {
        expect(response).to.have.status(noContent)
      });
      it('should return a response with the correct array', () => {
        expect(response.body).to.be.an('array');
        expect(response.body.length).to.be.eq(4);
        expect(response.body[0]).to.be.eq(users[0]);
        expect(response.body[1]).to.be.eq(users[2]);
        expect(response.body[2]).to.be.eq(users[3]);
        expect(response.body[3]).to.be.eq(users[4]);
      });
    });
    describe('When the deletion fails', () => {
      describe('When the token is not provided', () => {
        const payloadLogin = {
          email: 'adm@deliveryapp.com',
          password: '--adm2@21!!--',
        };
        let response;
        let token;

        before(async () => {
          response = await chai.request(server)
            .post('/login')
            .send(payloadLogin);
          token = response.token;
          response = await chai.request(server)
            .get('/user');
        });

        it('should return a BAD_REQUEST status', () => {
          expect(response).to.have.status(badRequest);
        });
        it('should return a response with message key', () => {
          expect(response.body.error).to.have.property('message');
        });
      });
      describe('When the is not a valid token', () => {
        const payloadLogin = {
          email: 'adm@deliveryapp.com',
          password: '--adm2@21!!--',
        };
        let response;
        const badToken = 'sa3fdsSAd';

        before(async () => {
          response = await chai.request(server)
            .post('/login')
            .send(payloadLogin);
          response = await chai.request(server)
            .get('/user')
            .auth(badToken);
        });

        it('should return a BAD_REQUEST status', () => {
          expect(response).to.have.status(badRequest);
        });
        it('should return a response with message key', () => {
          expect(response.body.error).to.have.property('message');
        });
      });
      describe('When the is not a valid admin token', () => {
        const payloadLogin = {
          email: 'zebirita@email.com',
          password: '$#zebirita#$',
        };
        const payloadUser = {
          name: 'Xablau xabloso',
          email: 'xablou@email.com',
          password: '123456',
          role: 'customer',
        };
        let response;
        let token;
        let id;

        before(async () => {
          response = await chai.request(server)
            .post('/login')
            .send(payloadLogin);
          token = response.token;
          response = await chai.request(server)
            .get('/user')
            .auth(token);
        });

        it('should return a UNAUTHORIZED status', () => {
          expect(response).to.have.status(unauthorized);
        });
        it('should return a response with message key', () => {
          expect(response.body.error).to.have.property('message');
        });
      });
    });
  });
});
