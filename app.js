/*var http = require('http');
var server = http.createServer();

function CrearServidor(request, response) {
    response.writeHead(200, {'content-type':'text/plain'});
    response.write('Magia magia con NODEJS y EXPRESS');
    response.end();
}

server.on('request', CrearServidor);

server.listen(5000, function(){
    console.log('Servidor iniciado correctamente');
});*/

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const session = require('express-session');
const flash = require('express-flash');

app.use(session({secret:'secret', resave:false, saveUninitilizated:false}));
app.use(flash());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

const port = process.env.PORT || 3000;

//peticiones tipo application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}));
//peticiones tipo application/json
app.use(bodyParser.json());

app.use(express.static('public'))

app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))

app.get('/', (req, resp) =>{
  var msj = req.flash('msj')
  resp.render('index', {
    data: msj
  })
})

//altas
app.get('/agregar', (req, resp) =>{
  resp.render('altas')
})

//bajas se realizaran el la vista de consultas

//cambios
app.get('/modificar', (req, resp) =>{
  resp.render('cambios')
})

//consultas
app.get('/alumnos', (req, resp) =>{
  resp.render('consultas')
})


app.listen(
  port, () => {
    console.log(`App iniciada en el puerto ${port}`);
  }
);

const ruta_alumnos = require('./routes/rutas_alumnos');

//registro de MIDDLEWARE
app.use('/api/v1/alumnos', ruta_alumnos)