const mongoose = require('mongoose')
require("dotenv").config();
const db = process.env.MONGO;

const connectDB = async () => {
	try {
		await mongoose.connect(db);

		console.log('Conectando a la BBDD')
	} catch (err) {
		console.error(err.message);
		// Exit process with failure
		process.exit(1);
	}
};

module.exports = connectDB