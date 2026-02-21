/** express requirements */
import express from 'express'
import { router } from './routes/route.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { errorHandler } from './middlewares/errorHandler.js'
import dynamicCorsOptions from './config/cors.config.js'
import { createServer } from './config/server.config.js'
import { hstsMiddleware } from './middlewares/hsts.middleware.js'
import { cspBodyParser } from './middlewares/cspBodyParser.js'
import { setupSecurity } from './middlewares/security.middleware.js' // Import du nouveau helper

const PORT = process.env.PORT || 3000
const app = express()

app.use(hstsMiddleware)
app.use(cspBodyParser)
app.use(cors(dynamicCorsOptions))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

await createServer(app, PORT)

setupSecurity(app)

app.get('/', (req, res) => res.send('Hello World!'))

app.use('/api', router)

app.use(errorHandler)
