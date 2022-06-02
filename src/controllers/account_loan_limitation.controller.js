const Loan_limit = require('../services/account_loan_limitation.service')
const { ApiResponse } = require('../utils/helper/response');
const { CONSTANTS } = require('../constants/constants');
module.exports = {
  getListLoanLimitation: async (req, res) => {
    const loan_limit = await Loan_limit.getListLoanLimitation()
    if (loan_limit) {
      return ApiResponse(
        res,
        true,
        CONSTANTS.HTTP_CODE.SUCCESS,
        CONSTANTS.SUCCESS,
        loan_limit
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
  },
  getListLoanLimitationType: async (req, res) => {
    const loan_limit = await Loan_limit.getListLoanLimitationType()
    if (loan_limit) {
      return ApiResponse(
        res,
        true,
        CONSTANTS.HTTP_CODE.SUCCESS,
        CONSTANTS.SUCCESS,
        loan_limit
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
  },
  getListLoanLimitationStatus: async (req, res) => {
    const loan_limit = await Loan_limit.getListLoanLimitationStatus()
    if (loan_limit) {
      return ApiResponse(
        res,
        true,
        CONSTANTS.HTTP_CODE.SUCCESS,
        CONSTANTS.SUCCESS,
        loan_limit
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
  },
  updateLoanLimitation: async (req, res) => {
    try {
      const { id, Amount_Credit, Amount_Debit, Amount_Release,  content } = req.body
      const loan_limit = await Loan_limit.updateLoanLimitation(id, Amount_Credit, Amount_Debit, Amount_Release, content)
      return ApiResponse(
        res,
        true,
        CONSTANTS.HTTP_CODE.SUCCESS,
        CONSTANTS.SUCCESS,
        loan_limit
      );
    } catch (error) {
      return ApiResponse(
        res,
        false,
        500,
        error.message
      )
    }
  },
  getListAccountLoanLimitation: async (req, res) => {
    const account_limitation = await Loan_limit.listLoanLimitation()
    try {
      return ApiResponse(
        res,
        true,
        CONSTANTS.HTTP_CODE.SUCCESS,
        CONSTANTS.SUCCESS,
        account_limitation
      );
    } catch (error) {
      return ApiResponse(
        res,
        false,
        500,
        error.message
      )
    }
  }
}
