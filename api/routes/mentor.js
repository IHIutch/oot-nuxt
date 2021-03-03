import express from 'express'
import { Mentor } from '../models/index'

const router = express.Router()

router.get('/', (req, res) => {
  Mentor.findAll()
    .then((data) => {
      res.json(data)
    })
    .catch((err) => {
      throw new Error(err)
    })
})

router.post('/', (req, res) => {
  const {
    firstName,
    lastName,
    email,
    city,
    description,
    linkedinURL,
    bookingURL,
    imageURL,
    categories,
  } = req.body

  Mentor.create({
    firstName,
    lastName,
    email,
    city,
    description,
    linkedinURL,
    bookingURL,
    imageURL,
    categories,
  })
    .then((data) => {
      res.status(201).json(data)
    })
    .catch((err) => {
      throw new Error(err)
    })
})

export default router
