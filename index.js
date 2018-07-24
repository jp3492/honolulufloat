const express = require('express')
const http = require('http')
const path = require('path')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()
const router = require('./router')
const mongoose = require('mongoose')
const cors = require('cors')
const jwt = require('jwt-simple')
const config = require('./config/config')

mongoose.connect('mongodb://localhost:27017/auth');

app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));

app.use('/static', express.static(path.join(__dirname, 'public')))

const port = process.env.PORT || 3090;
const server = http.createServer(app);

router(app);

server.listen(port, () => console.log('Server listening on:', port))
