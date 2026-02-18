/** express requirements */
import express from 'express'
import cors from 'cors'
import corsOptions, { publicCorsOptions } from './config/cors.config.js'

const PORT = process.env.PORT || 3000
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', cors(corsOptions), (req, res) => {
  res.send('Hello World!')
})

app.get('/api/stats', cors(publicCorsOptions), (req, res) => {
  res.json({ message: 'HELLO WORLD' })
})

app.listen(PORT, () => {
  console.log(`Back app listening on port ${PORT}`)
})
