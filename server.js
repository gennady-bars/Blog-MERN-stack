const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// App config
const dev = process.env.NODE_ENV !== "production";
const config = require("./configs/config");
const port = process.env.PORT || config.PORT || 8000;
const app = express();

// MongoDB
mongoose
  .connect(
    config.mongoURL,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("MongoDB ready");
  })
  .catch(err => {
    console.log("MongoDB error", err);
  });

  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

// Static files
// app.use(express.static(__dirname + "/client/build"));

// Body and cookie parsers
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// Passport
app.use(passport.initialize());
require("./configs/passport")(passport);

// Routes
app.use("/api/posts", require("./routes/posts"));
app.use("/api/users", require("./routes/users"));

// Start server
if (dev) {
app.use(express.static(__dirname + "/public"));

  app.listen(port, () => {
    console.log(`Server started on ${port} port.`);
  });
} else {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')))

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });

  app.listen(port, () => {
    console.log(`Server started on ${port} port.`);
  });
}
