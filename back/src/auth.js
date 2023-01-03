const express = require("express");
const con = require("./db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// let pwd = bcrypt.hashSync('12345',6)
// console.log(pwd);

const router = express.Router();

router.post("/register", async (req, res) => {
  
  //CHECK USER IF EXISTS
  const alreadyUser = "SELECT * FROM users WHERE username = ?";

  con.query(alreadyUser, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exists!");

    //CREATE A NEW USER
    //Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const newUser =
      "INSERT INTO users (`username`,`email`,`password`,`name`) VALUE (?)";

    const values = [
      req.body.username,
      req.body.email,
      hashedPassword, 
      req.body.name,
    ];

    con.query(newUser, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User has been created.");
    });
  });
});

router.post("/login", async (req, res) => {

  const userLogin = "SELECT * FROM users WHERE username = ?";
  con.query(userLogin, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    const checkPassword = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!checkPassword)
      return res.status(400).json("Wrong password or username!");
    const token = jwt.sign({ id: data[0].id }, "secretkey");

    const { password, ...others } = data[0];
    res.cookie("accessToken", token, {httpOnly: true})
      .status(200)
      .json(...data);
  });
});



//  const logout = (req, res) => {
//   res.clearCookie("accessToken",{
//     secure:true,
//     sameSite:"none"
//   }).status(200).json("User has been logged out.")
// };


module.exports = router;