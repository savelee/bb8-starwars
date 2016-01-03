"use strict";

var sphero = require('sphero'
);
var bb8 = sphero('68da9181e0c444b28a4a8bb854ea219f');

bb8.connect(function() {
  console.log("Now connected to BB-8");

  //The Ping command verifies that BB8 is awake and receiving commands.
  bb8.ping(function(err, data) {
    console.log(err || data);
  });

  //Get bluetooth infos
  bb8.getBluetoothInfo(function(err, data) {
    if (err) {
      console.log("error: ", err);
    } else {
      console.log("data:");
      console.log("  name:", data.name);
      console.log("  btAddress:", data.btAddress);
      console.log("  separator:", data.separator);
      console.log("  colors:", data.colors);
    }
  });

  //Get battery infos
  bb8.getPowerState(function(err, data) {
    if (err) {
      console.log("error: ", err);
    } else {
      console.log("data:");
      console.log("  recVer:", data.recVer);
      console.log("  batteryState:", data.batteryState);
      console.log("  batteryVoltage:", data.batteryVoltage);
      console.log("  chargeCount:", data.chargeCount);
      console.log("  secondsSinceCharge:", data.secondsSinceCharge);
    }
  });

  // sets color to the provided r/g/b values
  bb8.color({ red: 255, green: 0, blue: 255 });

  setTimeout(function() {

    bb8.color(false);
    bb8.disconnect(function() {
      console.log("Now disconnected from BB-8");
    });

  }, 3000);
});
