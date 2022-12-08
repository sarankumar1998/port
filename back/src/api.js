const express = require('express')
const Router = express.Router();
const con = require('./db')

// Router.get('/special',(req,res) => {
//     con.query('SELECT * FROM vendorview', (err, rows) => {
//         if(!err) {
//             res.send(rows)
//         }
//         else{
//             throw err
//         }
//     })
// })



// PLAIN OBJ
// Router.get('/special/Obj',(req,res) => {
//     con.query('SELECT * FROM vendorview', (err, result) => {
//         if(!err) {
//             Object.keys(result).forEach(function(key){
//                 var row = result[key];
//                 console.log(result.name)
//             })
//             res.send(result)
//         }
//         else{
//             throw err
//         }
//     })
// })


Router.post('/members', function (req, res) {
    var data  = req.body;
    con.query(`INSERT INTO vendorview SET ?`, data, function (error, results, fields) {
       if (error) {
        console.log(error,'Please Check your inputs');
       }
       res.json({
        message:'Sent Successfully!!',
        data:results
       });
     });
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
 
 

module.exports = Router