const express = require('express'); //retorna un obejto
const router = express.Router();
const mysqlConnection = require('../database/database');

//consultar datos
router.get('/', (req, res) => {
	//le indicamos que de la tabla usuarios2  selecione todo los datos y los muestre
	mysqlConnection.query('SELECT * FROM usuarios', (err, rows, fields) => {
		if (!err) {
			res.json(rows);
		} else {
			console.log(err);
		}
	});
});

router.get('/:id', (req, res) => {
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
//CREAR DATOS
router.post('/', (req, res) => {
	const { id, name, last_name, salary } = req.body;
	/* console.log(id, name, last_name, salary); */
	const query = `
   CALL usuariosAddOrEdit(?,?,?,?);`;
	mysqlConnection.query(
		query,
		[id, name, last_name, salary],
		(err, rows, fields) => {
			if (!err) {
				res.json({ status: 'USUARIOS GUARDADOS' });
			} else {
				console.log(err);
			}
		}
	);
});
//actualizar datos de la tabla

router.put('/:id', (req, res) => {
	const { name, last_name, salary } = req.body;
	const { id } = req.params;
	const query = `
   CALL usuariosAddOrEdit(?,?,?,?);`;
	mysqlConnection.query(
		query,
		[id, name, last_name, salary],
		(err, rows, fields) => {
			if (!err) {
				res.json({ status: 'usuario actualizado' });
			} else {
				console.log(err);
			}
		}
	);
});
// borrar usuarios
router.delete('/:id', (req, res) => {
	const { id } = req.params;
	mysqlConnection.query(
		'DELETE FROM usuarios WHERE id = ?',
		[id],
		(err, rows, fields) => {
			if (!err) {
				res.json({ status: 'usuarios eliminado' });
			} else {
				console.log(err);
			}
		}
	);
});
module.exports = router;
