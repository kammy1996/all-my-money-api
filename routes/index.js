const express = require('express');
const app = express();
const records = require(`./records`)

app.use('/record',records)

module.exports = app;