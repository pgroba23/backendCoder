import dotenv from './dotenv/dotenv.js';

export default {
	mongodb: {
		cnxStr: process.env.MONGO_PASS,
		options: {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			serverSelectionTimeoutMS: 5000,
		},
	},
	mongodbDev: {
		cnxStr: process.env.CNXSTR,
		options: {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			serverSelectionTimeoutMS: 5000,
		},
	},
};
