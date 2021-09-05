/* eslint-disable @typescript-eslint/no-unused-expressions */
import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../../../src/app'
// import { knex } from '../../../src/database'
import { resetDb } from '../../../src/database/scripts/resetDb'
import { Response } from 'superagent'
import { TokenWith } from '../fixtures'

chai.use(chaiHttp)

const { expect } = chai
const adminAuthorsRoute = '/api/admin/authors'

describe(`Route "${adminAuthorsRoute}"`, () => {
  before('Initialize test database', async () => {
    await resetDb()
  })

  describe('when it`s not sent an Authorization header', () => {
    let response: Response
    before('Get response from chai.request', async () => {
      response = await chai.request(app)
        .post(adminAuthorsRoute)
        .send({
          name: 'Lady Tsunade',
          picture: 'https://randomuser.me/api/portraits/women/40.jpg',
        })
    })

    it('should return a status Unauthorized = 401', () => {
      expect(response.unauthorized).to.be.true
    })

    it('should return a body with the right message', () => {
      expect(response.body).to.be.deep.equals({
        message: 'Token not found',
      })
    })
  })

  describe('when it`s sent an Authorization header witn invalid signature', () => {
    let response: Response
    before('Get response from chai.request', async () => {
      response = await chai.request(app)
        .post(adminAuthorsRoute)
        .set('Authorization', TokenWith.invalidSignature)
        .send({
          name: 'Lady Tsunade',
          picture: 'https://randomuser.me/api/portraits/women/40.jpg',
        })
    })

    it('should return a status Unauthorized = 401', () => {
      expect(response.unauthorized).to.be.true
    })

    it('should return a body with the right message', () => {
      expect(response.body).to.be.deep.equals({
        message: 'invalid signature',
      })
    })
  })

  describe('when it`s sent an Authorization header with invalid payload', () => {
    let response: Response
    before('Get response from chai.request', async () => {
      response = await chai.request(app)
        .post(adminAuthorsRoute)
        .set('Authorization', TokenWith.invalidPayload)
        .send({
          name: 'Lady Tsunade',
          picture: 'https://randomuser.me/api/portraits/women/40.jpg',
        })
    })

    it('should return a status Unauthorized = 401', () => {
      expect(response.unauthorized).to.be.true
    })

    it('should return a body with the right message', () => {
      expect(response.body).to.be.deep.equals({
        message: 'Expired or invalid token',
      })
    })
  })

  describe('when it`s sent a valid Authorization header but with forbidden user.role', () => {
    let response: Response
    before('Get response from chai.request', async () => {
      response = await chai.request(app)
        .post(adminAuthorsRoute)
        .set('Authorization', TokenWith.validClient)
        .send({
          name: 'Lady Tsunade',
          picture: 'https://randomuser.me/api/portraits/women/40.jpg',
        })
    })

    it('should return a status Forbidden = 403', () => {
      expect(response.forbidden).to.be.true
    })

    it('should return a body with the right message', () => {
      expect(response.body).to.be.deep.equals({
        message: 'Access denied',
      })
    })
  })

  describe('when it`s sent a valid Authorization without "name" property on body', () => {
    let response: Response
    before('Get response from chai.request', async () => {
      response = await chai.request(app)
        .post(adminAuthorsRoute)
        .set('Authorization', TokenWith.validAdmin)
        .send({
          picture: 'https://randomuser.me/api/portraits/women/40.jpg',
        })
    })

    it('should return a status BadRequest = 400', () => {
      expect(response.badRequest).to.be.true
    })

    it('should return a body with the right message', () => {
      expect(response.body).to.be.deep.equals({
        message: '\'name\' is required',
      })
    })
  })

  describe('when it`s sent a valid Authorization without "picture" property on body', () => {
    let response: Response
    before('Get response from chai.request', async () => {
      response = await chai.request(app)
        .post(adminAuthorsRoute)
        .set('Authorization', TokenWith.validAdmin)
        .send({
          name: 'Lady Tsunade',
        })
    })

    it('should return a status BadRequest = 400', () => {
      expect(response.badRequest).to.be.true
    })

    it('should return a body with the right message', () => {
      expect(response.body).to.be.deep.equals({
        message: '\'picture\' is required',
      })
    })
  })

  describe('when it`s sent a valid Authorization with "picture" non-uri like', () => {
    let response: Response
    before('Get response from chai.request', async () => {
      response = await chai.request(app)
        .post(adminAuthorsRoute)
        .set('Authorization', TokenWith.validAdmin)
        .send({
          name: 'Lady Tsunade',
          picture: 'picture',
        })
    })

    it('should return a status BadRequest = 400', () => {
      expect(response.badRequest).to.be.true
    })

    it('should return a body with the right message', () => {
      expect(response.body).to.be.deep.equals({
        message: '\'picture\' must be a valid uri',
      })
    })
  })

  describe('when it`s sent a valid Authorization with a repeated "name"', () => {
    let response: Response
    before('Get response from chai.request', async () => {
      response = await chai.request(app)
        .post(adminAuthorsRoute)
        .set('Authorization', TokenWith.validAdmin)
        .send({
          name: 'John Doe',
          picture: 'https://randomuser.me/api/portraits/women/40.jpg',
        })
    })

    it('should return a status Created = 409', () => {
      expect(response.status).to.be.equals(409)
    })

    it('should return a body with the right message', () => {
      expect(response.body).to.be.deep.equals({
        message: 'Author already registered',
      })
    })
  })

  describe('when it`s sent a valid Authorization with a valid body', () => {
    let response: Response
    before('Get response from chai.request', async () => {
      response = await chai.request(app)
        .post(adminAuthorsRoute)
        .set('Authorization', TokenWith.validAdmin)
        .send({
          name: 'Lady Tsunade',
          picture: 'https://randomuser.me/api/portraits/women/40.jpg',
        })
    })

    it('should return a status Created = 201', () => {
      expect(response.status).to.be.equals(201)
    })

    it('should return a body with the right message', () => {
      expect(response.body).to.have.own.property('id')
      expect(typeof response.body.id).to.be.equals('number')
    })
  })
})