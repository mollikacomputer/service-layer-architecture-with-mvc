const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');


// middleware
app.use(express.json());
app.use(cors());

// schema desigh


app.get('/', (req, res) =>{
    res.send('schema design App is running')
});



module.exports = app;