/** express requirements */
import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { UserRouter } from './users/user.route.js'
import { errorHandler } from './middlewares/errorHandler.js'
import dynamicCorsOptions from './config/cors.config.js'
import cspRoutes from './routes/csp.routes.js'
import statsRoutes from './stats/stats.routes.js'
import { createServer } from './config/server.config.js'
import { hstsMiddleware } from './middlewares/hsts.middleware.js'

const PORT = process.env.PORT || 3000
const app = express()

app.use(hstsMiddleware)
app.use(express.json())
app.use(cors(dynamicCorsOptions))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/user', UserRouter)
app.use('/api/stats', statsRoutes)
app.use('/api', cspRoutes)

app.use(errorHandler)

createServer(app, PORT)
