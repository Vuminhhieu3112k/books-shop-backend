const mongoose = require('mongoose');
const databaseConfig = require('../configs/database');
var schema = new mongoose.Schema({
	idUser: mongoose.Schema.ObjectId,
	createdAt: String,
	status: String,
	cart:[{
		idBook: mongoose.Schema.ObjectId,
		price: Number,
		quantity: Number,
		discount: Number,
	}]
})
module.exports = mongoose.model(databaseConfig.col_order, schema)
