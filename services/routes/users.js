var express = require('express');
var router = express.Router();

var User = require('../models/user');
var logger = require('../LogsUtil').getLogger('userRouter');

/* GET users listing. */
router.get('/', function(req, res, next) {
  logger.debug('getting user details',req.query.email );
  User
  .find({ email : req.query.email }, 
  {
    authToken: 0, providerId: 0, provider: 0
  })
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
router.get('/all', function(req, res, next) {
  User
  .find({}, 
  {
    authToken: 0, providerId: 0, provider: 0
  })
  .exec(function (err, users) {
    if (err){
      logger.debug("error getting user", err);
      res.json({msg : "error"});
    } else {
      res.json(users);
    }
  });
});

router.post('/', function(req, res, next) {
  logger.debug("registering user", req.body)
  req.body.providerId = req.body.id;
  var newUser = new User(req.body);
  newUser.save(function (err, userObj) {
    if (err) {
      logger.error(err);
      //if user exists
      if(err.code == 11000){
        logger.debug('user exists',req.body.email );
        User
        .findOne({ email : req.body.email })
        .exec(function (err, user) {
          if (err){
            logger.debug("error getting user", err);
            res.json({msg : "error"});
          } else {
            logger.debug("returning user", user);
            res.json(user);
          }
        });
      } else {
        logger.debug("error saving user", err);
        res.json({msg : "error"});
      }
    } else {
      logger.debug("new user saved", req.body.email );
      res.json(userObj);
    }
  });
});

module.exports = router;
