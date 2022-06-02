const Bank_service = require('../services/bank.service')
const { ApiResponse } = require('../utils/helper/response');
const { CONSTANTS } = require('../constants/constants');
const accountModel = require('../models/account');
const customerService = require('../services/customer.services')
const notificationService = require('../services/notifications.service')
let updateBank = async (req, res) => {
  try {
    const id = req.ID
    const {
      Account_Number,
      ATM_Number,
      Bank_Name,
      Department_Name,
      OwnerName,
      Status,
      Account_Number_Status,
      ATM_Number_Status,
      Bank_Name_Status,
      Department_Name_Status,
      OwnerName_Status,
      Account_Number_Decline_Reason,
      ATM_Number_Decline_Reason,
      Bank_Name_Decline_Reason,
      OwnerName_Decline_Reason
    } = req.body
    const bank = await Bank_service.editBank(
      id,
      Account_Number,
      ATM_Number,
      Bank_Name,
      Department_Name,
      OwnerName,
      Status,
      Account_Number_Status,
      ATM_Number_Status,
      Bank_Name_Status,
      Department_Name_Status,
      OwnerName_Status,
      Account_Number_Decline_Reason,
      ATM_Number_Decline_Reason,
      Bank_Name_Decline_Reason,
      OwnerName_Decline_Reason
    )
    if (bank) {
      return ApiResponse(
        res,
        true,
        CONSTANTS.HTTP_CODE.SUCCESS,
        CONSTANTS.SUCCESS,
        bank
      );
    } else {
      return ApiResponse(
        res,
        false,
        CONSTANTS.HTTP_CODE.ERROR,
        CONSTANTS.ERROR
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

let AdminUpdateBank = async (req, res) => {
  try {

    const {
      id,
      Account_Number_Status,
      ATM_Number_Status,
      Bank_Name_Status,
      Department_Name_Status,
      OwnerName_Status,
      Account_Number_Decline_Reason,
      ATM_Number_Decline_Reason,
      Bank_Name_Decline_Reason,
      Department_Name_Decline_Reason,
      OwnerName_Decline_Reason
    } = req.body
    const bank = await Bank_service.AdminEditBank(
      id,
      Account_Number_Status,
      ATM_Number_Status,
      Bank_Name_Status,
      Department_Name_Status,
      OwnerName_Status,
      Account_Number_Decline_Reason,
      ATM_Number_Decline_Reason,
      Bank_Name_Decline_Reason,
      Department_Name_Decline_Reason,
      OwnerName_Decline_Reason
    )
    await notificationService.sendNotifyRecord(id)
    if (bank) {
      return ApiResponse(
        res,
        true,
        CONSTANTS.HTTP_CODE.SUCCESS,
        CONSTANTS.SUCCESS,
        bank
      );
    } else {
      return ApiResponse(
        res,
        false,
        CONSTANTS.HTTP_CODE.ERROR,
        CONSTANTS.ERROR
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
let CreateTransBank = async (req, res) => {
  try {
    let { transactionTypeID, ChangedAmount, amount, transactionDate, transactionContent, accountNumber, codeBankTransaction, Bank_Ower, Origin_Messeage } = req.body
    let Tel = transactionContent.split('M4U ')[1];
    let Status = 1
    print("bank_ower")
    print(Bank_Ower)

    const bank = await Bank_service.CreateTransBank(
      transactionTypeID,
      ChangedAmount,
      amount,
      transactionDate,
      transactionContent,
      accountNumber,
      codeBankTransaction,
      Bank_Ower,
      Origin_Messeage,
      Tel,
      Status
    )
    return ApiResponse(
      res,
      true,
      CONSTANTS.HTTP_CODE.SUCCESS,
      CONSTANTS.SUCCESS,
      [bank, Bank_Ower, Origin_Messeage, Status]
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
  updateBank,
  CreateTransBank,
  AdminUpdateBank
}