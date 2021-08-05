const express = require('express');
const app = express();
require('dotenv').config() // Importing the DotENV Config
require('./models/connection') // Import mongoose connection
const cors =  require('cors');
const bodyParser = require('body-parser')
const routes = require(`./routes/index`) // All Routes


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//routes  
app.use('/',routes);

app.get('/',(req,res) => {
  res.send('Application started')
})


app.listen(process.env.PORT, () => { 
    console.log(`App Listening on ${process.env.PORT}`)
});
