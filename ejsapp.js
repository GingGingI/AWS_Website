const express = require('express');

const app = express();

app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

module.exports = app;
