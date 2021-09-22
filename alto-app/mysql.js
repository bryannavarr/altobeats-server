const mysql = require("mysql2");

let _db = null;

let connection;

function connect(url) {
  connection = mysql.createConnection(url);
  connection.connect();
  connection.query;

  const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "altodb",
    password: "altobeats123",
  });

  _db = pool;
  if (_db !== null) {
    return Promise.resolve(_db);
  }
}

function handleDisconnect(url) {
  connection = mysql.createConnection(url);

  connection.connect(function (err) {
    console.log("Error when connecting to DB:::: " + JSON.stringify(err));
    setTimeout(handleDisconnect, 2000);
  });

  connection.on("error", function (err) {
    console.log("Error inside Handle Disconnect::: " + JSON.stringify(err));
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      handleDisconnect();
    } else {
      throw err;
    }
  });
}

module.exports = {
  connect,
  handleDisconnect,
  connection: { db: () => _db },
};
