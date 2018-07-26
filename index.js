const express = require('express')
const http = require('http')
const path = require('path')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()
const router = require('./router')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const jwt = require('jwt-simple')
const config = require('./config/config')

mongoose.connect(config.mongoUri)

app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json({ type: '*/*' }))
app.use((req, res, next) => {
  console.log(req.body);
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  app.get('*', (req, res) => { res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')) })
}

const port = process.env.PORT || 3090
const server = http.createServer(app)

router(app)

server.listen(port, () => console.log('Server listening on:', port))
