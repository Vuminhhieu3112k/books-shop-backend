const mongoose = require('mongoose');
const databaseConfig = require('../configs/database');
var schema = new mongoose.Schema({
        namePublisher: String,
        addressPublisher: String,
        numberPublisher: Number
})
module.exports = mongoose.model(databaseConfig.col_publisher, schema)
