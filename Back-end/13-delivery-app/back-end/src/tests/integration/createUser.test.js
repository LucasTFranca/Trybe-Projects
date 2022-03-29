const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const sinon = require('sinon');
const server = require('../../api/app');
const { expect } = chai;
const { created, badRequest, conflict } = require('../../utils/library/statusCode');

// Based on another collegue's code and advise (Guilherme Tenari)[https://github.com/gui-tenari]
describe('Tests the POST/user endpoint', async () => {
  describe('When register a new user successfully', () => {
    const payload = {
      name: 'Xablau',
      email: 'xablou@email.com',
      password: '123456',
    };

    let response;

    before(async () => {
      response = await chai.request(server)
        .post('/user')
        .send(payload);
    });

    it('should return a OK status', () => {
      expect(response).to.have.status(created)
    });
    it('should return a response with token key and no password', () => {
      expect(response.body).to.have.property('token');
      expect(response.body).to.not.have.property('password');
    });
  });
  describe('When register fails', () => {
    describe('When the name is not provided', () => {
      const payload = {
        email: 'xablou@email.com',
        password: '123456',
      };

      let response;

      before(async () => {
        response = await chai.request(server)
          .post('/user')
          .send(payload);
      });
      it('should return a BAD_REQUEST status', () => {
        expect(response).to.have.status(badRequest);
      });
      it('should return a response with message key', () => {
        expect(response.body.error).to.have.property('message');
      });
    });
    describe('When the name is not longer than 12 caracters', () => {
      const payload = {
        name: 'Xablau xabloso',
        email: 'xablou@email.com',
        password: '123456',
      };

      let response;

      before(async () => {
        response = await chai.request(server)
          .post('/user')
          .send(payload);
      });
      it('should return a BAD_REQUEST status', () => {
        expect(response).to.have.status(badRequest);
      });
      it('should return a response with message key', () => {
        expect(response.body.error).to.have.property('message');
      });
    });
    describe('When the email is not provided', () => {
      const payload = {
        name: 'Xablau',
        password: '123456',
      };

      let response;

      before(async () => {
        response = await chai.request(server)
          .post('/user')
          .send(payload);
      });
      it('should return a BAD_REQUEST status', () => {
        expect(response).to.have.status(badRequest);
      });
      it('should return a response with message key', () => {
        expect(response.body.error).to.have.property('message');
      });
    });
  });
  describe('When the email is not in the correct format', () => {
    const payload = {
      name: 'Xablau',
      email: 'xablouemail.com',
      password: '123456',
    };

    let response;

    before(async () => {
      response = await chai.request(server)
        .post('/user')
        .send(payload);
    });
    it('should return a BAD_REQUEST status', () => {
      expect(response).to.have.status(badRequest);
    });
    it('should return a response with message key', () => {
      expect(response.body.error).to.have.property('message');
    });
  });
  describe('When the password is not provided', () => {
    const payload = {
      name: 'Xablau',
      email: 'xablouemail.com',
    };

    let response;

    before(async () => {
      response = await chai.request(server)
        .post('/user')
        .send(payload);
    });
    it('should return a BAD_REQUEST status', () => {
      expect(response).to.have.status(badRequest);
    });
    it('should return a response with message key', () => {
      expect(response.body.error).to.have.property('message');
    });
  });
  describe('When the password is not at least 6 characters', () => {
    const payload = {
      name: 'Xablau',
      email: 'xablouemail.com',
      email: '123',
    };

    let response;

    before(async () => {
      response = await chai.request(server)
        .post('/user')
        .send(payload);
    });
    it('should return a BAD_REQUEST status', () => {
      expect(response).to.have.status(badRequest);
    });
    it('should return a response with message key', () => {
      expect(response.body.error).to.have.property('message');
    });
  });
  describe('When the user alreary exists', () => {
    const payload = {
      name: 'Xablau',
      email: 'xablou@email.com',
      password: '123456',
    };

    let response;

    before(async () => {
      response = await chai.request(server)
        .post('/user')
        .send(payload);
    });
    it('should return a CONFLICT status', () => {
      expect(response).to.have.status(conflict);
    });
    it('should return a response with message key', () => {
      expect(response.body.error).to.have.property('message');
    });
  });
});
