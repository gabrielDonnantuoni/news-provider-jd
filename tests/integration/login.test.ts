/* eslint-disable @typescript-eslint/no-unused-expressions */
import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../../src/app'
import { resetDb } from '../../src/database/scripts/resetDb'
import { Response } from 'superagent'

chai.use(chaiHttp)

const { expect } = chai
const loginRoute = '/api/login'

describe(`Route "${loginRoute}"`, () => {
  before('Initialize test database', async () => {
    await resetDb()
  })

  describe('when it`s sent a body without "email" label', () => {
    let response: Response
    before('Get response from chai.request', async () => {
      response = await chai.request(app)
        .post(loginRoute)
        .send({
          password: '12345678',
        })
    })

    it('should return a status BadRequest = 400', () => {
      expect(response.badRequest).to.be.true
    })

    it('should return a body with the right message', () => {
      expect(response.body).to.be.deep.equals({
        message: '\'email\' is required',
      })
    })
  })

  describe('when it`s sent a body without "password" label', () => {
    let response: Response
    before('Get response from chai.request', async () => {
      response = await chai.request(app)
        .post(loginRoute)
        .send({
          email: 'email@email.com',
        })
    })

    it('should return a status BadRequest = 400', () => {
      expect(response.badRequest).to.be.true
    })

    it('should return a body with the right message', () => {
      expect(response.body).to.be.deep.equals({
        message: '\'password\' is required',
      })
    })
  })

  describe('when it`s sent a email that is not registered', () => {
    let response: Response
    before('Get response from chai.request', async () => {
      response = await chai.request(app)
        .post(loginRoute)
        .send({
          email: 'fuleno@example.com',
          password: 'supersecret',
        })
    })

    it('should return a status Unauthorized = 401', () => {
      expect(response.unauthorized).to.be.true
    })

    it('should return a body with the right message', () => {
      expect(response.body).to.be.deep.equals({
        message: 'Email not registered',
      })
    })
  })

  describe('when it`s sent a wrong password', () => {
    let response: Response
    before('Get response from chai.request', async () => {
      response = await chai.request(app)
        .post(loginRoute)
        .send({
          email: 'fulano@example.com',
          password: 'supersecreee',
        })
    })

    it('should return a status Unauthorized = 401', () => {
      expect(response.unauthorized).to.be.true
    })

    it('should return a body with the right message', () => {
      expect(response.body).to.be.deep.equals({
        message: 'Wrong password',
      })
    })
  })

  describe('when it`s sent a authorized body', () => {
    let response: Response
    before('Get response from chai.request', async () => {
      response = await chai.request(app)
        .post(loginRoute)
        .send({
          email: 'fulano@example.com',
          password: 'supersecret',
        })
    })

    it('should return a status ok = 200', () => {
      expect(response.ok).to.be.true
    })

    it('should return a body with a token', () => {
      expect(response.body).to.have.own.property('token')
    })
  })
})