'use strict';

const { query } = require('express');
var conexion = require('../config/config');

var Alumno = function(alumno){
    this.num_control = alumno.num_control;
    this.nombre = alumno.nombre;
    console.log("msj ", alumno.num_control);
};

//Crear Alumno
Alumno.create = function(nuevo_alumno, resultado){
    conexion.query("INSERT INTO alumnos set ?", nuevo_alumno, function(err, resp){
        if(err){
            console.log("Error: ", err);
            resultado(err, null);
        }else{
            console.log(resp.insertID);
            resultado(null, resp.insertID);
        }
    });
    console.log(query.sql);
}

//Eliminar Alumno
Alumno.delete = function(nc, resultado){
    conexion.query("DELETE FROM alumnos WHERE num_control = ?", [nc], function(err, resp){
        if(err){
            console.log("Error: ", err);
            resultado(null, err);
        }else{
            resultado(null, resp);
        }
    });
};

//Modificar Alumno
Alumno.update = function(nc, alumno, resultado){
    conexion.query("UPDATE alumnos SET nombre=? WHERE num_control=?", [alumno.n, alumno.nc], function(err, resp){
        if(err){
            console.log("Error: ", err);
            resultado(null, err);
        }else{
            resultado(null, resp);
        }
    });
};

//mostrar todos
Alumno.findAll = function(resultado){
    conexion.query("SELECT * FROM alumnos", function(err, resp){
        if(err){
            console.log("Error: ", err);
            resultado(null, err);
        }else{
            resultado(null, resp);
        }
    });
}


module.exports = Alumno;