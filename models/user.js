//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var userSchema = new Schema({
  authToken: {type: String, required: true },
  email: {
    type: String,
    unique: true, required: true 
  },
  providerId: {type: String, required: true },
  lastName: {type: String, required: true },
  firstName: {type: String, required: true },
  photoUrl: {type: String, required: true },
  provider: {type: String, required: true }
});

// Compile model from schema
module.exports = mongoose.model('User', userSchema );
