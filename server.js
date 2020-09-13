// need express to interact with the front end
const express = require("express");
// need path for filename paths
const path = require("path");
// need fs to read and write to files
const fs = require("fs");
let db = require("./db/db.json")
const shortid = require('shortid');


// creating an "express" server
const app = express();
// Sets an Initial port for listeners
const PORT = process.env.PORT || 1602;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));




app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
  });

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });

app.get("/api/notes", function(req, res) {
  res.json(db);
});

app.post("/api/notes", function (req, res) {
  var newNote = {
    id: shortid.generate(),
    title: req.body.title,
    text: req.body.text,
  };

  db.push(newNote);
  fs.writeFileSync(path.join (__dirname, "./db/db.json"), JSON.stringify(db));
  res.json(db);
});

app.delete("/api/notes/:id", function(req, res) {
  db = db.filter((note) => note.id !== req.params.id);
  console.log(db);

  fs.writeFile(path.join (__dirname, "./db/db.json"), JSON.stringify(db), function (err) {
    if (err)throw err;
    res.sendStatus(200);
  });
});


app.listen(PORT, () => console.log("Listening on: " + PORT));
console.log(shortid.generate());