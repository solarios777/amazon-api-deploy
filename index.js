
const express = require("express");
const cors = require("cors");
require("dotenv").config()
const stripe = require("stripe")(process.env.VITE_STRIPE_SECRET_KEY);

const port=3000
const app = express();
app.use(cors({ origin: true }));

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "success" });
});

app.post("/payment/create", async (req, res) => {
  const total = req.query.total;
  if (total > 0) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });
    console.log(paymentIntent);
    res.status(201).json({
      clientSecret: paymentIntent.client_secret,
    });
  } else {
    res.status(403).json({
      message: "the total must be >0",
    });
  }
});

app.listen(port, (err) => {
    if (err) throw err
    console.log(`amazon server is running on port:${port} http://localhost:${port}`);
})


