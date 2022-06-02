const acc_bank_trans = require('../services/account_bank_transaction.service')
const accountModel = require('../models/account')
const { ApiResponse } = require('../utils/helper/response');
const { CONSTANTS } = require('../constants/constants');
const { ThrowError } = require('../utils/helper/response');

const getAccountBankTransfers = async (req, res) => {
  try {
    const acc_bank = await acc_bank_trans.getAccountBankTransfers()
    if (acc_bank) {
      return ApiResponse(
        res,
        true,
        CONSTANTS.HTTP_CODE.SUCCESS,
        CONSTANTS.SUCCESS,
        acc_bank
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
  } catch (error) {
    return ApiResponse(
      res,
      false,
      CONSTANTS.HTTP_CODE.ERROR,
      error.message
    )
  }
}
const getAccountBankReceiveMoney = async (req, res) => {
  try {
    const acc_bank = await acc_bank_trans.getAccountBankReceiveMoney()
    if (acc_bank) {
      return ApiResponse(
        res,
        true,
        CONSTANTS.HTTP_CODE.SUCCESS,
        CONSTANTS.SUCCESS,
        acc_bank
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
  } catch (error) {
    return ApiResponse(
      res,
      false,
      CONSTANTS.HTTP_CODE.ERROR,
      error.message
    )
  }
}

const getAccountBankReceiveComplete = async (req, res) => {
  try {
    const acc_bank = await acc_bank_trans.getAccountBankReceiveComplete()
    if (acc_bank) {
      return ApiResponse(
        res,
        true,
        CONSTANTS.HTTP_CODE.SUCCESS,
        CONSTANTS.SUCCESS,
        acc_bank
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
  } catch (error) {
    return ApiResponse(
      res,
      false,
      CONSTANTS.HTTP_CODE.ERROR,
      error.message
    )
  }

}


const getAccountBankReceiveDetail = async (req, res) => {
  try {
    const id = req.params.id;
    const acc_bank = await acc_bank_trans.getAccountBankReceiveDetail(id)
    if (acc_bank) {
      return ApiResponse(
        res,
        true,
        CONSTANTS.HTTP_CODE.SUCCESS,
        CONSTANTS.SUCCESS,
        acc_bank
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
  } catch (error) {
    return ApiResponse(
      res,
      false,
      CONSTANTS.HTTP_CODE.ERROR,
      error.message
    )
  }
}

const editAccountBankReceiveMoney = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      Transation_Type_ID,
      ChangedAmount,
      Amount,
      Transaction_Date,
      Transaction_Content,
      AccountNumber,
      codeTransactionBank,
      Bank_Ower,
      Tel,
      Status,
      Origin_Messeage,
      Descriptions } = req.body;

    const account = accountModel.findOne({
      where: {
        Account_Number: Tel
      }
    })
    if (!account) {
      return ThrowError(CONSTANTS.HTTP_CODE.ERROR, "Số điện thoại không hợp lệ");
    }
    const acc_bank = await acc_bank_trans.editAccountBankReceiveMoney(
      id,
      Transation_Type_ID,
      ChangedAmount,
      Amount,
      Transaction_Date,
      Transaction_Content,
      AccountNumber,
      codeTransactionBank,
      Bank_Ower,
      Tel,
      1,
      Origin_Messeage,
      Descriptions
    )
    if (acc_bank) {
      return ApiResponse(
        res,
        true,
        CONSTANTS.HTTP_CODE.SUCCESS,
        CONSTANTS.SUCCESS,
        acc_bank
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
  } catch (error) {
    return ApiResponse(
      res,
      false,
      CONSTANTS.HTTP_CODE.ERROR,
      error.message
    )
  }

}


const confirmRecharge = async (req, res) => {
  try {
    const { id } = req.body;
    console.log(id);
    const confirm = await acc_bank_trans.confirmRecharge(id)

    return ApiResponse(
      res,
      true,
      CONSTANTS.HTTP_CODE.SUCCESS,
      CONSTANTS.SUCCESS,
      confirm
    );
  } catch (error) {
    return ApiResponse(
      res,
      false,
      CONSTANTS.HTTP_CODE.ERROR,
      error.message
    )
  }
}

module.exports = {
  getAccountBankTransfers,
  getAccountBankReceiveMoney,
  getAccountBankReceiveComplete,
  getAccountBankReceiveDetail,
  editAccountBankReceiveMoney,
  confirmRecharge
}