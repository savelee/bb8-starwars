/* Copyright 2015 Lee Boonstra
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */

"use strict";

var dotenv = require('dotenv'),
  sphero = require('sphero');

/*
 * The BB-8 class uses Sphero JS SDK
 * and Express, for communication with BB-8 droid.
 *
 *     @example
 *     //TODO
 */
function DroidHelper() {
	//dotenv.load();
	var me = this;
  me.bb8 = sphero('68da9181e0c444b28a4a8bb854ea219f'); //TODO use ENV
  me.speed = 10;
  me.direction = 0;
};

/**
 * Connect BB-8
 * @param {Express Request} request
 * @param {Express Response} response
 */
DroidHelper.prototype.connect = function(req, res, next){
  var me = this,
  result = new Object();

  res.set('Content-Type', 'application/javascript');
  me.bb8.connect(function() {

    //show tail light to figure out where BB-8 is heading
    me.bb8.startCalibration();
    setTimeout(function() {
      me.bb8.finishCalibration();
    }, 1000);

    result.success = true;
    me.getBluetoothPromise().then(function (data) {
        result['bluetooth'] = data;
        return me.getPowerStatePromise();
    }).then(function (data) {

        if(data.batteryVoltage < 200) {
          //warning, empty battery
          setTimeout(function() {
            me.bb8.color("ff0000");
          }, 200);
          setTimeout(function() {
            me.bb8.color("000000");
          }, 400);
          setTimeout(function() {
            me.bb8.color("ff0000");
          }, 600);
          setTimeout(function() {
            me.bb8.color("000000");
          }, 800);
        }

        result["powerstate"] = data;
    }).then(function () {
        res.jsonp(result);
    }).catch(function (e) {
        result.success = false;
        res.jsonp(e);
    });

    setTimeout(function() {
      me.bb8.color("00ff00");
    }, 1000);
    setTimeout(function() {
      me.bb8.color("000000");
    }, 2000);
  });
};

/**
 * Get a chainable promise to return the bluetooth information
 * @return {Promise} bluetooth
 */
DroidHelper.prototype.getBluetoothPromise = function(){
  var me = this;
  var p = new Promise(function (resolve, reject) {
    me.bb8.getBluetoothInfo(function(err, data) {
      if (err) {
          reject(err);
      } else {
          resolve(data);
      }
    });
  });
  return p;
}

/**
 * Get a chainable promise to return the power state
 * @return {Promise} powerstate
 */
DroidHelper.prototype.getPowerStatePromise = function(){
  var me = this;
  var p = new Promise(function (resolve, reject) {
    me.bb8.getPowerState(function(err, data) {
      if (err) {
          reject(err);
      } else {
          resolve(data);
      }
    });
  });
  return p;
}

/**
 * Disconnect BB-8
 * @param {Express Request} request
 * @param {Express Response} response
 */
DroidHelper.prototype.disconnect = function(req, res, next){
  var me = this;

  me.bb8.ping(function(err, data) {
    console.log(err || data);
  });

  me.bb8.stop();

  me.bb8.disconnect(function() {
    setTimeout(function() {
      me.bb8.color("ff0000");
    }, 500);
    setTimeout(function() {
      me.bb8.color("000000");
    }, 1000);
    res.render('index', { title: 'BB-8 is succesfully disconnected.' });
  });
};

/**
 * Roll BB-8
 * @param {Express Request} request
 * @param {Express Response} response
 */
DroidHelper.prototype.roll = function(req, res, next){
  var me = this,
    args = req.params;

  res.set('Content-Type', 'application/javascript');

  me.bb8.ping(function(err, data) {
    if(!err){
      if (args.speed) {
        me.setSpeed(args.speed)
      }
      if (args.direction) {
        me.setDirection(args.direction)
      }

      console.log(data);
      me.bb8.roll(me.speed, me.direction);
      setTimeout(function() {
        me.bb8.color("000000");
        me.bb8.stop();
      }, 10000);

      res.jsonp({
        "success": true,
        "connected": true,
        "action": {
          "name": "roll",
          "speed": me.speed,
          "direction": me.direction
        }
      });
    } else {
      res.jsonp({
        "success": true,
        "connected": false
      });
    }
  });
};

/**
 * Set BB-8's speed per sec
 * @param {int} speed
 */
DroidHelper.prototype.setSpeed = function(speed){
  this.speed = speed;
}
/**
 * Set BB-8's direction degrees
 * @param {int} direction
 */
DroidHelper.prototype.setDirection = function(direction){
  this.direction = direction;
}

module.exports = DroidHelper;
