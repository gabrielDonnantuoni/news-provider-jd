import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import next from 'next'
import routes from './routes'
import { errorHandler, methodNotAllowed, notFound } from './middlewares'

const routesAndHandlers = [...routes, methodNotAllowed, notFound, errorHandler]
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const nextHandler = nextApp.getRequestHandler()

export async function getApp(): Promise<ReturnType<typeof express>> {
  try {
    await nextApp.prepare()
    const app = express()

    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(cors())
    
    app.use('/api', routesAndHandlers)

    app.all('*', (req, res) => nextHandler(req, res))

    return app
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}
