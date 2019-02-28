'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();


// Rutas
var users_routes = require('./Routes/users');
var survey_routes = require('./Routes/surveys');
var Request_routes = require('./Routes/request');

// BodyParser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// uso rutas
app.use('/user', users_routes);
app.use('/survey', survey_routes);
app.use('/request', Request_routes);

// cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


module.exports = app;