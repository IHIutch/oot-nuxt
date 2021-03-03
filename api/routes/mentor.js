import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
  res.status(201).json('hello')
})

router.post('/', (req, res) => {
  const { ...form } = req.body
  console.log(form)
  res.status(201).json(form)
})

export default router
