const Loan_rate = require('../services/loan_rate.service')
const { ApiResponse } = require('../utils/helper/response');
const { CONSTANTS } = require('../constants/constants');

module.exports = {
    getListLoanRate: async (req, res) => {
        const loan_rate = await Loan_rate.listLoanRate()
        if (loan_rate) {
            return ApiResponse(
                res,
                true,
                CONSTANTS.HTTP_CODE.SUCCESS,
                CONSTANTS.SUCCESS,
                loan_rate
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
