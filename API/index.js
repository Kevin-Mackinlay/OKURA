const dotenv = require('dotenv');
dotenv.config();


const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');

// Load configuration
const configPath = path.join(__dirname, 'config.yml');
const configFile = fs.readFileSync(configPath, 'utf8');
const config = yaml.load(configFile);

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

// Connect to database

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('DB Connection Successfull!'))
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use(cors());

// Route middleware
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/carts', cartRoute);
app.use('/api/orders', orderRoute);
app.use('/api/checkout', stripeRoute);


app.listen(process.env.PORT || 5000, () => {
  console.log('Backend server is running!');
});

module.exports = app;
