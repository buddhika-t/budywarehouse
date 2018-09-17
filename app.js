const express = require('express');
const morgan = require('morgan');
const logger = require('./utils/logger');
const bodyParser = require('body-parser');
const connectToDb = require('./db/connect');
const cors = require('cors');
//const swaggerUi = require('swagger-ui-express'),
//	swaggerDocument = require('./swagger.json');
const routes = require('./routes');
const { errorResponse } = require('./lib/response.messages');

connectToDb();

const app = express();

app.use(cors());

app.use(morgan('combined', { stream: logger.stream }));

app.use(bodyParser.json({ limit: '256mb' }));
app.use(bodyParser.urlencoded({ limit: '256mb', extended: false }));

//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res) {
	let response = errorResponse('BAD_REQUEST');
	res.status(404).json(response);
});

module.exports = app;
