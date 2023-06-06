const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');
const productRoutes = require('./routes/products');
const userRoutes = require('./routes/users');

// databse connection
const mongoString =
  'mongodb+srv://basmilbhan:Everest8848@cluster0.6tcvr68.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
  console.log(error);
});

database.once('connected', () => {
  console.log('Database Connected');
});

// initilize server
const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
//Routes
app.use(userRoutes);
app.use(productRoutes);

app.listen(8000, () => {
  console.log(`Server Started at ${8000}`);
});
