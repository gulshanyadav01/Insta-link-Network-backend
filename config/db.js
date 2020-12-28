const mongoose = require("mongoose"); 

const config  = require("config"); 
// const { builtinModules } = require("module");

const db = config.get("mongoURI"); 

const connectDB = async () =>{
    try{
       await  mongoose.connect(db, {
           useNewUrlParser: true,
           useUnifiedTopology: true,
           useCreateIndex: true
           
       }); 
       console.log("MONGODB CONNECTED");

    }catch(err){
        console.log(err.message); 
        // exit process with fail 
        process.exit(); 
    }
}

module.exports = connectDB; 