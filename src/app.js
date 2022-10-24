const express = require('express');
const path = require('path');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const wildcardSubdomains = require('wildcard-subdomains');

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');
const tenantRoute = require('./routes/tenantRoute');
const companyRoute = require('./routes/companyRoute');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(wildcardSubdomains({
  namespace: 's',
  whitelist: ['www', 'app', 'multi-mbjyzu'],
}));

app.use('/', tenantRoute);
app.use('/s/', companyRoute);
app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
