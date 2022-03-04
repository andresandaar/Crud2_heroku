require('dotenv').config();
const express = require('express'); //retorna un obejto
const app = express(); // que se almacenara en una constante app
var cors = require('cors');
app.use(cors());

// Settings (aqui definiremos el puerto, entorno de desarrollo, motor de plantilla)
app.set('port', process.env.PORT || 3001);

// middlewares( son funciones que se ejecutan antes de  que se procese algo, por ejemplo si estamos esperando que ell servidor reciba algun archivo)

app.use(express.json());

//Routes
app.use(require('./routes/employess'));

//starting server

app.listen(app.get('port'), () => {
	console.log(`server funcionando puerto: ${app.get('port')}`);
});
//hola
//CLEARDB_DATABASE_URL mysql://bf0533ff9c5545:fc6e77a3@eu-cdbr-west-02.cleardb.net/heroku_a8365fb4a79f994?reconnect=true

/* user: bf0533ff9c5545
contraseña:fc6e77a3
host: eu - cdbr - west - (02).cleardb.net
nombre_databae:heroku_a8365fb4a79f994 */

//https://docs.mikelgoig.com/nodejs/despliegue-en-heroku.html#variables-de-entorno
