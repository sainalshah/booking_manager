var express = require('express');
var router = express.Router();

var User = require('../models/user');
var logger = require('../LogsUtil').getLogger('userRouter');

/* GET users listing. */
router.get('/', function(req, res, next) {
  logger.debug('getting user details',req.body.email );
  User
  .find({ email : req.body.email })
  .exec(function (err, user) {
    if (err){
      logger.debug("error getting user", err);
      res.json({msg : "error"});
    } else {
      res.json({user: user});
    }
  });
});

/* GET users listing. */
router.post('/', function(req, res, next) {
  logger.debug("registering user", req.body)
  req.body.providerId = req.body.id;
  var newUser = new User(req.body);
  newUser.save(function (err) {
    if (err) {
      logger.debug("error saving user", err);
      res.json({msg : "error"});
    } else {
      logger.debug("new user saved", req.body.email );
      res.json({msg : "success"});
    }
  });
});

module.exports = router;
