var mongoose = require('mongoose');
const config = require('../config/config').get(process.env.NODE_ENV);


module.exports =function(){

    mongoose.connect(config.mongodb.url,{ useNewUrlParser: true });

    mongoose.connection.on('connected', function(){
        console.log("Mongoose default connection is open to ", config.mongodb.url);
    });

    mongoose.connection.on('error', function(err){
        console.log("Mongoose default connection has occured "+err+" error");
    });

    mongoose.connection.on('disconnected', function(){
        console.log("Mongoose default connection is disconnected");
    });

    process.on('SIGINT', function(){
        mongoose.connection.close(function(){
            console.log("Mongoose default connection is disconnected due to application termination");
            process.exit(0)
        });
    });
}