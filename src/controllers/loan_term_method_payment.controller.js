const { ApiResponse } = require('../utils/helper/response');
const { CONSTANTS } = require('../constants/constants');
const loan_term_method_payment = require('../services/loan_term_method_payment.service')

const getRateAndFee = async (req, res) => {
    try {
        const {loan_term_id, method_payment_id, amount}  = {...req.query}
        const rate_fee = await loan_term_method_payment.getRateAndFee(loan_term_id, method_payment_id, amount)
        return ApiResponse(
            res,
            true,
            CONSTANTS.HTTP_CODE.SUCCESS,
            CONSTANTS.SUCCESS,
            rate_fee
        );
    } catch (error) {
        return ApiResponse(
            res,
            false,
            error.code,
            error.message
        )
    }
}
module.exports = {
    getRateAndFee
}