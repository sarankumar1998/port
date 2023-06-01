var mysql = require('mysql');



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