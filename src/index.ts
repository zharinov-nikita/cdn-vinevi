import express from 'express'
import cors from 'cors'
import cdnRouter from './cdn/cdn.router'
import fileUpload from 'express-fileupload'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cors())
app.use(fileUpload())

app.use('/cdn', cdnRouter)
app.use('/cdn', express.static('static'))

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
