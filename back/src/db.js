var mysql = require('mysql');



console.log(`${process.env.DB_Credential}`,'lo');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "jarvo",
  database:'wallmart'
});

con.connect(function(err) {
  if(err){
    console.log('check your connections');
  }
  else{
    console.log("Connected!");
  }

});

module.exports = con