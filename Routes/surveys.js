'use strict'

var express = require('express');
var SurveyController = require('../Controllers/Surveys');
var md_auth = require('../midellwares/authenticated');
var api = express.Router();

api.post('/save',md_auth.ensureAut, SurveyController.savesurvey);
api.delete('/delete/:id',md_auth.ensureAut, SurveyController.deletesurveys);
api.get('/list', SurveyController.listsurveys);
api.post('/update/:id', SurveyController.updateSurveys);
module.exports = api;