const mongoose = require('mongoose');
const databaseConfig = require('../configs/database');
var schema = new mongoose.Schema({
        nameAuthor: String,
        storyAuthor: String,
})
module.exports = mongoose.model(databaseConfig.col_author, schema)
