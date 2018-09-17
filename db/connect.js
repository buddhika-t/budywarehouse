const Mongoose = require('mongoose');
const logger = require('../utils/logger');

Mongoose.Promise = global.Promise;

const connectToDb = async () => {
	let dbUser = process.env.DB_USER;
	let dbPassword = process.env.DB_PASSWORD;
	let dbHost = process.env.DB_HOST;
	let dbPort = process.env.DB_PORT;
	let dbName = process.env.DB_NAME;

	try {
		await Mongoose.connect(`mongodb://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`, { useNewUrlParser: true });
		logger.info(`Connected to Mongo DB at: ${new Date()}`);
	}
	catch (error) {
		logger.info('Could not connect to MongoDB: ', error);
	}
};

module.exports = connectToDb;