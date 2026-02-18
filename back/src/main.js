/** express requirements */
import express from 'express'
import { router } from './routes/route.js'

const PORT = process.env.PORT || 3000
const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(router)

app.listen(PORT, () => {
  console.log(`Back app listening on port ${PORT}`)
})
