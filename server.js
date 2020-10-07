//---Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");

//---Express App
var app = express();
var PORT = 3000;

//---Express app to handle data parsing.
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//---Server Listening
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  
//--Routes to send user to the appropriate pages.
//--Index HTML
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});
//---Notes HTML
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});
//--db.json file
app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "db/db.json"));
});
