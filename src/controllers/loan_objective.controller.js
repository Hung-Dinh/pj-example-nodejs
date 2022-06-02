const Loan_objective = require('../services/loan_objective.service')
const {ApiResponse} = require('../utils/helper/response');
const {CONSTANTS} = require('../constants/constants');
module.exports = {
  getListLoanObjective: async (req,res) => {
    const loan_objective = await Loan_objective.getListLoanObjective()
    if (loan_objective) {
      return ApiResponse(
        res,
        true,
        CONSTANTS.HTTP_CODE.SUCCESS,
        CONSTANTS.SUCCESS,
        loan_objective
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
