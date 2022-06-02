const AccountBlockTransactionService = require('../services/account_block_transaction.service')
const { ApiResponse } = require('../utils/helper/response');
const { CONSTANTS } = require('../constants/constants');
const { ThrowError } = require('../utils/helper/response');

const getWithdrawalHistory = async (req, res) => {
    const id = req.ID
    const withdrawalHistory = await AccountBlockTransactionService.WithdrawalHistory(id)
    if (withdrawalHistory) {
        return ApiResponse(
            res,
            true,
            CONSTANTS.HTTP_CODE.SUCCESS,
            CONSTANTS.SUCCESS,
            withdrawalHistory
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

module.exports = {
    getWithdrawalHistory
}