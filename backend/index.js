// server generated using express
require('dotenv').config();
const express = require('express')
const connectTomongoos = require('./db')
var cors = require('cors')



//call a connect mongo function which one exported from db.js
connectTomongoos();

const app = express()

const port = process.env.PORT;



app.use(cors())


//get a json body data
app.use(express.json())


//Available Routes
app.use('/api/auth/', require('./routes/auth'))
app.use('/api/pizza', require('./routes/pizza'))
app.use('/api/order', require('./routes/order'))



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})