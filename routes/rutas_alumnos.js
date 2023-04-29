const express = require('express');
const router = express.Router();
const controlador_alumno = require('../controllers/alumnoDAO');

//Altas
router.post('/', controlador_alumno.create);
//Bajas
router.post('/eliminar/:nc', controlador_alumno.delete);
//Cambios
router.post('/:nc', controlador_alumno.update);

//Consultas
//todos
router.get('/', controlador_alumno.findAll);
//por numero de control
//router.get('/:nc', controlador_alumno.findById);

module.exports = router;