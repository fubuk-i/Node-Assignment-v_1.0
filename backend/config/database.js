var mongoose = require('mongoose');

var dbURL = require('./properties').DB;

module.exports =function(){

    mongoose.Promise = global.Promise;

    // Connecting to the database
    mongoose.connect(dbURL, {
        useNewUrlParser: true
    }).then(() => {
        console.log("Successfully connected to the database");    
    }).catch(err => {
        console.log('Could not connect to the database. Exiting now...', err);
        process.exit();
    });
}