import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import routes from './routes'
import { errorHandler } from './middlewares'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api', routes)

app.use(errorHandler)

export default app
