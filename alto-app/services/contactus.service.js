const mysql = require("../mysql");
const connection = mysql.connection;
const nodemailer = require("nodemailer");


// const create = (body) => {
//   return new Promise((resolve, reject) => {
//     connection
//       .db()
//       .query("INSERT INTO messages SET ?", body, (error, results) => {
//         error
//           ? reject(error)
//           : console.log(
//               "result from MySQL creation " + JSON.stringify(results)
//             );
//         resolve(results.insertId);
//       });
//   });
// };

const create = (body)=>{
  console.log(body)
  return new Promise((resolve, reject)=>{
    let mailTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_ACCT,
        pass: process.env.GMAIL_PASS,
      },
    });

    let emailMessage = 'Sender: ' + body.email + "\n" + "Message: " + body.message 
   
    
    let mailDetails = {
      from: body.email,
      to: process.env.GMAIL_ACCT,
      subject: `NEW MESSAGE FROM: ${body.name.toUpperCase()}`,
      text: emailMessage
    };
    mailTransporter.sendMail(mailDetails, function (err, data) {
      if(err) reject(err)
      if(data)
      resolve("success");
    });
  })
}

module.exports = {
  create: create,
};
