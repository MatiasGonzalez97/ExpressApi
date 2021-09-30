const express = require('express');
const Usuarios = require('../models/usuario_model');
const ruta = express.Router();
// const Joi = require('@hapi/joi'); It's just not worth it


ruta.get('/',(req,res)=>{
    let resultado = listarUsuarios();
    resultado.then(usuarios =>{
        res.json(usuarios)
    }).catch(error => {
        res.status(400).json({
            error : err
        });
    })
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


ruta.put('/:email',(req, res)=>{
    let resultado = actualizarUsuario(req.params.email,req.body);
    resultado.then(valor => {
        res.json({
            valor: valor
        })
    }).catch(err => {
        res.status(400).json({
            error:err
        });
    })
});

ruta.delete('/:email',(req,res)=>{
    let resultado = desactivarUsuario(req.params.email);
    resultado.then(valor => {
        res.json({
            valor : valor
        });
    }).catch( err => {
        res.json({
            error: err
        });
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


async function actualizarUsuario(email,body){
    let usuarios = await Usuarios.findOneAndUpdate(email, {
        $set : {
            nombre : body.nombre,
            password : body.password
        }
    }, {new : true});

    return usuarios;
}

async function desactivarUsuario(email){
    let usuarios = await Usuarios.findOneAndUpdate(email,{
        $set:{
            estado : false
        }
    },{new:true});

    return usuarios;
}

async function listarUsuarios(){
    let usuarios = await Usuarios.find({"estado":true});
    return usuarios;
}


module.exports = ruta;