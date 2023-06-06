const mongoose = require('mongoose');
const { isEmail } = require('validator');
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    validate: {
      validator: (value) => {
        return value.length > 1;
      },
      message: (props) => `${props.value} is not a valid name`,
    }
  },
  username: {
    type: String,
    required: [true, 'User Name is required'],
    validate: {
      validator: (value) => {
        return value.length >= 5;
      },
      message: () => 'Username must be at least six characters long',
    }
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    validate: {
      validator: isEmail,
      message: (props) => `${props.value} is not a valid email`,
    },
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    validate: {
      validator: (value) => {
        return value.length >= 6;
      },
      message: () => 'Password must be at least six characters long',
    },
  },
});
module.exports = mongoose.model('User', userSchema);
