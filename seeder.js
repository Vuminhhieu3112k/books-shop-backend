const  fs = require('fs')
var mongoose = require('mongoose')
const databaseConfig  = require('./configs/database');
global.__base           = __dirname + '/';


mongoose.connect(`mongodb+srv://${databaseConfig.username}:${databaseConfig.password}@cluster0.4pg8w.mongodb.net/${databaseConfig.database}`)

const ItemSchemas = require('./schemas/items')

const Item = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/items.json`,'utf-8')
)
const importData = async()=>{
    try{
        await ItemSchemas.create(Item)
        console.log('imp data');
        process.exit();
    } catch (error){
        console.log(error);
    }
}

const deleteData = async()=>{
    try {
        await ItemSchemas.deleteMany({})
        console.log('delete data');
        process.exit();
    } catch(error){
        console.log(error);
    }
}
if(process.argv[2]=== '-i'){
    importData()
}
else if(process.argv[2]=== '-d'){
    deleteData()
}