const express = require('express'); //retorna un obejto
const router = express.Router();
const mysqlConnection = require('../database/database');

//consultar datos
router.get('/todos', (req, res) => {
	//le indicamos que de la tabla usuarios2  selecione todo los datos y los muestre
	mysqlConnection.query('SELECT * FROM usuarios', (err, rows, fields) => {
		if (!err) {
			res.json(rows);
		} else {
			console.log(err);
		}
	});
});

router.get('/consultarid/:id', (req, res) => {
	//para obtener y ver el valor de id  que le ingresamos.
	// ese id viene en una constante llamda req.params.id
	//https://expressjs.com/en/guide/routing.html
	//https://www.geeksforgeeks.org/express-js-req-params-property/
	const { id } = req.params;
	mysqlConnection.query(
		//inyecciones sql
		'SELECT * FROM usuarios WHERE id=?',
		[id],
		(err, rows, fields) => {
			if (!err) {
				res.json(rows[0]);
			} else {
				console.log(err);
			}
		}
	);
});
//consultar usuarios ppor corrreo y contraseña
router.post('/consulta', (req, res) => {
	const { email } = req.body;
	const { password } = req.body;
	mysqlConnection.query(
		//inyecciones sql
		'SELECT names, email, password FROM usuarios WHERE (email = ? and password=?)',
		/* 'SELECT email, password FROM usuarios WHERE email=?' */
		[email, password],
		(err, rows, fields) => {
			if (!err) {
				if (rows[0]) {
					res.json({
						status: `El usuario ${rows[0].names} existe en la base de datos `,
					});
				} else {
					res.json({ status: 'El usuario no existe en la base de datos' });
				}
				/* res.json(rows[0]); */
			} else {
				console.log(err);
			}
		}
	);
});
//CREAR DATOS
router.post('/registro', (req, res) => {
	mysqlConnection.query('SET SESSION auto_increment_increment=1');
	const { id, names, email, password } = req.body;
	/* console.log(id, name, last_name, salary); */
	/* mysqlConnection.query('SET @auto_increment_increment =1'); */
	const query = `
   CALL usuariosAddOrEdit(?,?,?,?);`;
	mysqlConnection.query(
		query,
		[id, names, email, password],
		(err, rows, fields) => {
			if (!err) {
				res.json({ status: 'Usuario guardado' });
			} else {
				console.log(err);
			}
		}
	);
});
//actualizar datos de la tabla

router.put('/actualizar/:id', (req, res) => {
	const { names, email, password } = req.body;
	const { id } = req.params;
	const query = `
   CALL usuariosAddOrEdit(?,?,?,?);`;
	mysqlConnection.query(
		query,
		[id, names, email, password],
		(err, rows, fields) => {
			if (!err) {
				res.json({ status: 'Usuario actualizado' });
			} else {
				console.log(err);
			}
		}
	);
});
// borrar usuarios
router.delete('/eliminar/:id', (req, res) => {
	const { id } = req.params;
	mysqlConnection.query(
		'DELETE FROM usuarios WHERE id = ?',
		[id],
		(err, rows, fields) => {
			if (!err) {
				res.json({ status: 'Usuarios eliminado' });
			} else {
				console.log(err);
			}
		}
	);
});
module.exports = router;
