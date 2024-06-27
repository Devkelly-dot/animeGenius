const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const passport = require('./passport');

const app = express();

app.use(cors());
app.use(morgan('dev'));

let webhooksRoute = require('./routes/webhooks');
app.use('/v1/webhooks', webhooksRoute);

app.use(passport.initialize());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

let authRoute = require('./routes/auth');
app.use('/v1/auth', authRoute);

let animeRoute = require('./routes/anime');
app.use('/v1/anime', animeRoute);

let availabilityRoute = require('./routes/availability');
app.use('/v1/availability', availabilityRoute);

let recommendationsRoute = require('./routes/recommendations');
app.use('/v1/recommendations', recommendationsRoute);

let stripeRoutes = require('./routes/stripe');
app.use('/v1/stripe', stripeRoutes);

module.exports = app;