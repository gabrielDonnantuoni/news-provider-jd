/* eslint-disable @typescript-eslint/no-unused-expressions */
import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../../src/app'
// import { knex } from '../../src/database'
import { resetDb } from '../../src/database/scripts/resetDb'
import { Response } from 'superagent'

chai.use(chaiHttp)

const { expect } = chai
const singUpRoute = '/api/sing-up'

describe(`Route "${singUpRoute}"`, () => {
  before('Initialize test database', async () => {
    await resetDb()
  })

  describe('when it`s sent a body without "email" label', () => {
    let response: Response
    before('Get response from chai.request', async () => {
      response = await chai.request(app)
        .post(singUpRoute)
        .send({
          firstName: 'fulano',
          lastName: 'de tal',
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
        .post(singUpRoute)
        .send({
          firstName: 'fulano',
          lastName: 'de tal',
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

  describe('when it`s sent a body without "firstName" label', () => {
    let response: Response
    before('Get response from chai.request', async () => {
      response = await chai.request(app)
        .post(singUpRoute)
        .send({
          lastName: 'de tal',
          email: 'email@email.com',
          password: '12345678',
        })
    })

    it('should return a status BadRequest = 400', () => {
      expect(response.badRequest).to.be.true
    })

    it('should return a body with the right message', () => {
      expect(response.body).to.be.deep.equals({
        message: '\'firstName\' is required',
      })
    })
  })

  describe('when it`s sent a body without "lastName" label', () => {
    let response: Response
    before('Get response from chai.request', async () => {
      response = await chai.request(app)
        .post(singUpRoute)
        .send({
          firstName: 'fulano',
          email: 'email@email.com',
          password: '12345678',
        })
    })

    it('should return a status BadRequest = 400', () => {
      expect(response.badRequest).to.be.true
    })

    it('should return a body with the right message', () => {
      expect(response.body).to.be.deep.equals({
        message: '\'lastName\' is required',
      })
    })
  })

  describe('when it`s sent an invalid password with at least 8 characters', () => {
    let response: Response
    before('Get response from chai.request', async () => {
      response = await chai.request(app)
        .post(singUpRoute)
        .send({
          firstName: 'fulano',
          lastName: 'de tal',
          email: 'email@email.com',
          password: '12345678',
        })
    })

    it('should return a status BadRequest = 400', () => {
      expect(response.badRequest).to.be.true
    })

    it('should return a body with the right message', () => {
      expect(response.body).to.be.deep.equals({
        message: '\'password\' must have at least one lowercase, one uppercase, one digit and one special character',
      })
    })
  })

  describe('when it`s sent an password with less than 8 characters', () => {
    let response: Response
    before('Get response from chai.request', async () => {
      response = await chai.request(app)
        .post(singUpRoute)
        .send({
          firstName: 'fulano',
          lastName: 'de tal',
          email: 'email@email.com',
          password: '1234567',
        })
    })

    it('should return a status BadRequest = 400', () => {
      expect(response.badRequest).to.be.true
    })

    it('should return a body with the right message', () => {
      expect(response.body).to.be.deep.equals({
        message: '\'password\' length must be at least 8 characters long',
      })
    })
  })

  describe('when it`s sent an already registered email', () => {
    let response: Response
    before('Get response from chai.request', async () => {
      response = await chai.request(app)
        .post(singUpRoute)
        .send({
          firstName: 'fulano',
          lastName: 'de tal',
          email: 'fulano@example.com',
          password: '_Supersecr3t',
        })
    })

    it('should return a status Conflict = 409', () => {
      expect(response.status).to.be.equals(409)
    })

    it('should return a body with the right message', () => {
      expect(response.body).to.be.deep.equals({
        message: 'Email already registered',
      })
    })
  })

  describe('when it`s sent a correct body', () => {
    let response: Response
    before('Get response from chai.request', async () => {
      response = await chai.request(app)
        .post(singUpRoute)
        .send({
          firstName: 'sicrano',
          lastName: 'de tal',
          email: 'sicrano@example.com',
          password: '_Supersecr3t',
        })
    })

    it('should return a status Created = 201', () => {
      expect(response.status).to.be.equals(201)
    })

    it('should return a body like { id: number }', () => {
      expect(response.body).to.have.own.property('id')
      expect(typeof response.body.id).to.be.equals('number')
    })
  })
})