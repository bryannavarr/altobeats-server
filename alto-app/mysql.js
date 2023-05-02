const mysql = require("mysql2");

let _db = null;

let connection;

function connect(url) {
  // connection = mysql.createConnection(url);
  // connection.connect();
  // connection.query;

  const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "altodb",
    password: process.env.DBPASS,
    port: '3306'
  });

  _db = pool;
  if (_db !== null) {
    return Promise.resolve(_db);
  }
}

module.exports = {
  connect,
  connection: { db: () => _db },
};
