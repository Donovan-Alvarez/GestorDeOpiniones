'use strict'
var Users = require('../Models/users');
var Survey = require('../Models/surveys');
var Req = require('../Models/request');
var bcrypt = require('bcrypt-nodejs');

var jwt = require('../services/jwt');
var multiparty = require('connect-multiparty');
var fs = require('fs');
var path = require('path');

// agregar
function saveUser(req, res){
  var user = new Users();
  var params = req.body;

  if (params.password && params.name && params.surname && params.email){
      user.name = params.name;
      user.surname = params.surname;
      user.email = params.email;
        Users.findOne({email: user.email.toLowerCase()}, (err, issetUsers) =>{

          if(err){
            res.status(500).send({message: 'Error, el usuario ya existe'});
          }else{
            if(!issetUsers){
            bcrypt.hash(params.password, null, null, function (err, hash){
                user.password = hash;
                user.save((err, userStored) => {
                  if(err){
                    res.status(500).send({message: 'error al guardar'});
                  }else{
                    if(!userStored){
                      res.status(404).send({message: 'no se pudo registrar el usuario'});
                    }else{
                      res.status(200).send({user: userStored});
                    }
                  }
                });
            });
            }else{
                res.status(200).send({message: 'El usuario no puede registrarse'});
                }
            }
          });
          }else{
            res.status(200).send({message: 'intoduce los datos correctamente'});
            }
          }
// Eliminar
function deleteuser (req, res){
    var id = req.params.id;
    Users.findByIdAndDelete({_id: id}, (err, Users)=>{
        if(err){
          send.status(500).send({message: 'No se encuentra'});
        }
        if(!id){
          res.status(404).send({message: 'No se pudo eliminar'});
        }else{
          res.status(200).send({message: 'Usuario Eliminado'});
        }
    });
  }

//   Listar
function listuser(req, res){
    Users.find({}, (err,Users)=>{
      if(err){
        res.status(500).send({message: 'no se ha podido listar los usuarios'});
      }else{
        res.status(200).send({Users});
      }
    });

  }

//   Login
function loginuser(req, res){
  var id = req.params.id;
    var params = req.body;
    var email = params.email;
    var password = params.password;
    Users.findOne({email: email},(err, users)=>{
      if(err){
        res.status(500).send({message: 'Error al intentar iniciar sesión'});
      }else{
        if(users){
          bcrypt.compare(password, users.password, (err, check)=>{
            if(check){
              if(params.gettoken){
                res.status(200).send({
                  token: jwt.createToken(users)
                });
              }else{
                Survey.find({Users: id},(err,lista)=>{
                 Req.find({Users: id},(err,list)=>{
                  if(err){
                    res.status(500).send({message: 'No se puede listar'});
                  }else{
                    if(!lista){
                      res.status(404).send({message: 'Error'});
                    }else{
                      res.status(200).send({users, Encuesta: lista, Respuestas: list});
                    }
                  }
                 });
                });
              }
            }else{
              res.status(404).send({message: 'El usuario no ha podido logearse correctamente'});
            }
          });
        }else{
          res.status(404).send({message: 'No se ha podido encontrar el usuario'});
        }
      }
    });
}

// Update
function updateuser(req,res){
    var userid = req.params.id;
    var update = req.body;

    if(userid != req.users.sub){
      res.status(500).send({message: 'No tiene permiso para actualizar el usuario'});
    }
    Users.findByIdAndUpdate(userid, update,{new: true}, (err, userUpdate)=>{
      if(err){
        res.status(500).send({message: 'Error al actualizar el users'});
      }else{
        if(!userUpdate){
          res.status(404).send({message: 'No se ha podido actualizar el users'});
        }else{
          res.status(200).send({user: userUpdate});
        }
      }
    });
  }

module.exports = {
    saveUser,
    deleteuser,
    listuser,
    loginuser,
    updateuser

}
