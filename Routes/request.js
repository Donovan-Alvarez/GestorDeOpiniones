'use strict'

var express = require('express');
var ReqController = require('../Controllers/request');
var md_auth = require('../midellwares/authenticated');
var api = express.Router();

api.post('/save',md_auth.ensureAut, ReqController.saveRequest);
api.delete('/delete/:id',ReqController.deleteRequest);
api.get('/list', ReqController.listRequest);

module.exports = api;