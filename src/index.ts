import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cdnRouter from './cdn/cdn.router'
import fileUpload from 'express-fileupload'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(cors())
app.use(fileUpload())

app.use('/cdn', cdnRouter)
app.use('/cdn/static', express.static('static'))

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
