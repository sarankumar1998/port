var express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const PeopleRouter = require("./api");
const autho = require("./auth");
const sports = require("./sportsApi");
const mail = require("./Mailauth/Mail");
const order = require("./Payment/Payment");
const image = require("./ImageUpload/imageUpload");
const cors = require("cors");

var app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use("/api/v1", PeopleRouter);
app.use("/api/v2", autho);
app.use("/api/v3", sports);
app.use("/api/v4", mail);
app.use("/api/v5", order);
app.use("/api/v6", image);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(cookieParser());

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server started on port ${port}`));
