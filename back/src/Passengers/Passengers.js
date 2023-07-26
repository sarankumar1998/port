const express = require("express");
const Router = express.Router();
const con = require("../db");



Router.get('/persons', (req, res) => {
    const query = 'SELECT * FROM passengers';
    con.query(query, (err, result) => {
      if (err) throw err;
      console.log('Retrieved persons from the DB:', result);
      res.send(result);
    });
  });

  // Delete a person from the database by ID
Router.delete('/persons/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM passengers WHERE id = ?';
    con.query(sql, id, (err, result) => {
      if (err) throw err;
      console.log('Person deleted from the DB:', result);
      res.send(result);
    });
  });

Router.post("/pass", function (req, res) {
    var name = req.body.name
    var age = req.body.age

    var query = `INSERT INTO passengers (name, age) VALUES ("${name}", "${age}")`

    // Run the query
    con.query(query, function (error, data) {
        console.log(data);
        if (error) {
            console.log(error);
            return res.status(500).json(error);
        } else {
            res.status(200).json("Sent successfully");
        }
    });
});
module.exports = Router;