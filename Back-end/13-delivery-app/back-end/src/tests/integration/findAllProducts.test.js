const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const sinon = require('sinon');
const server = require('../../api/app');
const { success } = require('../../database/utils/dictionary');
const { expect } = chai;
const { badRequest } = require('../../utils/library/statusCode');

describe('Tests the GET/product endpoint', async () => {
  describe('When a successful request is made', () => {
    const loginPayload = {
      email: 'zebirita@email.com',
      password: '1c37466c159755ce1fa181bd247cb925',
    };
    let response;
    let token;
    let id;

    const products = [{
      name: 'Skol Lata 250ml',
      price: 2.20,
      urlImage: 'http://localhost:3001/images/skol_lata_350ml.jpg',
    }, {
      name: 'Brahma 600ml',
      price: 7.50,
      urlImage: 'http://localhost:3001/images/brahma_600ml.jpg',
    }, {
      name: 'Skol Beats Senses 269ml',
      price: 3.57,
      urlImage: 'http://localhost:3001/images/skol_beats_senses_269ml.jpg',
    }];

    before(async () => {
      response = await chai.request(server)
        .post('/login')
        .send(loginPayload);
      token = response.token;
      id = response.id;
      response = await chai.request(server)
        .get(`/product`)
        .auth(token);
    });

    it('should return a OK status', () => {
      expect(response).to.have.status(success);
    });
    it('should return a response with an empty array', () => {
      expect(response.body).to.be.an('array');
      expect(response.body.length).to.be.eq(11);
      expect(response.body[0]).to.be.eq(products[0]);
      expect(response.body[3]).to.be.eq(products[2]);
      expect(response.body[9]).to.be.eq(products[3]);
    });
  });
  describe('When a bad request is made', () => {
    describe('When the token is not provided', () => {
      const loginPayload = {
        email: 'zebirita@email.com',
        password: '1c37466c159755ce1fa181bd247cb925',
      };
      let response;

      before(async () => {
        response = await chai.request(server)
          .post('/login')
          .send(loginPayload);
        token = response.token;
        id = response.id;
        response = await chai.request(server)
          .get(`/product`)
      });

      it('should return a BAD_REQUEST status', () => {
        expect(response).to.have.status(badRequest);
      });
      it('should return a response with message key', () => {
        expect(response.body.error).to.have.property('message');
      });
    });
  });
  describe('When the is not a valid token', () => {
    const loginPayload = {
      email: 'zebirita@email.com',
      password: '1c37466c159755ce1fa181bd247cb925',
    };
    const badToken = 'sa3fdsSAd';

    let response;

    before(async () => {
      response = await chai.request(server)
        .post('/login')
        .send(loginPayload);
      token = response.token;
      id = response.id;
      response = await chai.request(server)
        .get(`/product`)
        .auth(badToken);
    });

    it('should return a BAD_REQUEST status', () => {
      expect(response).to.have.status(badRequest);
    });
    it('should return a response with message key', () => {
      expect(response.body.error).to.have.property('message');
    });
  });
});