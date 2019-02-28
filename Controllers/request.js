'use strict'
var Request = require('../Models/request');

var jwt = require('../services/jwt');


// agregar
function saveRequest(req,res){
    var request = new Request();
    var params = req.body;
    if(params.description){
        request.title = params.title;
        request.description = params.description;
        request.Users = req.users.sub;
    request.save((err,Requestave)=>{
        if(err){
            res.status(500).send({message: 'No se ha guardado'});
        }else{
            if(!Requestave){
                res.status(500).send({message: 'Error al guardar los datos'});
            }else{
                res.status(200).send({student: Requestave});
            }
        }
    });
}else{
    res.status(404).send({message: 'Debe introducir los campos requeridos'});

}
}

// Eliminar
function deleteRequest (req, res){
    var id = req.params.id;
    Request.findByIdAndDelete({_id: id}, (err, Request)=>{
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
function listRequest(req, res){
    Request.find({}, (err,Request)=>{
      if(err){
        res.status(500).send({message: 'no se ha podido listar las encuestas'});
      }else{
        res.status(200).send({Request});
      }
    });

  }

module.exports = {
    saveRequest,
    deleteRequest,
    listRequest

}

