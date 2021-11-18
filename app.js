const express = require('express');

const router = require('./routes/api');

const app = express();

app.enable('trust proxy');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

module.exports = app;
