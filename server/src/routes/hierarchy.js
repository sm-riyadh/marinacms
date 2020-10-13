import Router from 'express'
import Validator from './validator/hierarchy'
import Ops from '../operations/hierarchy'

// Express > Router
const app = Router()

// Route
const url = 'api/hierarchy'

// CODE: Fetch

app.get(`/${url}`, async (req, res, next) => {
  try {
    const { branch } = req.query

    // await Validator.fetch({ branch })

    const data = await Ops.fetch({ branch })

    return res.send(data)
  } catch (error) {
    return next(error)
  }
})

// CODE: Modify

app.put(`/${url}/:id`, async (req, res, next) => {
  try {
    const { id } = req.params
    const { type, hierarchy } = req.body

    // await Validator.replace({ id, type, hierarchy })

    const data = await Ops.replace({ id, type, hierarchy })

    return res.send(data)
  } catch (error) {
    return next(error)
  }
})

// CODE: Remove

app.delete(`/${url}/:id`, async (req, res, next) => {
  try {
    const { id } = req.params

    // await Validator.remove({ id })

    const data = await Ops.remove({ id })

    return res.send(data)
  } catch (error) {
    return next(error)
  }
})

export default app
