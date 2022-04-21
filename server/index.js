const express = require("express");
const cors = require("cors");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");

// middleware
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors(
    {
        origin: 'http://localhost:3000'
    }
));

// create mysql db connection
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
            console.log(err.message);
        }else {
            res.send(result);
        }
    });
})

// create user in db
app.post('/create-user', (req, res) => {
    db.query('INSERT INTO users (id, fname, lname, email, savedHotels, points) VALUES (?, ?, ?, ?, ?, ?)', 
        [req.body.id, req.body.fname, req.body.lname, req.body.email, "", 0], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Insert Done");
            }
        }
    )
});

// create reservation in db
app.post('/create-reservation', (req, res) => {
    db.query('INSERT INTO users (reserveid, userid, hotelid, reserveDateStart, reserveDateEnd, cancelFee) VALUES (?, ?, ?, ?, ?, ?)', 
        [req.body.reserveid, req.body.userid, req.body.hotelid, req.body.reserveDateStart, req.body.reserveDateEnd, req.body.cancelFee], 
        
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("Insert Done");
            }
        }
    )
});

// get all reservations for user id 
app.get('/get-reservations', (req, res) => {
    db.query("SELECT * FROM reservations where userid=?", [req.body.userid], 
    (err, result) => {
        if (err) {
            console.log(err.message);
        }else {
            res.send(result);
        }
    });
})

// get user by id
app.get('/get-user', (req, res) => {
    db.query("SELECT * FROM users where id=?", [req.body.id], 
    (err, result) => {
        if (err) {
            console.log(err.message);
        }else {
            res.send(result);
        }
    });
})

app.listen(3001, () =>{
    console.log("listening on 3001");
});



