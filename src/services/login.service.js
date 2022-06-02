const moment = require('moment');
const db = require('../models/init-models');
const {ThrowError} = require('../utils/helper/response');
const {CONSTANTS} = require('../constants/constants');
const {sendSMS} = require('../utils/api/gsm');
const {sendNotifyClient} = require("../services/notifications.service")
const sampleNotify = require("../constants/notifications")
const sampleSMS = require("../constants/smsNotify")
const OtpModel = db.otp;
const {Op} = require('sequelize');
const CreateOtp = async ( toTel) => {
  try{
    let current = moment().format("YYYY-MM-DD HH:mm:ss")
    let m = moment(current,"YYYY-MM-DD HH:mm:ss");
    let Expires = m.add(5, 'minutes');
    const otpCode = Math.floor(1000 + Math.random() * 9000);
    const otp = await OtpModel.create({
      Otp_Code: otpCode,
      Otp_Date:  current,
      From_Tel: null,
      To_Tel: toTel,
      count: 0,
      Time_Limit: Expires
    })
    await sendSMS(
      {to: toTel , messeage: otpCode}
    )
    return null;
  } catch (error) {
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, error.message);
  }
};

const TestOTP = async (phone,otp_code) => {
  try{
    await UpdateOTP(phone);
    let current = moment().format("YYYY-MM-DD HH:mm:ss");
    const otp = await OtpModel.findOne({
      where: {
        [Op.and]: [
          {To_Tel: phone},
          {Otp_Code: otp_code},
          {count: {[Op.lte]: 3}},
          {Time_Limit: {[Op.gte]: current}}
        ]
      }
    });
    if(!otp){
      return ThrowError(CONSTANTS.HTTP_CODE.ERROR, "OTP Không hợp lệ");
    }
    return otp;
  } catch (error) {
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, error.message);
  }
}

const UpdateOTP = async (phone) => {
  try{
    let current = moment().format("YYYY-MM-DD HH:mm:ss");
    const otp = await OtpModel.findOne({
      where: {
        [Op.and]: [
          {To_Tel: phone},
          {Time_Limit: {[Op.gte]: current}}
        ]
      }
    });

    if(!otp){
      return ThrowError(CONSTANTS.HTTP_CODE.ERROR, CONSTANTS.ERROR);
    }
    return await OtpModel.update({
      count: otp.count + 1
    },{
      where: {
        [Op.and]: [
          {To_Tel: phone},
          {Time_Limit: {[Op.gte]: current}}
        ]
      }
    })
  } catch (error) {
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, error.message);
  }
}

const checkOtp = async(phone) => {
  try{
    let current = moment().format("YYYY-MM-DD HH:mm:ss");
    const otp = await OtpModel.findOne({
      where: {
        [Op.and]: [
          {To_Tel: phone},
          {count: {[Op.lte]: 3}},
          {Time_Limit: {[Op.gte]: current}}
        ]
      }
    });
     return otp;
  } catch(error){
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, CONSTANTS.ERROR)
  }
}
module.exports = {
  CreateOtp,
  TestOTP,
  checkOtp
}