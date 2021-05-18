const express = require('express');
const app = express();
require('dotenv').config() // Importing the DotENV Config

app.get('/',(req,res) => { 
   res.send("<h3>Application Started</h3>")
})


app.listen(process.env.PORT , () => { 
    console.log(`App Listening on ${process.env.PORT}`)
});
