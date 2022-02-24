//conneción con la base de datos
const mysql = require('mysql');

const mysqlConnection = mysql.createPool({
	host: process.env.DB_HOST || 'localhost',
	user: process.env.DB_USER || 'root',
	password: process.env.DB_PASSWORD || 'password',
	database: process.env.DB_DATABASE || 'crud2',
});
mysqlConnection.getConnection((err) => {
	if (err) {
		console.log(err);
		return;
	} else {
		console.log('Db is connected');
	}
});

/* mysqlConnection.query(
	'SELECT 1 + 1 AS solution',
	function (error, results, fields) {
		if (error) throw error;
		console.log('The solution is: ', results[0].solution);
	}
);
 */
module.exports = mysqlConnection;
