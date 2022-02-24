//conneción con la base de datos
const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
	host: process.env.DB_HOST || 'localhost',
	user: process.env.DB_USER || 'root',
	password: process.env.DB_PASSWORD || 'password',
	database: process.env.DB_DATABASE || 'crud2',
	multipleStatements: true,
});
mysqlConnection.connect((err) => {
	if (err) {
		console.log(err);
		return;
	} else {
		console.log('Db is connected');
	}
});

module.exports = mysqlConnection;
