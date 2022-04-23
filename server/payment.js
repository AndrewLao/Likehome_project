require("dotenv").config({ path: __dirname + '/.env' })
const express = require("express")
const app = express()
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST)
const bodyParser = require("body-parser")
const cors = require("cors")
const { v4 } = require('uuid');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors())

app.post('/customer', async (req, res) => {
    const customer = await stripe.customers.create({
        name: 'John Doe',
    })
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

app.listen(process.env.PORT || 4000, () => {
	console.log("Sever is working")
})