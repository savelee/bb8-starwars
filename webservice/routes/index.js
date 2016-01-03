var express = require('express');
var router = express.Router();
var DroidHelper = require('../bin/bb8.js');
var bb8 = null

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/connect', function(req, res, next) {
  console.log("Connect BB-8");
  bb8 = new DroidHelper();
  bb8.connect(req, res, next);
});
router.get('/disconnect', function(req, res, next) {
  console.log("Disconnect BB-8");
  bb8.disconnect(req, res, next);
});

router.get('/roll', function(req, res, next) {
  console.log("Roll BB-8, without speed and direction");
  if(bb8) {
    bb8.roll(req, res);
  } else {
    res.set('Content-Type', 'application/javascript');
    res.jsonp({
      "success": true,
      "connected": false
    });
  }
});
router.get('/roll/:speed', function(req, res){
  console.log("Roll BB-8, with speed");
  if(bb8) {
    bb8.roll(req, res);
  } else {
    res.set('Content-Type', 'application/javascript');
    res.jsonp({
      "success": true,
      "connected": false
    });
  }
});
router.get('/roll/:speed/:direction', function(req, res){
  console.log("Roll BB-8, with speed and direction");
  if(bb8) {
    bb8.roll(req, res);
  } else {
    res.set('Content-Type', 'application/javascript');
    res.jsonp({
      "success": true,
      "connected": false
    });
  }
});

//TODO
router.get('/color', function(req, res, next) {
  console.log("Color BB-8");
  res.render('index', { title: 'Color BB-8' });
});

module.exports = router;
