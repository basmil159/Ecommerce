const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// server end-point/api
// router
router.post('/sign-up', async (req, res) => {
    try {
      // Extract email and password from the req.body object
      const { name, username, email, password } = req.body;
  
      // Check if the email is already in use
      let userExists = await User.findOne({ email });
      let userExists2 = await User.findOne({ username });
  
     
  
      if (userExists2) {
        return res.status(401).json({ message: 'Username is already in use.' });
      }
  
      if (userExists) {
        return res.status(401).json({ message: 'Email is already in use.' });
      }
  
      if (password.length <= 6) {
        return res
          .status(401)
          .json({ message: 'Password must be more than 6 character long.' });
      }
  
      // Define salt rounds
      const saltRounds = 10;
  
      // Hash password
      bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) throw new Error('Internal Server Error');
  
        // Create a new user
        let user = new User({
          name,
          username,
          email,
          password: hash,
        });
  
        // Save user to database
        user.save().then(() => {
          res.json({ message: 'User created successfully', user });
        });
      });
    } catch (err) {
      return res.status(401).send(err.message);
    }
  });
  
  // sign in
  router.post('/sign-in', async (req, res) => {
    try {
      // Extract email and password from the req.body object
      const { email, password } = req.body;
  
      // Check if user exists in database
      let user = await User.findOne({ email });
  
      if (!user) {
        return res.status(401).json({ message: 'Invalid Credentials' });
      }
  
      // Compare passwords
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          return res.status(200).json({ message: 'User Logged in Successfully' });
        }
  
        console.log(err);
        return res.status(401).json({ message: 'Invalid Credentials' });
      });
    } catch (error) {
      res.status(401).json({message:'Somthing went wrong'});
    }
  });
  
module.exports = router;  