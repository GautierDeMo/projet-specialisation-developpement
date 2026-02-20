/** express requirements */
import express from 'express'
import { router } from './routes/route.js'
import cookieParser from 'cookie-parser'
import { errorHandler } from './middlewares/errorHandler.js'
import cors from 'cors'
import dynamicCorsOptions from './config/cors.config.js'

const PORT = process.env.PORT || 3000
const app = express()

app.use(express.json())
app.use(cors(dynamicCorsOptions))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api', router)

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Back app listening on port ${PORT}`)
})
