import 'mocha'
import chai from 'chai'
import sinonChai from 'sinon-chai'
import request from 'supertest'
import init from '../src'
import sinon from 'sinon'
import { Query, Store } from '@agrzes/yx-ems-api'
import express from 'express'
const { expect } = chai.use(sinonChai)

describe('router', () => {
  describe('post /', () => {
    it('should call store', async () => {
      const store = {
        store: sinon.stub().resolves('result'),
      }
      const app = express()
      app.use(init(store, {} as Query))
      const response = await request(app).post('/').send({ id: 'id', document: 'document' })
      expect(store.store).to.be.calledWith('id', 'document')
    })
    it('should pass metadata', async () => {
      const store = {
        store: sinon.stub().resolves('result'),
      }
      const app = express()
      app.use(init(store, {} as Query))
      const response = await request(app).post('/').send({ metadata: 'metadata', document: 'document' })
      expect(store.store).to.be.calledWith('metadata', 'document')
    })
    it('should forward error', async () => {
      const store = {
        store: sinon.stub().rejects(new Error()),
      }
      const app = express()
      app.use(init(store, {} as Query))
      const response = await request(app).post('/').send({ id: 'id', document: 'document' })
      expect(store.store).to.be.calledWith('id', 'document')
      expect(response.status).to.be.equals(500)
    })
  })
  describe('put /:id', () => {
    it('should call store', async () => {
      const store = {
        store: sinon.stub().resolves('result'),
      }
      const app = express()
      app.use(init(store, {} as Query))
      const response = await request(app).put('/id').send({ document: 'document' })
      expect(store.store).to.be.calledWith('id', 'document')
    })
    it('should forward error', async () => {
      const store = {
        store: sinon.stub().rejects(new Error()),
      }
      const app = express()
      app.use(init(store, {} as Query))
      const response = await request(app).put('/id').send({ document: 'document' })
      expect(store.store).to.be.calledWith('id', 'document')
      expect(response.status).to.be.equals(500)
    })
  })
  describe('post /_single', () => {
    it('should call store', async () => {
      const query = {
        single: sinon.stub().resolves({ result: 'result' }),
        all: sinon.stub(),
      }
      const app = express()
      app.use(init({} as Store, query))
      const response = await request(app).post('/_single').send({ criteria: 'criteria', projection: 'projection' })
      expect(query.single).to.be.calledWith('criteria', 'projection')
      expect(response.body).to.be.deep.equals({ result: 'result' })
    })
    it('should forward error', async () => {
      const query = {
        single: sinon.stub().rejects(new Error()),
        all: sinon.stub(),
      }
      const app = express()
      app.use(init({} as Store, query))
      const response = await request(app).post('/_single').send({ criteria: 'criteria', projection: 'projection' })
      expect(query.single).to.be.calledWith('criteria', 'projection')
      expect(response.status).to.be.equals(500)
    })
  })
  describe('post /_all', () => {
    it('should call store', async () => {
      const query = {
        single: sinon.stub(),
        all: sinon.stub().resolves({ result: 'result' }),
      }
      const app = express()
      app.use(init({} as Store, query))
      const response = await request(app).post('/_all').send({ criteria: 'criteria', projection: 'projection' })
      expect(query.all).to.be.calledWith('criteria', 'projection')
      expect(response.body).to.be.deep.equals({ result: 'result' })
    })
    it('should forward error', async () => {
      const query = {
        single: sinon.stub(),
        all: sinon.stub().rejects(new Error()),
      }
      const app = express()
      app.use(init({} as Store, query))
      const response = await request(app).post('/_all').send({ criteria: 'criteria', projection: 'projection' })
      expect(query.all).to.be.calledWith('criteria', 'projection')
      expect(response.status).to.be.equals(500)
    })
  })
})