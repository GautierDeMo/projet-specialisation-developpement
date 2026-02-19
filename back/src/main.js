/** express requirements */
import express from 'express'
import statsRoutes from './stats/stats.routes.js'

const PORT = process.env.PORT || 3000
const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/stats', statsRoutes)

app.listen(PORT, () => {
  console.log(`Back app listening on port ${PORT}`)
})
