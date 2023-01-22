const express = require("express");
const Router = express.Router();
const con = require("./db");

// getall
Router.get("/getsports/", function (req, res) {
  con.query(
    // "SELECT * " +
    //   "FROM `slot` " +
    //   " INNER JOIN `address` ON `slot`.`id` = `address`.`slot_fk` INNER JOIN `sportsmain` ON `sportsmain`.`id` = `address`.`sportmainId`  ",

    "SELECT * " +
      "FROM `mainslots` " +
      " INNER JOIN `address` ON `mainslots`.`zoneId` = `address`.`mainslotId` INNER JOIN `slot` ON `slot`.`id` = `address`.`slot_fk`   INNER JOIN `sportsmain` ON `sportsmain`.`id` = `address`.`sportmainId`  ",

    function (error, results) {
      if (error) throw error;
      return res.send(results);
    }
  );
});






module.exports = Router;
