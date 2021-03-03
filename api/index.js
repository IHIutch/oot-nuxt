import express from 'express'
import mentor from './routes/mentor'

const app = express()
app.use(express.json())

app.use('/mentor', mentor)

module.exports = app
