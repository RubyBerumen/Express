'use strict';

const mysql = require('mysql');

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'ruby',
    password: 'ruby1',
    database: 'bd_Express'
});

conexion.connect(function(err){
    if(err) throw err;
    console.log('Conexión a la base de datos correcta');
});

module.exports = conexion;