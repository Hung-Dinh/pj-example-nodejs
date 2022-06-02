const Method_payment = require('../services/method_payment.service')
const {ApiResponse} = require('../utils/helper/response');
const {CONSTANTS} = require('../constants/constants');
module.exports = {
  getListMethodPayment: async (req,res) => {
    const method_payment = await Method_payment.getListMethodPayment()
    if (method_payment) {
      return ApiResponse(
        res,
        true,
        CONSTANTS.HTTP_CODE.SUCCESS,
        CONSTANTS.SUCCESS,
        method_payment
      );
    }
    else {
      return ApiResponse(
        res,
        false,
        CONSTANTS.HTTP_CODE.ERROR,
        error.message
      )
    }
  }
}
