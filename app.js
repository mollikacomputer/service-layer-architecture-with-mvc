const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

// middleware
app.use(express.json());
app.use(cors());


// route
const productRoute = require('./routes/product.route')

// for test post
app.use("/api/v1/product", productRoute );



app.get('/', (req, res) =>{
  res.send('schema design App is running')
});

module.exports = app;