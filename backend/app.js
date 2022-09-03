require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');

const router = require('./routes/index');

const { requestCors } = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { handleErr } = require('./middlewares/handleErr');
const { limiter } = require('./middlewares/limiter');
const { URL_DB, SETUP_DB } = require('./utils/constants');

const { PORT = 4000 } = process.env;
const app = express();

mongoose.connect(URL_DB, SETUP_DB);

app.use('/', express.json());
app.use(helmet());
app.use(requestLogger);
app.use(cors());
app.use(requestCors);
app.use(limiter);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(handleErr);

app.listen(PORT);