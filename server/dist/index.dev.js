"use strict";

var express = require("express");

var cors = require("cors");

var app = express();

var mysql = require("mysql");

var bodyParser = require("body-parser"); // middleware json and bodyparser for parsing input data


app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: true
})); // cors for linking 2 URLs 

app.use(cors({
  origin: 'http://localhost:3000'
})); // create mysql db connection

var db = mysql.createPool({
  user: "root",
  host: "localhost",
  password: "Password123",
  database: "likehome_data"
}); // get all hotel data

app.get('/get-hotels', function (req, res) {
  var sqlSearch = "SELECT * FROM Hotels";
  db.query(sqlSearch, function (err, result) {
    if (err) {
      console.log(err.message);
    } else {
      res.send(result);
    }
  });
}); // create user in db

app.post('/create-user', function (req, res) {
  db.query('INSERT INTO users (id, fname, lname, email, savedHotels, points) VALUES (?, ?, ?, ?, ?, ?)', [req.body.id, req.body.fname, req.body.lname, req.body.email, "", 0], function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.send("Insert Done");
    }
  });
}); // create reservation in db

app.post('/create-reservation', function (req, res) {
  db.query('INSERT INTO users (reserveid, userid, hotelid, reserveDateStart, reserveDateEnd, cancelFee) VALUES (?, ?, ?, ?, ?, ?)', [req.body.reserveid, req.body.userid, req.body.hotelid, req.body.reserveDateStart, req.body.reserveDateEnd, req.body.cancelFee], function (err, result) {
    if (err) {
      console.log(err);
    } else {
      res.send("Insert Done");
    }
  });
}); // get all reservations for user id 

app.get('/get-reservations', function (req, res) {
  db.query("SELECT * FROM reservations where userid=?", [req.body.userid], function (err, result) {
    if (err) {
      console.log(err.message);
    } else {
      res.send(result);
    }
  });
}); // get user by id

app.get('/get-user', function (req, res) {
  db.query("SELECT * FROM users where id=?", [req.body.id], function (err, result) {
    if (err) {
      console.log(err.message);
    } else {
      res.send(result);
    }
  });
}); // default server port 3001

app.listen(3001, function () {
  console.log("listening on 3001");
});