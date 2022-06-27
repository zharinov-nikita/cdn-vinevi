import express from 'express'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(cors())
const PORT = process.env.PORT || 3030

async function start() {
  try {
    app.listen(PORT, () =>
      console.log(`The server started on the port ${PORT}`)
    )
  } catch (e) {
    console.log(e)
  }
}
start()
