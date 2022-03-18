const mysql = require("../mysql");
const connection = mysql.connection;
const nodemailer = require("nodemailer");

module.exports = {
  create: create,
};

function create(body) {
  //design email template
  //get all emails
  //use nodemon to send body to all emails

  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_ACCT,
      pass: process.env.GMAIL_PASS,
    },
  });

  return new Promise((resolve, reject) => {
    connection.db().query("SELECT * FROM emails", function (err, result) {
      if (err) throw err;
      console.log("result");
      resolve(result);
    });
  });

  //   let mailDetails = {
  //     from: process.env.GMAIL_ACCT,
  //     to: "abc@gmail.com",
  //     subject: "Test mail",
  //     text: "Node.js testing mail for GeeksforGeeks",
  //   };

  //   mailTransporter.sendMail(mailDetails, function (err, data) {
  //     if (err) {
  //       console.log("Error Occurs");
  //     } else {
  //       console.log("Email sent successfully");
  //     }
  //   });
}
