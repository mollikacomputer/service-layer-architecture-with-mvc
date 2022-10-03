const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const colors = require('colors');
const app = require('./app');

mongoose.connect(process.env.DATABASE_LOCAL).then(()=>{
    console.log("server layer architecture is successfully");
})


const port = process.env.PORT || 8080;

app.listen(port, ()=>{
    console.log(`Listening to port ${port}`.yellow.bold);
});
