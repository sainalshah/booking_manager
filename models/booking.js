//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var bookingSchema = new Schema({
  name: String,
  startTime: Date,
  endTime: Date,
  venue: String,
  attendees: {type: [Schema.ObjectId], ref: 'User'},
  group: {type: Schema.ObjectId, ref: 'Group'},
  active: Boolean,
  attachementPath: String,
  createdBy: String
});

// Compile model from schema
module.exports = mongoose.model('Booking', bookingSchema );
