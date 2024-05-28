const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');
const stripeRoute = require('./routes/stripe');


console.log('MongoDB URL:', process.env.MONGO_URL);
console.log('Stripe Key:', process.env.STRIPE_KEY);

//Connect to database
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('Connected to database!'))
  .catch((error) => {
    console.log(error);
  });

app.use(express.json());

// Enable CORS for all responses
app.use(cors());

//Route middleware
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/carts', cartRoute);
app.use('/api/orders', orderRoute);
app.use('/api/checkout', stripeRoute);


//start server
app.listen(process.env.PORT || 5000, () => {
  console.log('Backend server is running!');
});
