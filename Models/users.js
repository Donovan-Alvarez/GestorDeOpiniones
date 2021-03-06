'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsersSchema = Schema({
    name: String,
    surname: String,
    email: String,
    password: String
});

module.exports = mongoose.model('Users', UsersSchema);
