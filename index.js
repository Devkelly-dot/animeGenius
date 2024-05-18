const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

let authRoute = require('./routes/auth');
app.use('/auth', authRoute);

module.exports = app;