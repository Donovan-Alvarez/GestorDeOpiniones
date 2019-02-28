'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Surveyschema = Schema({
    title: String,
    description: String,
    Users: {type: Schema.ObjectId, ref:'Users'}
});

module.exports = mongoose.model('Survey', Surveyschema);