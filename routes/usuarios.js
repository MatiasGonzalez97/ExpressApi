const express = require('express');
const Usuarios = require('../models/usuario_model');
const ruta = express.Router();

ruta.get('/',(req,res)=>{
    res.json('Listo');
});

ruta.post('/', (req,res) => {
    let body = req.body;
    let resultado = crearUsuario(body);

    resultado.then( valor =>{ 
        res.json({
            valor : valor
        })
    }).catch( error => {
        res.status(400).json({
            error: error
        })
    });
});




async function crearUsuario(body){
    let usuarios = new Usuarios({
        email :     body.email,
        nombre :    body.nombre,
        password :  body.password
    });

    return await usuarios.save();

}


module.exports = ruta;