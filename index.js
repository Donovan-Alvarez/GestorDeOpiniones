'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3000;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Gestor', {useNewUrlParser: true})

.then((err,res)=>{
    console.log('Base de datos conectada');
    app.listen(port, ()=>{
        console.log('Servidor levantado');
    });
})
.catch(err => console.log(err));