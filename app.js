const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const dbConnect = require('./utils/dbConnect');


// middleware
app.use(express.json());
app.use(cors());

// schema desigh

dbConnect();

app.get('/', (req, res) =>{
    res.send('schema design App is running')
});


module.exports = app;