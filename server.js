let db = require("./db/db.json");
const express = require("express");
const path = require("path")
const shortid = require('shortid');
const app = express();
const PORT = process.env.PORT || 3000;
const fs = require('fs')



// console.log (db)

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());


app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));

app.get('/api/notes', (req, res) => res.json(db))

app.post('/api/notes', (req, res) => {
    console.log(req.body)
    let note = {
        title: req.body.title,
        text: req.body.text,
        id: shortid.generate()
    }
    console.log(note)
    db.push(note)
    console.log(db)
    fs.writeFile('./db/db.json', JSON.stringify (db), err => {
        if (err) {
          console.error(err)
          return
        }
        res.json(db)
    })
})



app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});