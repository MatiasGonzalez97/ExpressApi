const usuario = require('./routes/usuarios');
const cursos = require('./routes/cursos');
const express = require('express');
const mongoose  = require('mongoose');
const app = express();



const port = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/usuarios',usuario);
app.use('/api/cursos',cursos);

// console.log(app._router.stack);

// app.get('/',(req, res ) => {res.send('Hola')});

//Conection BD
mongoose.connect('mongodb://localhost:27017/course_track',{useNewUrlParser : true, useUnifiedTopology : true})
    .then(()=> console.log('Conectandose a mongodb...'))
    .catch(err => console.log('No se pudo conectar  ', err));

//Puerto
app.listen(port,()=>{
    console.log('Escuchando en el puerto 3000...');
});
