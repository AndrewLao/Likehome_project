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

app.get('/user', (req, res) => {
    const email = req.query.email;

    db.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
        if (err) {
            res.status(400).send({})
        } else {
            if (result.length === 0) {
                return res.status(204).send({ message: 'User not found' });
            }
            res.send({ ...result[0] });
        }
    })
});

// create reservation in db
app.post("/create-reservation", (req, res) => {
  const userid = req.body.params.userid;
  const hotelid = req.body.params.hotelid;
  const startDate = req.body.params.reserveDateStart.substring(0,10);
  const endDate = req.body.params.reserveDateEnd.substring(0,10);
  const guests = req.body.params.guests;
  const total = req.body.params.total;
  const fee = req.body.params.fee;

  let query = "INSERT INTO reservations (userid, hotelid, reserveDateStart, reserveDateEnd, guests, totalprice, cancelFee) VALUES (?, ?, DATE ?,DATE ?, ?, ?, ?)";
  db.query(
    query, [userid, hotelid, startDate, endDate, guests, total, fee], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Insert Done");
      }
    }
  );
});

// check for multiple reservations under the same date
app.get("/multiple-reservation-check", (req, res) => {
  
  let start = req.query.startDate.substring(0,10);
  let end = req.query.endDate.substring(0,10);
  const query = "SELECT * FROM Reservations where userid='" + req.query.id + "' AND (('" + 
  start + "' < reserveDateStart and '" + end + 
  "' >reserveDateStart) OR ('" + start + "' >= reserveDateStart and '" + start + "'< reserveDateEnd))"; 
     //if start date is between reservation start AND end date is after reserve start, conflict
     //if startdate is == or > reserve start date AND it is before the reserve end date, between conflict.
  //((startDate < reserveStartDate AND endDate > reserveStartDate) OR (startDate >= reserveStartDate AND startDate < reserveEndDate))
  db.query(query, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
        console.log(result);
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

// update date of reservation
app.put("/update-reservation", (req, res) => {
  const startDate = req.body.params.reserveDateStart.substring(0,10);
  const endDate = req.body.params.reserveDateEnd.substring(0,10);
  const reserveid = req.body.params.reserverid;
  const sqlUpdate = "UPDATE reservations SET reserveDateStart=DATE '" + startDate + "', reserveDateEnd='" + endDate + "' WHERE reserveid=" + reserveid; 
  db.query(
    sqlUpdate, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        res.send(results);
      }
    }
  );
});

// add points
app.put("/point-add", cors(), async (req, res) => {
  const sqlUpdate = "UPDATE users SET points = points + " + req.body.params.points + " WHERE id='" + req.body.params.userid + "'";
  db.query(
    sqlUpdate, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        res.send(results);
      }
    }
  );

});

// create new customer for stripe
app.post("/customer", async (req, res) => {
  
  const customer = await stripe.customers.create({
    name: req.body.fullname,
  });
  return res.send({ customer_id: customer.id });
});

// handle point payments
app.put("/point-payment", cors(), async (req, res) => {
  const sqlUpdate = "UPDATE users SET points = points - " + req.body.params.points + " WHERE id='" + req.body.params.userid + "'";
  db.query(
    sqlUpdate, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        res.send(results);
      }
    }
  );

});

app.post("/payment", cors(), async (req, res) => {
  let amount = req.body.amount;
  let customer_id = req.body.customer_id;

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
