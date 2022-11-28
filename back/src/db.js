var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "jarvo",
  database:'wallmart'
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = con