const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const itemRoutes = require('./routes/itemRoutes');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const app = express();
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.2jq9btq.mongodb.net/`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
mongoose.connect(uri).then(() =>{
    console.log("connection successful");
}).catch((err)=>{console.log("connection error");})


// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Set up view engine
app.set('view engine', 'ejs');

// Routes
app.use('/', itemRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});