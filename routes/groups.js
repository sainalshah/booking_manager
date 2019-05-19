var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var Group = require('../models/group');
var logger = require('../LogsUtil').getLogger('groupRouter');

/* GET groups listing for a particular user. */
router.get('/', function(req, res, next) {
  logger.debug('getting groups for group',req.body.userId );
  Group
  .find({
    'members': { $in: [
      mongoose.Types.ObjectId(req.body.userId)
    ]}
  })
  .exec(function (err, groups) {
    if (err){
      logger.debug("error getting group", err);
      res.json({msg : "error"});
    } else {
      res.json({groups: groups});
    }
  });
});


router.post('/', function(req, res, next) {
  logger.debug("adding group", req.body);
  var newGroup = new Group(req.body);
  newGroup.save(function (err) {
    if (err) {
      logger.debug("error saving group", err);
      res.json({msg : "error"});
    } else {
      logger.debug("new group saved");
      res.json({msg : "success"});
    }
  });
});

module.exports = router;
