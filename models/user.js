//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var userSchema = new Schema({
  authToken: String,
  email: {
    type: String,
    unique: true,
  },
  providerId: String,
  lastName: String,
  firstName: String,
  photoUrl: String,
  provider: String
});

// Compile model from schema
module.exports = mongoose.model('User', userSchema );
