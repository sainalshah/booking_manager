//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var groupSchema = new Schema({
  name: {type: String, required: true },
  members: [{type: ObjectId, required: true, ref: 'User'}],
  createdBy: {type: ObjectId, required: true, ref: 'User'}
});

// Compile model from schema
module.exports = mongoose.model('Group', groupSchema );
