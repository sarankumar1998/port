const express = require("express");
const con = require("./db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var moment = require("moment");
const file = require("./dumm.json")
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
      "INSERT INTO users (`email`,`username`,`password`,`firstName`,`lastName`,`address`,`country`,`mobile`, createdOn) VALUE (?)";

    const values = [
      req.body.email,
      req.body.username,
      hashedPassword,
      // req.body.password,
      req.body.firstName,
      req.body.lastName,
      req.body.address,
      req.body.country,
      // req.body.role,
      req.body.mobile,
      (req.body.createdOn = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")),
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
    console.log(data,"datas");

    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");
    let user = data[0]
    // below command is hashing the password
    const checkPassword = bcrypt.compareSync(req.body.password,user.password);

    // const checkPassword = (req.body.password, user.password);
    if (!checkPassword) return res.status(400).json("Wrong password or username!");
    delete user.password
    const token = jwt.sign({ id: user.id }, "secretkey",  { expiresIn: "1200s" });
    user.token = token
    res
      // .cookie("accessToken", token, { httpOnly: true })
      .status(200)
      .json(...data, ...token);
  });
});

function checkToken(req, res, next){
  let token = req.headers["authorization"]
  token = token.replace("Bearer ", "")
  console.log(token)
  if(token){
    jwt.verify(token, "secretkey", (err, decoded) => {
      if(err){
        res.status(401).send({message:'access denied'})
        return;
      }
      req.id = decoded.id
      next();
    })
  }  else {
    res.sendStatus(401); // Unauthorized
  }
}


router.get("/detail",checkToken,(req,res)=>{
  const fil = file.filter((e) => e.id === req.id)
  res.status(200).send({fil:fil})
})
// router.get('/detail', checkToken, (req, res) => {
//   res.json({ message: 'Protected route accessed successfully' });
// });



router.put("/profile/update/:id", (req, res) => {
  // ID via params
  var { id } = req.params;

  // req body
  var { email } = req.body;
  var { username } = req.body;
  var { firstName } = req.body;
  var { lastName } = req.body;
  var { address } = req.body;
  var { country } = req.body;
  var { mobile } = req.body;
// var createdOn = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")(req.body)

  // Query
  var query = `UPDATE users SET email='${email}', username='${username}' ,firstName='${firstName}' ,lastName='${lastName}' ,address='${address}',country='${country}',mobile='${mobile}' WHERE id=${id}`;

  // Run the query
  con.query(query, function (error, data) {
    if (error) {
      console.log(error);
      return res.status(500).json(error);
    } else {
      res.status(200).json({message:'update done'})
    }
  });
});

//  const logout = (req, res) => {
//   res.clearCookie("accessToken",{
//     secure:true,
//     sameSite:"none"
//   }).status(200).json("User has been logged out.")
// };

module.exports = router;
