//requires
var mongoose = require('mongoose');

// Mongo Connection //
var mongoURI = '';
// process.env.MONGODB_URI will only be defined if you are running on Heroku
if(process.env.MONGODB_URI != undefined) {
    // use the string value of the environment variable
    mongoURI = process.env.MONGODB_URI;
} else {
    // use the local database server
    mongoURI = 'mongodb://localhost:27017/solo';
}//END else mongo connection

// var mongoURI = "mongodb://localhost:27017/passport";
var mongoDB = mongoose.connect(mongoURI).connection;

mongoDB.on('error', function(err){
    // error handling 
   if(err) {
     console.log("MONGO ERROR: ", err);
   }//END error handling
   res.sendStatus(500);
});//END mongoDB on

mongoDB.once('open', function(){
   console.log("Connected to Mongo!");
});//END mongoDB once

module.exports = mongoDB;
