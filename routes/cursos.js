const express = require('express');
const Curso = require('../models/curso_model');
const ruta = express.Router();

ruta.get('/',(req,res)=>{
    let resultado = listarCursos();
    resultado.then(result =>{
        res.json(result)
    }).catch(error => {
        res.status(400).json({
            error : err
        });
    })
});

ruta.post('/', (req,res) => {
    let body = req.body;
    let resultado = crearCurso(body);

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
    let resultado = actualizarCurso(req.params.email,req.body);
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

ruta.delete('/:id',(req,res)=>{
    let resultado = desactivarCurso(req.params.id);
    // console.log(resultado);
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



async function crearCurso(body){
    let curso = new Curso({
        titulo :     body.titulo,
        descripcion :    body.descripcion,
    });

    return await curso.save();

}


async function actualizarCurso(id,body){
    let curso = await Curso.findByIdAndUpdate(id, {
        $set : {
            titulo : body.titulo,
            descripcion : body.descripcion
        }
    }, {new : true});

    return curso;
}

async function desactivarCurso(id){
    let curso = await Curso.findByIdAndUpdate(id,{
        $set:{
            estado : false
        }
    },{new:true});

    return curso;
}

async function listarCursos(){
    let curso = await Curso.find({"estado":true});
    return curso;
}


module.exports = ruta;