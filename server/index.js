require("dotenv").config({ path: __dirname + '/.env' });
const express = require("express");
const cors = require("cors");
const app = express();
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
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
})

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
});

app.post('/customer', async (req, res) => {
    const customer = await stripe.customers.create({
        name: 'John Doe',
    })
    return res.send({ customer_id: customer.id });
});

app.post("/payment", cors(), async (req, res) => {
	let { amount, customer_id } = req.body;

	try {
		const payment = await stripe.paymentIntents.create({
			amount,
			currency: "USD",
			description: "LikeHome",
            customer: customer_id,
            // payment_method: id,
			// confirm: true
		})
		console.log("Payment", payment)
		res.json({
            clientSecret: payment.client_secret,
			message: "Payment successful",
			success: true
		})
	} catch (error) {
		console.log("Error", error)
		res.json({
			message: "Payment failed",
			success: false
		})
	}
})

app.post("/point-payment", cors(), async (req, res) => {
	let { email } = req.body;

    console.log(email);

	try {
        db.query(
            "SELECT * FROM users where email=?",
            [email], 
            (err, result) => {
                const points = result[0].points;
                const newBalance = points - 10;

                if (newBalance < 0) {
                    return res.status(400).send({
                        message: "You do not have enough points",
                        success: false
                    });
                }

                db.query(
                    "UPDATE users SET points = ? where email=?",
                    [newBalance, email], 
                    (err, result) => {
                        console.log(err, result);
                        res.json({
                            message: "Payment successful",
                            success: true
                        })
                    });
            });
	} catch (error) {
		console.log("Error", error)
		res.json({
			message: "Payment failed",
			success: false
		})
	}
})

app.listen(3001, () =>{
    console.log("listening on 3001");
});



