const express = require("express");
const Router = express.Router();
const con = require("./db");
var moment = require("moment")

// byId
Router.get("/special/Obj/:id", function (req, res) {
  let user_id = req.params.id;
  con.query(
    "SELECT * FROM vendorview where userId=?",
     user_id,
    function (error, results ) {
      if (error) throw error;
      return res.send(results);
    }
  );
});


// getall
Router.get("/special/Obj/", function (req, res) {

  con.query(
    "SELECT * FROM vendorview ",
    function (error, results ) {
      if (error) throw error;
      return res.send(results);
    }
  );
});

// results[0]

Router.post("/members", function (req, res) {

  // reqn  ody
  var name = req.body.name;
  var email = req.body.email;
  var message = req.body.message;
  var mobile = req.body.mobile;
  var status = req.body.status;
  var tm = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
  var userId = req.body.userId;

  // query
  var query = `INSERT INTO vendorview 
	(name, email, message, mobile,status,tm,userId) 
	VALUES ("${name}", "${email}", "${message}", "${mobile}","${status}","${tm}","${userId}")`;

  // Run the query
  con.query(query, function (error, data) {
    if (error) {
      console.log(error);
      return res.status(500).json(error);
    } else {
      res.status(200)
      .send({...data});
    }
  });


});



Router.put('/members/update/:id', (req, res)=>{
  // ID via params
  var {id} = req.params;

  // req body
  var {status} = req.body;
  var {Remarks} = req.body;

  // Query
  var query = `UPDATE vendorview SET status='${status}', Remarks='${Remarks}'WHERE id=${id}`;

  // Run the query
  con.query(query, function (error, data) {
    if (error) {
      console.log(error);
      return res.status(500).json(error);
    } else {
      res.status(200)
      .send({...data});
    }
  });
});



 Router.delete('/member/remove/:id', function (req, res) {
    console.log(req.body);
    con.query('DELETE FROM vendorview WHERE id=?', [req.params.id], function (error, results, fields) {
       if (error){
        return res.status(500).json(error)
       }
       else
       res.json({
        message:'deleted successfully'
       })
     });
 });

module.exports = Router;
