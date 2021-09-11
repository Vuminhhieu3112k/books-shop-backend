const mongoose = require('mongoose');
const databaseConfig = require('../configs/database');
var schema = new mongoose.Schema({
        generalTopic: String,
        Topic: String,
})
module.exports = mongoose.model(databaseConfig.col_topic, schema)
