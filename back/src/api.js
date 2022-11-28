const express = require('express')
const Router = express.Router();
const con = require('./db')

Router.get('/special',(req,res) => {
    con.query('SELECT * FROM vendorview', (err, rows) => {
        if(!err) {
            res.send(rows)
        
        
        }
        else{
            throw err
        }
    })
})

// Router.get('/special',(req,res) => {
//     con.query("SELECT * FROM vendorview", (err, rows) => {
//         if(!err) {
//            res.send(Object.values(JSON.parse(JSON.stringify(rows))))
//            console.log(rows);
   
//         }
//         else{
//             throw err
//         }
//     })
// })


// Router.get('/special',(req,res) => {
//     con.query("SELECT * FROM vendorview", (err, result) => {
//         if(!err) {
//            res.send(Object.keys(result).forEach(function(key) {
//             var row = JSON.parse(JSON.stringify(result[key]));
//             console.log(row.name)
//             // if want selective row console.log(row.name)
//             // 
//           }))
   
//         }
//         else{
//             throw err
//         }
//     })
// })
 
Router.post('/members', function (req, res) {
    var data  = req.body;
    // console.log(params);
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



   
Router.put('/members/update', function (req, res) {
    var data  = req.params.id;
    con.query(`UPDATE vendorview SET id='' `, data, function (error, results, fields) {
       if (error) {
        console.log(error,'Please Check your inputs');
       }
       res.json({
        message:'Sent Successfully!!',
        data:results
       });
     });
 });
  

 

module.exports = Router