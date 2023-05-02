const express = require("express");
const app = express();
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const router = require("./alto-app/routes");
const mysql = require("./alto-app/mysql");

const { handleDisconnect } = require("./alto-app/mysql");

// initialize dotenv
dotenv.config();

// set our port
const port = process.env.PORT || 5001;

// get all data/stuff of the body (POST) parameters
// parse application/jsonock

app.use(express.urlencoded({extended: true})); 
app.use(express.json());



app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:1931");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("withCredentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,Cookie, x-access-token"
  );
  next();
});

// register routes
app.use(router);

mysql
  .connect(process.env.MYSQL_URL)
  .then(() => app.listen(port, "127.0.0.1"))
  .then(() =>
    console.log(`Node server is running and listening on port: ${port}`)
  )
  .catch((err) => {
    console.error("MySQL Error :: " + JSON.stringify(err));
    // mysql.handleDisconnect(process.env.MYSQL_URL)
    process.exit(1);
  });
