const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const sinon = require('sinon');
const server = require('../../api/app');
const { expect } = chai;
const { created, badRequest, conflict } = require('../../utils/library/statusCode');

describe('Tests the POST/admin endpoint', async () => {
  describe('When a admin registers a new user successfully', () => {
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
    });

    it('should return a CREATED status', () => {
      expect(response).to.have.status(created)
    });
    it('should return a response with all the properties and no password', () => {
      expect(response.body).to.have.property('name');
      expect(response.body).to.have.property('email');
      expect(response.body).to.not.have.property('password');
      expect(response.body).to.have.property('role');
      expect(response.body).to.have.property('token');
    });
  });
  describe('When register fails', () => {
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

      before(async () => {
        response = await chai.request(server)
          .post('/login')
          .send(payloadLogin);
        response = await chai.request(server)
          .post('/admin')
          .send(payloadUser);
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
      const badToken = 'sa3fdsSAd';

      before(async () => {
        response = await chai.request(server)
          .post('/login')
          .send(payloadLogin);
        response = await chai.request(server)
          .post('/admin')
          .auth(badToken)
          .send(payloadUser);
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

      before(async () => {
        response = await chai.request(server)
          .post('/login')
          .send(payloadLogin);
        token = response.token;
        response = await chai.request(server)
          .post('/admin')
          .auth(token)
          .send(payloadUser);
      });

      it('should return a BAD_REQUEST status', () => {
        expect(response).to.have.status(badRequest);
      });
      it('should return a response with message key', () => {
        expect(response.body.error).to.have.property('message');
      });
    });
    describe('When the name is not provided', () => {
      const payloadLogin = {
        email: 'adm@deliveryapp.com',
        password: '--adm2@21!!--',
      };
      const payloadUser = {
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
      });

      it('should return a BAD_REQUEST status', () => {
        expect(response).to.have.status(badRequest);
      });
      it('should return a response with message key', () => {
        expect(response.body.error).to.have.property('message');
      });
    });
    describe('When the name is not 12 caracters or longer', () => {
      const payloadLogin = {
        email: 'adm@deliveryapp.com',
        password: '--adm2@21!!--',
      };
      const payloadUser = {
        name: 'Xablau',
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
      });

      it('should return a BAD_REQUEST status', () => {
        expect(response).to.have.status(badRequest);
      });
      it('should return a response with message key', () => {
        expect(response.body.error).to.have.property('message');
      });
    });
    describe('When the email is not provided', () => {
      const payloadLogin = {
        email: 'adm@deliveryapp.com',
        password: '--adm2@21!!--',
      };
      const payloadUser = {
        name: 'Xablau xabloso',
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
    const payloadLogin = {
      email: 'adm@deliveryapp.com',
      password: '--adm2@21!!--',
    };
    const payloadUser = {
      name: 'Xablau xabloso',
      email: 'xablouemail.com',
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
    });

    it('should return a BAD_REQUEST status', () => {
      expect(response).to.have.status(badRequest);
    });
    it('should return a response with message key', () => {
      expect(response.body.error).to.have.property('message');
    });
  });
  describe('When the password is not provided', () => {
    const payloadLogin = {
      email: 'adm@deliveryapp.com',
      password: '--adm2@21!!--',
    };
    const payloadUser = {
      name: 'Xablau xabloso',
      email: 'xablou@email.com',
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
    });

    it('should return a BAD_REQUEST status', () => {
      expect(response).to.have.status(badRequest);
    });
    it('should return a response with message key', () => {
      expect(response.body.error).to.have.property('message');
    });
  });
  describe('When the password is not at least 6 characters', () => {
    const payloadLogin = {
      email: 'adm@deliveryapp.com',
      password: '--adm2@21!!--',
    };
    const payloadUser = {
      name: 'Xablau xabloso',
      email: 'xablou@email.com',
      password: '123',
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
    });

    it('should return a BAD_REQUEST status', () => {
      expect(response).to.have.status(badRequest);
    });
    it('should return a response with message key', () => {
      expect(response.body.error).to.have.property('message');
    });
  });
  describe('When the role is not provided', () => {
    const payloadLogin = {
      email: 'adm@deliveryapp.com',
      password: '--adm2@21!!--',
    };
    const payloadUser = {
      name: 'Xablau xabloso',
      email: 'xablou@email.com',
      password: '123456',
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
    });

    it('should return a BAD_REQUEST status', () => {
      expect(response).to.have.status(badRequest);
    });
    it('should return a response with message key', () => {
      expect(response.body.error).to.have.property('message');
    });
  });
  describe('When the user already exists', () => {
    const payloadLogin = {
      email: 'adm@deliveryapp.com',
      password: '--adm2@21!!--',
    };
    const payloadUser = {
      name: 'Xablau xabloso',
      email: 'xablou@email.com',
      password: '123456',
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
    });

    it('should return a CONFLICT status', () => {
      expect(response).to.have.status(conflict);
    });
    it('should return a response with message key', () => {
      expect(response.body.error).to.have.property('message');
    });
  });
});
