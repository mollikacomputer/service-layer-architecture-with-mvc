const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
// const port = process.env.PORT || 5000;
// const colors = require('colors');

// middleware
app.use(express.json());
app.use(cors());

app.get('/', (req, res) =>{
    res.send('schema design App is running')
});


// routes

const productRoute = require('./routs/product.route') 
// for test post
app.use("/api/v1/product", productRoute);


module.exports = app;