const { CONSTANTS } = require('../constants/constants');
const db = require('../models/init-models');
const { ThrowError } = require('../utils/helper/response');
const Bank = db.account_bank
const BankSystemModel = db.account_bank_system_transaction;
const moment = require('moment');

const createBank = async (id, entity) => {
  try {
    const bank = await Bank.create({
      ID: id,
      Account_Number: entity.Account_Number,
      ATM_Number: entity.ATM_Number,
      Bank_Name: entity.Bank_Name,
      Department_Name: entity.Department_Name,
      OwnerName: entity.OwnerName,
      Status: entity.Status,
      Account_Number_Status: -1,
      ATM_Number_Status: -1,
      Bank_Name_Status: -1,
      Department_Name_Status: -1,
      OwnerName_Status: -1,
      Account_Number_Decline_Reason: entity.Account_Number_Decline_Reason,
      ATM_Number_Decline_Reason: entity.ATM_Number_Decline_Reason,
      Bank_Name_Decline_Reason: entity.Bank_Name_Decline_Reason,
      Department_Name_Decline_Reason: entity.Department_Name_Decline_Reason,
      OwnerName_Decline_Reason: entity.OwnerName_Decline_Reason,
      Status: -1
    })
    return bank
  } catch {
    return false
  }
}

const editBank = async (
  id,
  Account_Number,
  ATM_Number,
  Bank_Name,
  Department_Name,
  OwnerName
) => {
  try {
    const current = moment().format("YYYY-MM-DD HH:mm:ss");
    const bank = await Bank.update({
      Account_Number_Status: 0,
      ATM_Number_Status: 0,
      Bank_Name_Status: 0,
      Department_Name_Status: 0,
      OwnerName_Status: 0,
      Status: 0,
      Account_Number: Account_Number,
      ATM_Number: ATM_Number,
      Bank_Name: Bank_Name,
      Department_Name: Department_Name,
      OwnerName: OwnerName,
      Date_Updated: current
    },
      {
        where: {
          ID: id
        }
      })
    return bank
  }
  catch (err) {
    throw err
  }
}

const AdminEditBank = async (
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
) => {
  try {
    const bank = await Bank.update(
      {
        Account_Number_Status: Account_Number_Status,
        ATM_Number_Status: ATM_Number_Status,
        Bank_Name_Status: Bank_Name_Status,
        Department_Name_Status: Department_Name_Status,
        OwnerName_Status: OwnerName_Status,
        Account_Number_Decline_Reason: Account_Number_Decline_Reason,
        ATM_Number_Decline_Reason: ATM_Number_Decline_Reason,
        Bank_Name_Decline_Reason: Bank_Name_Decline_Reason,
        Department_Name_Decline_Reason: Department_Name_Decline_Reason,
        OwnerName_Decline_Reason: OwnerName_Decline_Reason
      },
      {
        where: {
          ID: id
        }
      })
    if (
      Account_Number_Status == 1 &&
      ATM_Number_Status == 1 &&
      Bank_Name_Status == 1 &&
      Department_Name_Status == 1 &&
      OwnerName_Status == 1

    ) {
      await Bank.update({
        Status: 1
      }, {
        where: {
          ID: id
        }
      })
    } else {
      await Bank.update({
        Status: 2
      }, {
        where: {
          ID: id
        }
      })
    }
    return bank
  }
  catch (err) {
    throw err
  }
}


const findBankById = async (id) => {
  const bank = await Bank.findOne({
    where: {
      ID: id,
    },
  });
  return bank
}

const CreateTransBank = async (
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
  ) => {

  try {
    const transBankSys = await BankSystemModel.create({
      Transation_Type_ID: transactionTypeID,
      ChangedAmount: ChangedAmount,
      Amount: amount,
      Transaction_Date: transactionDate,
      Transaction_Content: transactionContent,
      AccountNumber: accountNumber,
      codeTransactionBank: codeBankTransaction,
      Bank_Ower: Bank_Ower,
      Origin_Messeage: Origin_Messeage,
      Tel: Tel,
      Status: Status
    });
    return transBankSys;
  } catch (error) {
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, CONSTANTS.ERROR);
  }
}

const getStatusBank = async (id) => {
  const statusBank = await Bank.findOne({
    where: {
      ID: id
    }
  })
  return statusBank.Status
}
module.exports = {
  createBank,
  editBank,
  findBankById,
  CreateTransBank,
  AdminEditBank,
  getStatusBank
}
