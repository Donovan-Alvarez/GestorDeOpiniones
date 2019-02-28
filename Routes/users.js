'use strict'

var express = require('express');
var UserController = require('../Controllers/users');
var md_auth = require('../midellwares/authenticated');
var api = express.Router();

api.post('/save', UserController.saveUser);
api.delete('/delete/:id',md_auth.ensureAut, UserController.deleteuser);
api.get('/list', UserController.listuser);
api.post('/login/:id', UserController.loginuser);
api.post('/update/:id',md_auth.ensureAut, UserController.updateuser);

module.exports = api;