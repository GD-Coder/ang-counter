import express from 'express'
import cors from 'cors'

const app = express()
const port = 3200
app.use(cors())

app.get('/', (req: any, res: { send: (arg0: string) => void }) => {
  res.send('Hello from Express API')
})

app.get('/operators', (req: any, res: { json: (arg0: { name: string; id: number }) => void }) => {
  res.json({ name: 'Jimmy', id: 1 })
})

app.get('/average-count', (req: any, res: { json: (arg0: { count: number }) => void }) => {
  res.json({ count: getRandomInt(75, 500) })
})

app.get('/total-count', (req: any, res: { json: (arg0: { count: number }) => void }) => {
  res.json({ count: getRandomInt(10000, 45000) })
})

app.get('/current-count', (req: any, res: { json: (arg0: { count: number }) => void }) => {
  res.json({ count: getRandomInt(75, 500) })
})

app.get('/total-downtime', (req: any, res: { json: (arg0: { count: number }) => void }) => {
  res.json({ count: getRandomInt(50, 320) })
})

app.get('/current-downtime', (req: any, res: { json: (arg0: { count: number }) => void }) => {
  res.json({ count: getRandomInt(10, 120) })
})

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`)
})

const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}
