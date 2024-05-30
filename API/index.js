const dotenv = require('dotenv');
dotenv.config();

const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');

// Load configuration
const configPath = path.join(__dirname, 'config.yml');
const configFile = fs.readFileSync(configPath, 'utf8');
const config = yaml.load(configFile);
const environment = process.env.NODE_ENV || 'development';
const settings = config[environment];

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

// Define PORT
const PORT = process.env.PORT || 5000;

console.log('MongoDB URL:', process.env.MONGO_URL);
console.log('Stripe Key:', process.env.STRIPE_KEY);

// Connect to database
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('Connected to database!'))
  .catch((error) => {
    console.error('Database connection error:', error);
  });

app.use(express.json());

// Enable CORS for all responses
app.use(cors());

// Route middleware
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/carts', cartRoute);
app.use('/api/orders', orderRoute);
app.use('/api/checkout', stripeRoute);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('Server is healthy');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}!`);
});
