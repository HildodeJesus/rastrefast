require('dotenv').config()
const port = process.env.PORT || 8000

const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const app = express()

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(session({secret: process.env.SECRET_SESSION, resave: false, saveUninitialized: true, cookie: { maxAge: 259200000}}))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//Database
const connection = require('./config/db')

const Users = require('./models/Users')
const Orders = require('./models/Orders')

//Rotas
const router = require('./router')
const ScrapingTracker = require('./services/scrapingTracker')

app.get('/', async (req, res) => {
  let user = []
  if (req.session.user != undefined) {
    user.push({...req.session.user})
  }
  // await new ScrapingTracker('LB550648176HK').findTracker()
  
  res.render('index', {user})
})

app.get('/about', async (req, res) => {
  let user = []
  if (req.session.user != undefined) {
    user.push(req.session.user)
  }

  res.render('about', {user})
})

app.use('/', router)

const start = async () => {
  try {
    await connection.authenticate().then(() => console.log('DB connected to success!!'))
    app.listen(port, console.log(`Server listening of the port ${port}`))
  } catch (error) {
    console.log(error)
  }
}

start()