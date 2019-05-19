//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var groupSchema = new Schema({
  name: String,
  members: [ObjectId],
  createdBy: String
});

// Compile model from schema
module.exports = mongoose.model('Group', groupSchema );
