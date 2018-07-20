var express = require('express');
var router = express.Router();

var unirest = require('unirest');

var soap = require('soap');
var url = 'http://localhost:7777/ws/AcademicoWebService?wsdl';

var soapHeader = ''//xml string for header


/***************** Las rutas de REST ************************************/

/* Listado estudiantes. */
router.get('/rest/estudiantes/', function(req, res, next) {
    unirest.get('http://localhost:4567/rest/estudiantes/')
        .headers({ 'Accept': 'application/json' })
            .end(function (resp) {
               res.json(resp.body);
            });
});

/* Estudiante por matricula */
router.get('/rest/estudiantes/:id', function(req, res, next) {
    unirest.get('http://localhost:4567/rest/estudiantes/' + req.params.id)
        .headers({ 'Accept': 'application/json' })
            .end(function (resp) {
                res.json(resp.body);
            });
});

/* Crea a un estudiante */
router.get('/rest/estudiantes/crear', function(req, res, next) {

    let estudiante = {
        nombre: "Shantall Rodríguez",
        matricula: "20135202",
        correo: "sara@correo.com",
        carrera: "ITT"
    };

    unirest.post('http://localhost:4567/rest/estudiantes/')
        .headers({'Accept': 'application/json', 'Content-Type': 'application/json'})
        .send( JSON.stringify(estudiante) )
        .end(function (resp) {
            res.json(resp.body);
        });
});



/*********************** Las rutas de SOAP **********************/
/*Asignatura por ID */
router.get('/soap/asignatura/:id', function(req, res, next) {
    soap.createClient(url, function(err, client){
        client.getAsignatura("1", function(err, resp){
            if(err){ throw err; }
            res.json(resp);
        });
    });
});

/* Profesor por cedula */
router.get('/soap/profesor/:id', function(req, res, next) {
    soap.createClient(url, function(err, client){
        client.getProfesor("1", function(err, resp){
            if(err){ throw err; }
            res.json(resp);
        });
    });
});

/* Todos los estudiantes */
router.get('/soap/estudiantes/', function(req, res, next) {
    soap.createClient(url, function(err, client){
        client.getAllEstudiante({}, function(err, resp){
            if(err){ throw err; }
            res.json(resp);
        });
    });
});


module.exports = router;
