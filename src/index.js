require('dotenv').config();
const express = require('express'); //retorna un obejto
const app = express(); // que se almacenara en una constante app

// Settings (aqui definiremos el puerto, entorno de desarrollo, motor de plantilla)
app.set('port', process.env.PORT || 3000);

// middlewares( son funciones que se ejecutan antes de  que se procese algo, por ejemplo si estamos esperando que ell servidor reciba algun archivo)

app.use(express.json());

//Routes
app.use(require('./routes/employess'));

//starting server

app.listen(app.get('port'), () => {
	console.log(`server funcionando en el puerto: ${app.get('port')}`);
});
