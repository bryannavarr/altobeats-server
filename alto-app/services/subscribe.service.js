const mysql = require("../mysql");
const connection = mysql.connection;

module.exports = {
  create: create,
  readByEmail: readByEmail,
};

function create(email) {
  return new Promise(function (resolve, reject) {
    connection
      .db()
      .query("INSERT INTO emails SET email=?", email, function (err, result) {
        // if(error)   reject(error)
        console.log('result: ' +JSON.stringify(result))
        err ? reject(err) : resolve(result.insertId);
      });
  });
}

function readByEmail(email) {
  return new Promise((resolve, reject) => {
    connection
      .db()
      .query(
        "SELECT * FROM emails WHERE email=?",
        email,
        function (err, result) {
          
            if (result.length > 0) {
              resolve(result);
            } else {
              resolve(false)
            }
        }
      );
  });
}
