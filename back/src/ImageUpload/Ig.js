const express = require("express");
const router = new express.Router();
const fileUpload = require('express-fileupload');
const cors = require('cors')



// middle ware
router.use(express.static('public')); //to access the files in public folder
router.use(cors()); // it enables all cors requests
router.use(fileUpload());

// file upload api
router.post('/upload', (req, res) => {

    if (!req.files) {
        return res.status(500).send({ msg: "file is not found" })
    }
        // accessing the file
    const myFile = req.files.file;

    //  mv() method places the file inside public directory
    myFile.mv(`${__dirname}/public/${myFile.name}`, function (err) {
        if (err) {
            console.log(err)
            return res.status(500).send({ msg: "Error occured" });
        }
        // returing the response with file path and name
        return res.send({name: myFile.name, path: `/${myFile.name}`});
    });
})


module.exports = router;