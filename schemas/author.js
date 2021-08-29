const mongoose = require('mongoose');
const databaseConfig = require('../configs/database');
var schema = new mongoose.Schema({
        nameAuthor: String,
        addressAuthor: String,
        storyAuthor: String,
        phonenumberAuthor: String
    
})
module.exports = mongoose.model(databaseConfig.col_author, schema)
