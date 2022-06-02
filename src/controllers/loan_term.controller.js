const Loan_term = require('../services/loan_term.service')
const {ApiResponse} = require('../utils/helper/response');
const {CONSTANTS} = require('../constants/constants');
module.exports = {
  getListLoanTerm: async (req,res) => {
    const loan_term = await Loan_term.getListLoanTerm()
    if (loan_term) {
      return ApiResponse(
        res,
        true,
        CONSTANTS.HTTP_CODE.SUCCESS,
        CONSTANTS.SUCCESS,
        loan_term
      )}
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
