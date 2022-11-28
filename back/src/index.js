var express = require ('express')
const bodyParser = require('body-parser')
const PeopleRouter = require('./api')
const cors = require('cors');

var app = express()
app.use(cors());                    
app.use(bodyParser.json())
app.use('/api/v1',PeopleRouter)

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server started on port ${port}`));