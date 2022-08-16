require('dotenv').config()
const port = process.env.PORT || 8000

const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const connection = require('./config/db')


const start = async () => {
  try {
    await connection.authenticate().then(() => console.log('DB connected to success!!'))
    app.listen(port, console.log(`Server listening of the port ${port}`))
  } catch (error) {
    console.log(error)
  }
}

start()