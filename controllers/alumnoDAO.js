'use strict';

const {application} = require('express')
const Alumno = require('../models/alumno');

//-------------Altas---------------
exports.create = function(req, resp){
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        resp.status(400).send({error: true, msj: 'Falta información'});
    }else{
        const a = {
            num_control : req.body.num_control,
            nombre : req.body.nombre
        };

        const nuevo_alumno = new Alumno(a);

        Alumno.create(nuevo_alumno, function(err, a){
            if(err)
                resp.send(err);
            req.flash('msj', 'Alumno agregado correctamente');
            resp.redirect('/');
        });
    }
};

//-------------Bajas---------------
exports.delete = function(req, resp){
    Alumno.delete(req.params.nc, function(err, alumno){
        if(err)
            resp.send(err);
        req.flash('msj', 'Alumno eliminado correctamente');
        resp.redirect('/');
    })
};

//------------Cambios--------------
exports.update = function(req, resp){
    const a = {
        num_control : req.body.num_control,
        nombre : req.body.nombre
    }

    Alumno.update(req.params.nc, new Alumno(a), function(err, a){
        if(err)
            resp.send(err);
        req.flash('msj', 'Alumno modificado correctamente');
        resp.redirect('/');
    })
};

//-----------Consultas-------------
//---Todos---
exports.findAll = function(req, resp){
    Alumno.findAll(function(err,alumno){
        if(err)
            resp.send(err);
        console.log('Listado de alumnos', alumno);
        resp.status(200).send(alumno);
    });
};

//---Buscar un alumno---
exports.findById = function(req, resp){
    Alumno.findById(req.params.nc, function(err, alumno){
        if(err)
            resp.send(err);
        resp.json(alumno);
    });
};