const express = require("express");
const Router = express.Router();
const con = require("./db");

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


// byallId
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
  var name = req.body.name;
  var email = req.body.email;
  var message = req.body.message;
  var mobile = req.body.mobile;
  var status = req.body.status;
  // var tm = moment(created_at).utc().utcOffset(-4).format('MM/DD/YYYY, h:mm a');
  var userId = req.body.userId;

  var query = `INSERT INTO vendorview 
	(name, email, message, mobile,status,userId) 
	VALUES ("${name}", "${email}", "${message}", "${mobile}","${status}","${userId}")`;

  con.query(query, function (error, data) {
    if (error) {
      console.log(error);
      return res.status(500).json(error);
    } else {
      res.status(200)
      .send({...data});
    }
  });

  //   var tm = new Date();
  //  var userId= req.body.userId;
});

 Router.put('/members/update', function (req, res) {
    con.query('UPDATE `vendorview` SET `name`=?,`email`=?,`message`=?,`mobile`=? where `id`=?',
     [req.body.name,req.body.email, req.body.message, req.body.mobile, req.body.id], function (error, results, fields) {
       if (error) throw error;
       else
       res.json({
        message:'updated successfully'
       })
    //    res.end(JSON.stringify(results));
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
