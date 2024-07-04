var express = require("express");
var todocontroller = require("./controllers/todocontroller");

var app = express();

app.use(express.static("./public"));

// set up template engine
app.set("view engine", "ejs");

// fire controller function
todocontroller(app);

// Listen to port
app.listen(80);

console.log("You are listening to port 80...");