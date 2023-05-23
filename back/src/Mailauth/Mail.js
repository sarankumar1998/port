const express = require("express");
const router = new express.Router();
const nodemailer = require("nodemailer");

// send mail
router.post("/register", (req, res) => {
  console.log(req.body);

  const { email, text } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "saran07rose@gmail.com",
        pass: "pxfoftapwtgpdfya",
      },
    });

    const mailOptions = {
      from: "saran07rose@gmail.com",
      to: email,
      subject: "Here from saran!",
      html: `<h1 style={{color:'red'}}>Alert *</h1> <h3> You have to pay your fees this month before </h3> <p>${text}</p>`,
    };  

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error" + error);
      } else {
        console.log("Email sent:" + info.response);
        res.status(201).json({ status: 201, info });
      }
    });
  } catch (error) {
    console.log("Error" + error);
    res.status(401).json({ status: 401, error });
  }
});

module.exports = router;
