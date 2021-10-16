import { Store, Query } from '@agrzes/yx-ems-api'
import { Router, json } from 'express'

const init = (store: Store, query: Query) => {
  const router = Router()
  router.use(json())
  router.post('/', async (req, res) => {
    const { id, metadata, document } = req.body
    try {
      await store.store(id || metadata, document)
      res.end()
    } catch (e) {
      res.status(500).send(e)
    }
  })

  router.put('/:id', async (req, res) => {
    const { document } = req.body
    const id = req.params.id
    try {
      await store.store(id, document)
      res.end()
    } catch (e) {
      res.status(500).send(e)
    }
  })

  router.post('/_single', async (req, res) => {
    const { criteria, projection } = req.body
    try {
      res.send(await query.single(criteria, projection))
    } catch (e) {
      res.status(500).send(e)
    }
  })

  router.post('/_all', async (req, res) => {
    const { criteria, projection } = req.body
    try {
      res.send(await query.all(criteria, projection))
    } catch (e) {
      res.status(500).send(e)
    }
  })
}

export default init
