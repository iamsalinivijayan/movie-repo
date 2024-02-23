// Importing the 'mongoose' library for MongoDB schema and model creation
const mongoose = require('mongoose');

// Defining a user schema using the 'mongoose.Schema' constructor
const userSchema = new mongoose.Schema({
  // 'email' field with type String, required, unique, and indexed for efficient queries
  email: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  // 'password' field with type String and required
  password: {
    type: String,
    required: true,
  },
  is_admin: {
    type: Boolean,
    default: false
  }
});

// Creating a 'User' model using the user schema
const User = mongoose.model('User', userSchema);

// Exporting the 'User' model to be used in other parts of the application
module.exports = User;
