const express = require("express");
const cors = require("cors");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors(
    {
        origin: 'http://localhost:3000'
    }
));

const db = mysql.createPool({
    user: "root",
    host: "localhost",
    password: "Password123",
    database: "likehome_data"
});

// get all hotel data
app.get('/get-hotels', (req, res) => {
    const sqlSearch = "SELECT * FROM Hotels";
    db.query(sqlSearch, (err, result) => {
        if (err) {
            res.send("Error: " + err.message);
        }else {
            res.send(result);
        }
    });
})

app.post('/create-user', (req, res) => {
    db.query('INSERT INTO users (id, fname, lname, email, savedHotels, points) VALUES (?, ?, ?, ?, ?, ?)', 
        [req.id, req.fname, req.lname, req.email, "", 0], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Insert Done");
            }
        }
    )
});


app.listen(3001, () =>{
    console.log("listening on 3001");
});



