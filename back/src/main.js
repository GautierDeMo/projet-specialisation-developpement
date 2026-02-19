/** express requirements */
import express from 'express'
import { UserRouter } from './users/user.route.js'
import { errorHandler } from './middlewares/errorHandler.js'
import cors from 'cors'
import dynamicCorsOptions from './config/cors.config.js'

const PORT = process.env.PORT || 3000
const app = express()

app.use(express.json())
app.use(cors(dynamicCorsOptions))
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/user', UserRouter)

app.get('/api/stats', (req, res) => {
  res.json({ message: 'HELLO WORLD' })
})

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Back app listening on port ${PORT}`)
})
