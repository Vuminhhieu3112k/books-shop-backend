const mongoose = require('mongoose');
const databaseConfig = require('../configs/database');
var schema = new mongoose.Schema({
	name: String,
	countExits: Number,
	publication: String,
	price: Number,
	imageBook: String,
	description: String,
	discount: String,
	linkDoc: String,
	idPublisher: {type:mongoose.Schema.ObjectId , ref:'Publisher'},
	idAuthor:  [{type:mongoose.Schema.ObjectId , ref:'Author'}],
	idTopic: {type:mongoose.Schema.ObjectId, ref:'Topic'},
	comments: [{
		idUser: mongoose.Schema.ObjectId,
		comment: String
	}]
})
module.exports = mongoose.model(databaseConfig.col_books, schema)
