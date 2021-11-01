const mysql = require('mysql')

// connection for database
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: 'allAmericanFitness'
})

// send info over server
connection.connect((err)=> {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

module.exports = {connection}