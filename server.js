//---Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");

//---Express App
var app = express();
var PORT = 3000;

//---Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//---Server Listening
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  