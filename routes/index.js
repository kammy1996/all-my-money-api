const express = require('express');
const app = express();
const records = require(`./records`);
const subscription = require(`./subscription`);
const user = require(`./user`)

app.use('/records',records);
app.use('/user',user);
app.use('/subscription',subscription);

module.exports = app;