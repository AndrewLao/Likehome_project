require("dotenv").config({ path: __dirname + "/.env" });
const express = require("express");
const cors = require("cors");
const app = express();
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
const mysql = require("mysql");
const bodyParser = require("body-parser");

// middleware json and bodyparser for parsing input data
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// cors for linking 2 URLs
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// create mysql db connection
const db = mysql.createPool({
  user: "root",
  host: "localhost",
  password: "Password123",
  database: "likehome_data",
});

// get all hotel data
app.get("/get-hotels", (req, res) => {
  const sqlSearch = "SELECT * FROM Hotels";
  db.query(sqlSearch, (err, result) => {
    if (err) {
      console.log(err.message);
    } else {
      res.send(result);
    }
  });
});

// create user in db
app.post("/create-user", (req, res) => {
  db.query(
    "INSERT INTO users (id, fname, lname, email, savedHotels, points) VALUES (?, ?, ?, ?, ?, ?)",
    [req.body.id, req.body.fname, req.body.lname, req.body.email, "", 0],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Insert Done");
      }
    }
  );
});

// create reservation in db
app.post("/create-reservation", (req, res) => {
  db.query(
    "INSERT INTO users (reserveid, userid, hotelid, reserveDateStart, reserveDateEnd, guests, totalprice, cancelFee) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [
      req.body.reserveid,
      req.body.userid,
      req.body.hotelid,
      req.body.reserveDateStart,
      req.body.reserveDateEnd,
      req.body.guests,
      req.body.totalprice,
      req.body.cancelFee,
    ],

    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Insert Done");
      }
    }
  );
});

// get all reservations for user id
app.get("/get-reservations", (req, res) => {
  const query =
    "SELECT * FROM reservations where userid='" + req.query.id + "'";
  db.query(query, (err, result) => {
    if (err) {
      console.log(err.message);
    } else {
      res.send(result);
    }
  });
});

// get user by id
app.get("/get-user", (req, res) => {
  const query = "SELECT * FROM users where id='" + req.query.id + "'";
  db.query(query, (err, result) => {
    if (err) {
      console.log(err.message);
    } else {
      res.send(result);
    }
  });
});

// filters here
app.get("/get-hotels-filtered", (req, res) => {
  const query = "SELECT * FROM hotels where " + req.query.where;
  db.query(query, (err, result) => {
    if (err) {
      console.log(err.message);
    } else {
      res.send(result);
    }
  });
});

app.post("/customer", async (req, res) => {
  const customer = await stripe.customers.create({
    name: "John Doe",
  });
  return res.send({ customer_id: customer.id });
});

app.post("/payment", cors(), async (req, res) => {
  let { amount, customer_id } = req.body;

  console.log(amount);
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "LikeHome",
      customer: customer_id,
      // payment_method: id,
      // confirm: true
    });
    console.log("Payment", payment);
    res.json({
      clientSecret: payment.client_secret,
      message: "Payment successful",
      success: true,
    });
  } catch (error) {
    console.log("Error", error);
    res.json({
      message: "Payment failed",
      success: false,
    });
  }
});

// default server port 3001
app.listen(3001, () => {
  console.log("listening on 3001");
});
