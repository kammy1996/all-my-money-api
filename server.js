const express = require('express');
const app = express();
require('dotenv').config() // Importing the DotENV Config
require('./models/connection') // Import mongoose connection
const routes = require(`./routes/index`) // All Routes

//routes  
app.use('/',routes);


app.listen(process.env.PORT , () => { 
    console.log(`App Listening on ${process.env.PORT}`)
});
