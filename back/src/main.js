/** express requirements */
import express from 'express'
import { UserRouter } from './users/user.route.js'
import { errorHandler } from './middlewares/errorHandler.js'

const PORT = process.env.PORT || 3000
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/user', UserRouter)

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
