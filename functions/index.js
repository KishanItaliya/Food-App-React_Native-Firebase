const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const Razorpay = require('razorpay');
var crypto = require('crypto');
const axios = require('axios');

// API

// App - Config
const app = express();

// Middlewares
app.use(cors({origin: true}));
app.use(express.json());

const razorpay = new Razorpay({
  key_id: 'rzp_test_lJNW0nNIjTeBVi',
  key_secret: 'nNkUCVRZ4vUBQlVWsePVYIkM',
});

// API Routes
app.get('/', (request, response) => response.status(200).send('hello world'));

app.get('/kishan', (request, response) =>
  response.status(200).send('Kishan Italiya'),
);

app.post('/createOrder', async (request, response) => {
  //Create an order
  const order = await razorpay.orders.create({
    amount: request.body.amount,
    currency: request.body.currency,
  });
  response.send(order);
});

app.post('/verifyPayment', async (request, response) => {
  //Verify Payment
  const {orderID, transaction} = request.body;

  const generatedSignature = await crypto
    .createHmac('sha256', 'nNkUCVRZ4vUBQlVWsePVYIkM')
    .update(`${orderID}|${transaction.razorpay_payment_id}`)
    .digest('hex');

  response.status(404).send({
    validSignature: generatedSignature === transaction.razorpay_signature,
  });
});

app.post('/reviewStatus', async (request, response) => {
  var status;
  const {review} = request.body;
  const reviewStatus = await axios
    .post('http://ec2-13-127-176-96.ap-south-1.compute.amazonaws.com/predict', {
      review: review,
    })
    .then(response => {
      status = response.data;
      return status;
    })
    .catch(error => {
      console.warn(error);
      return error;
    });
  response.status(200).send(reviewStatus);
});

// Listen - Command
exports.api = functions.https.onRequest(app);

// http://localhost:5001/food-review-308615/us-central1/api

// https://us-central1-food-review-308615.cloudfunctions.net/api
