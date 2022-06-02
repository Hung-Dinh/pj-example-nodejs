const axios = require("axios");
const qs = require('qs');
const { ThrowError } = require("../helper/response");
const {CONSTANTS} = require("../../constants/constants");
const mqtt = require("mqtt");


const sendSMS = async(data) => {
  try{
    // const client = mqtt.connect("mqtt://112.78.3.125:1884");
    var client  = mqtt.connect('mqtt://api.money4u.vn');
    message = data.to + '--' + data.messeage;
    client.on("connect", ack => {
      console.log("connected!");
      client.publish("test", message);
    });
    client.on("error", err => {
      console.log(err);
    });
  }
  catch(error) {
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR,CONSTANTS.ERROR)    
  }
}

const sendMulSMS = async(data) => {
  try{
    // const client = mqtt.connect("mqtt://112.78.3.125:1884");
    var client  = mqtt.connect('mqtt://api.money4u.vn');
    message = data.to + '--' + data.messeage;
    client.on("connect", ack => {
      console.log("connected!");
      client.publish("test", message);
    });
    client.on("error", err => {
      console.log(err);
    });
  }
  catch(error) {
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR,CONSTANTS.ERROR)    
  }
}


module.exports = {
  sendSMS,
  sendMulSMS
}