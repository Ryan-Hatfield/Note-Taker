//---Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");

//---Express App
var app = express();
var PORT = process.env.PORT || 3000;

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
//---Post a new note into the db.json with an id.
app.post("/api/notes", function(req, res) {
        let notes = JSON.parse(fs.readFileSync("db/db.json", "utf8"));
        let noteRequest = req.body;
        let newNoteId = notes.length + 1;
        let newNote = {
            id: newNoteId,
            title: noteRequest.title,
            text: noteRequest.text
        };
        notes.push(newNote);
        res.json(newNote);
        fs.writeFileSync("db/db.json", JSON.stringify(notes));
});
//---Delete a note out of the db.json
app.delete("/api/notes/:id", (req, res) => {
    const deleteId = req.params.id;
        let notes = JSON.parse(fs.readFileSync("db/db.json", "utf8"));
        if (deleteId <= notes.length) {
            res.json(notes.splice(deleteId-1,1));
            for (let i=0; i<notes.length; i++) {
                notes[i].id = i+1;
            }
            fs.writeFileSync("db/db.json", JSON.stringify(notes));
        } else {
            res.json(false);
        }
});