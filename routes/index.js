const express = require('express');
const app = express();
const records = require(`./records`)
const user = require(`./user`)

app.use('/records',records);
app.use('/user',user);

module.exports = app;