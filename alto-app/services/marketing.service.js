const mysql = require("../mysql");
const connection = mysql.connection;
const nodemailer = require("nodemailer");
const fs = require("fs");
let handlebars = require("handlebars");

module.exports = {
  sendEmailBlast: sendEmailBlast,
};


function getAllSubscribers(callback) {
  return new Promise((resolve, reject) => {
    connection.db().query("SELECT * FROM emails", function (err, results) {
      if (err) reject(err);
      resolve(results);
    });
  });
}

function readHTMLTemplate(path, callback) {

  fs.readFile(path, { encoding: "utf-8" }, function (err, html) {
    if (err) {
      callback(err);
    } else {
      callback(null, html);
    }
  });
}

function sendEmail(email, mailTransporter, html, callback, emailType) {
  return new Promise((resolve, reject) => {
    let data = {
      email: "",
      message: "hello",
    };

    let mailDetails = {
      from: process.env.GMAIL_ACCT,
      to: email,
      subject: "New Release",
      html: html,
    };
    mailTransporter.sendMail(mailDetails, function (err, data) {
      resolve(data);
    });
  });
}

function sendEmailBlast(body, callback) {
  let emails;
  let template = null
  let basePath = null

  basePath = `${__dirname}/templates`;
  // basePath = "/Users/new/Documents/Code/altobeats-backend/alto-app/templates";


  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_ACCT,
      pass: process.env.GMAIL_PASS,
    },
  });

  readHTMLTemplate(`${basePath}/release.html`, function (err, html) {
    template = handlebars.compile(html);
    let replacements = {
      link: "www.google.com",
    };
    let htmlToSend = template(replacements);
    getAllSubscribers()
      .then((response) => {
        emails = response;
        let i,
          each,
          promises = [];
        for (i = 0; i < emails.length; i++) {
          each = emails[i];
          promises.push(sendEmail(each.email, mailTransporter, htmlToSend));
        }
        return callback(Promise.all(promises));
      })
      .catch((err) => {
        console.log("erroroor: " + JSON.stringify(err));
      });
  })


  // });
}
