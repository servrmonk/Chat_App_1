const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

const UserRoute = require("./src/routes/userRoutes");

const app = express();

// app.use(cors()); 
app.use(
  cors({
    origin:"*", //for any allow origin 
    // methods:["GET","POST"]
    // credentials:true
  })
)
// app.use(
//   cors({
//     origin:"https://127.0.0.1:5501"
//   })
// )
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(compression());

// for logging
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

app.use("/api/user", UserRoute);

app.use(morgan("combined", { stream: accessLogStream }));

module.exports = app;
