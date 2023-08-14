var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "jarvo",
  database:'wallmart',
  port:3306


});

con.connect(function(err) {
  if(err){
    console.log('check your connections');
  }
  else{
    console.log("Db Connected!");
  }

});

module.exports = con