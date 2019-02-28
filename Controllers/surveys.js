'use strict'
var Surveys = require('../Models/surveys');
var bcrypt = require('bcrypt-nodejs');

var jwt = require('../services/jwt');
var multiparty = require('connect-multiparty');
var fs = require('fs');
var path = require('path');

// agregar
function savesurvey(req, res){
    var surveys = new Surveys();
    var params = req.body;
  
    if (params.title && params.description){
        surveys.title = params.title;
        surveys.description = params.description;
        surveys.Users = req.users.sub;
          Surveys.findOne({title: surveys.title}, (err, issesurveys) =>{
  
            if(err){
              res.status(500).send({message: 'Error, la encuesta ya existe'});
            }else{
              if(!issesurveys){
              bcrypt.hash(params.password, null, null, function (err, hash){
                  surveys.password = hash;
                  surveys.save((err, usersurvey) => {
                    if(err){
                      res.status(500).send({message: 'error al guardar'});
                    }else{
                      if(!usersurvey){
                        res.status(404).send({message: 'no se pudo registrar la encuesta'});
                      }else{
                        res.status(200).send({surveys: usersurvey});
                      }
                    }
                  });
              });
              }else{
                  res.status(200).send({message: 'La encuesta no puede registrarse'});
                  }
              }
            });
            }else{
              res.status(200).send({message: 'intoduce los datos correctamente'});
              }
            }

// Eliminar
function deletesurveys (req, res){
    var id = req.params.id;
    Surveys.findByIdAndDelete({_id: id}, (err, Surveys)=>{
        if(err){
          send.status(500).send({message: 'No se encuentra'});
        }
        if(!id){
          res.status(404).send({message: 'No se pudo eliminar'});
        }else{
          res.status(200).send({message: 'Encuesta Eliminada'});
        }
    });
  }

//   Listar
function listsurveys(req, res){
    Surveys.find({}, (err,Surveys)=>{
      if(err){
        res.status(500).send({message: 'no se ha podido listar las encuestas'});
      }else{
        res.status(200).send({Surveys});
      }
    });

  }



// Update
function updateSurveys(req,res){
    var surveysid = req.params.id;
    var update = req.body;
    Surveys.findByIdAndUpdate(surveysid, update,{new: true}, (err, surveysUpdate)=>{
      if(err){
        res.status(500).send({message: 'Error al actualizar el Surveys'});
      }else{
        if(!surveysUpdate){
          res.status(404).send({message: 'No se ha podido actualizar el Surveys'});
        }else{
          res.status(200).send({surveys: surveysUpdate});
        }
      }
    });
  }



module.exports = {
    savesurvey,
    deletesurveys,
    listsurveys,
    updateSurveys

}

