const express = require('express');
const path = require('path');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');

const config = require('./utils/config');
const middleware = require('./utils/middleware');
const logger = require('./utils/logger');

const usersRouter = require('./controllers/users');
const campaign = require('./models/campaign');

const app = express();

logger.info(`connecting to MongoDB ${config.MONGODB_URI}`);

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MONGODB')
  })
  .catch(err => {
    logger.error('error connecting to MONGODB', err)
  })

app.use(cors());
app.use(middleware.requestLogger);
app.use(express.json());

app.use('/api/users', usersRouter);
// redirect

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;