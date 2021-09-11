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
		_id: mongoose.Schema.ObjectId,
		price: Number,
		quantity: Number,
		discount: Number,
	}],
})
module.exports = mongoose.model(databaseConfig.col_users, schema)
