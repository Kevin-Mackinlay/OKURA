const { error } = require('console');
const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://ecommerce:3dTVWUMI2NgEwdzT@ecommerce.osbcjez.mongodb.net/').then(()=> 
    console.log("Connected to database!")).catch((error) => console.log(error));





app.listen(5000, () => {
    console.log("Backend server is running!");
});