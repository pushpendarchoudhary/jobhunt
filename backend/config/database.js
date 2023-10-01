const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({path: "backend/config/config.env"});
const connectDatabase = ()=> {
    mongoose.connect(process.env.DB_URL, {useNewUrlParser:true,useUnifiedTopology:true}).then((data) => {
        console.log('MongoDb connected with server ' + data.connection.host);
    
    });
    // create storage engine

}
module.exports = connectDatabase;