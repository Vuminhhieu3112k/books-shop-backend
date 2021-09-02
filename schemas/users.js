const mongoose = require('mongoose');
const databaseConfig = require('../configs/database');
var schema = new mongoose.Schema({
	username: String,
	email: String,
	password: String,
	phoneNumber: String,
	gender: String,
	birthday: String,
	role: String,
	cart:[{
		idBook: mongoose.Schema.ObjectId,
		price: Number,
		quantity: Number,
		discount: Number,
	}],
})
module.exports = mongoose.model(databaseConfig.users, schema)
