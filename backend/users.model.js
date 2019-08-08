var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usersSchema = new Schema({
    name :{
        type: String,
        unique : false,
        required : true
    },
    dob : {
        type: Date,
        unique : false,
        required : true
    },
    address:{
        type: String,
        unique : false,
        required : true
    },
    city:{
        type: String,
        unique : false,
        required : true
    },
    state:{
        type: String,
        unique : false,
        required : true
    },
    mobile:{
        type: String,
        unique : false,
        required : true
    },
    email:{
        type: String,
        unique : false,
        required : true
    }
}, {
    timestamps: true
});

module.exports = usersSchema;