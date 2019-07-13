var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var Booking = require('../models/booking');
var logger = require('../LogsUtil').getLogger('bookingRouter');

/* GET bookings listing for a particular group. */
router.get('/', function(req, res, next) {
  logger.debug('getting bookings for group',req.query.groupId );
  Booking
  .find({
    'group': { $in: [
      mongoose.Types.ObjectId(req.query.groupId)
    ]}
  })
  .populate('createdBy')
  .populate('attendees')
  .exec(function (err, bookings) {
    if (err){
      logger.debug("error getting booking", err);
      res.json({msg : "error"});
    } else {
      logger.debug("returning bookings", bookings);
      res.json(bookings);
    }
  });
});


router.post('/', function(req, res, next) {
  logger.debug("adding booking", req.body);
  var newBooking = new Booking(req.body);
  newBooking.attendees = req.body.attendeeList;
  newBooking.active = true;
  newBooking.save(function (err) {
    if (err) {
      logger.debug("error saving booking", err);
      res.json({msg : "error"});
    } else {
      logger.debug("new booking saved");
      res.json({msg : "success"});
    }
  });
});


router.put('/', function(req, res, next) {
  logger.debug("updating booking", req.body)
  Booking.findOneAndUpdate({_id: req.body._id},{$set:req.body},{new:true})
  .then((booking)=>{
    if(booking) {
      logger.debug("booking updated");
      res.json({msg : "success"});
    } else {
      logger.debug("no such booking");
      res.json({msg : "error"});
    }
  })
});

module.exports = router;
