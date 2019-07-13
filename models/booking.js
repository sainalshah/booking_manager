//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var bookingSchema = new Schema({
  name: {type: String, required: true },
  startTime: {type: Date, required: true },
  endTime: {type: Date, required: true },
  venue: {type: String, required: true },
  attendees: [{type: Schema.ObjectId, required: true, ref: 'User'}],
  group: {type: Schema.ObjectId, required: true, ref: 'Group'},
  active: {type: Boolean, required: true},
  attachementPath: String,
  createdBy: {type: Schema.ObjectId, required: true, ref: 'User'}
});

// Compile model from schema
module.exports = mongoose.model('Booking', bookingSchema );
