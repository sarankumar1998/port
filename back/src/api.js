const express = require("express");
const Router = express.Router();
const con = require("./db");

Router.get('/special/Obj',(req,res) => {
    con.query('SELECT * FROM vendorview', (err, rows) => {
        if(!err) {
            res.json(rows)
        }
        else{
            throw err
        }
    })
})


// PLAIN OBJ
// Router.get('/special/Obj',(req,res) => {
//     con.query('SELECT * FROM vendorview', (err, result) => {
//         if(!err) {
//             Object.keys(result).forEach(function(key){
//                 var row = result[key];
//                 console.log(result)
//             })
//             res.send(result.name)
//         }
//         else{
//             throw err
//         }
//     })
// })

Router.post("/members", function (req, res) {
  var name = req.body.name;
  var email = req.body.email;
  var mobile = req.body.mobile;
  var message = req.body.message;
  var status = req.body.status;
  // var tm = req.body;
  var userId = req.body.userId;

  var query = `INSERT INTO vendorview 
	(name, email, message, mobile,status,userId) 
	VALUES ("${name}", "${email}", "${mobile}", "${message}","${status}", "${userId}")`;

  con.query(query, function (error, result) {
    if (error) {
      console.log(error);
      return res.status(500).json(error);
    } else {
      res.status(200)
      .json(data=result);
    }
  });

  //   var tm = new Date();
  //  var userId= req.body.userId;
});

//  Router.put('/members/update', function (req, res) {
//     con.query('UPDATE `vendorview` SET `name`=?,`email`=?,`message`=?,`mobile`=? where `id`=?',
//      [req.body.name,req.body.email, req.body.message, req.body.mobile, req.body.id], function (error, results, fields) {
//        if (error) throw error;
//        else
//        res.json({
//         message:'updated successfully'
//        })
//     //    res.end(JSON.stringify(results));
//      });
//  });

//  Router.delete('/member/remove/:id', function (req, res) {
//     console.log(req.body);
//     con.query('DELETE FROM vendorview WHERE id=?', [req.params.id], function (error, results, fields) {
//        if (error) throw error;
//        else
//        res.send({
//         message:'deleted successfully'
//        })
//      });
//  });

module.exports = Router;
