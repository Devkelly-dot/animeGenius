const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const passport = require('./passport');

const app = express();

app.use(passport.initialize());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

let authRoute = require('./routes/auth');
app.use('/v1/auth', authRoute);

let animeRoute = require('./routes/anime');
app.use('/v1/anime', animeRoute);

let availabilityRoute = require('./routes/availability');
app.use('/v1/availability', availabilityRoute);

module.exports = app;