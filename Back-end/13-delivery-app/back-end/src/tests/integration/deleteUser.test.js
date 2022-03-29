const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const sinon = require('sinon');
const server = require('../../api/app');
const { expect } = chai;
const { badRequest, noContent, unauthorized } = require('../../utils/library/statusCode');

describe('Tests the DELETE/user endpoint', async () => {
  describe('When the deletion of a user is successful', () => {
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
    let id;

    before(async () => {
      response = await chai.request(server)
        .post('/login')
        .send(payloadLogin);
      token = response.token;
      response = await chai.request(server)
        .post('/admin')
        .auth(token)
        .send(payloadUser);
      id = response.id;
      response = await chai.request(server)
        .delete(`/user/${id}`)
        .auth(token)
    });

    it('should return a NO_CONTENT status', () => {
      expect(response).to.have.status(noContent)
    });
  });
  describe('When the deletion fails', () => {
    describe('When the token is not provided', () => {
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
      let id;

      before(async () => {
        response = await chai.request(server)
          .post('/login')
          .send(payloadLogin);
        token = response.token;
        response = await chai.request(server)
          .post('/admin')
          .auth(token)
          .send(payloadUser);
        id = response.id;
        response = await chai.request(server)
          .delete(`/user/${id}`)
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
      const payloadUser = {
        name: 'Xablau xabloso',
        email: 'xablou@email.com',
        password: '123456',
        role: 'customer',
      };
      let response;
      let token;
      const badToken = 'sa3fdsSAd';
      let id;

      before(async () => {
        response = await chai.request(server)
          .post('/login')
          .send(payloadLogin);
        token = response.token;
        response = await chai.request(server)
          .post('/admin')
          .auth(token)
          .send(payloadUser);
        id = response.id;
        response = await chai.request(server)
          .delete(`/user/${id}`)
          .auth(badToken)
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
          .post('/admin')
          .auth(token)
          .send(payloadUser);
        id = response.id;
        response = await chai.request(server)
          .delete(`/user/${id}`)
          .auth(token)
      });

      it('should return a UNAUTHORIZED status', () => {
        expect(response).to.have.status(unauthorized);
      });
      it('should return a response with message key', () => {
        expect(response.body.error).to.have.property('message');
      });
    });
    describe('When is not a valid id', () => {
      const payloadLogin = {
        email: 'adm@deliveryapp.com',
        password: '--adm2@21!!--',
      };
      let response;
      let token;
      const id = 20;

      before(async () => {
        response = await chai.request(server)
          .post('/login')
          .send(payloadLogin);
        token = response.token;
        response = await chai.request(server)
          .delete(`/user/${id}`)
          .auth(token)
      });

      it('should return a BAD_REQUEST status', () => {
        expect(response).to.have.status(badRequest);
      });
      it('should return a response with message key', () => {
        expect(response.body.error).to.have.property('message');
      });
    });
  });
});
