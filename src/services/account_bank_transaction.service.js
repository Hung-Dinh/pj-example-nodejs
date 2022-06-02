const db = require('../models/init-models')
const AccountBankSystem = db.account_bank_system_transaction
const { ThrowError } = require('../utils/helper/response');
const { CONSTANTS } = require('../constants/constants');
const Bank = require('./bank.service')
const { Op } = require("sequelize");
const sampleNotify = require("../constants/notifications")
const sampleNotifySMS = require("../constants/notifications")
const {sendNotifyClient, SendNotifySMS} = require("../services/notifications.service")

const accountModel = db.account;

const getAccountBankReceiveMoney = async () => {
    try {
        const acc_bank_trans = await AccountBankSystem.findAll({
            where: {
              [Op.and]: [
                {Transation_Type_ID: 2},
                {status: {[Op.or]: [1,2]}}
              ]
            }
        })
        let list_accBank = []
        for (let item of acc_bank_trans) {
            list_accBank.push({
                ID: item.ID,
                Transation_Type_ID: item.Transation_Type_ID,
                ChangedAmount: item.ChangedAmount,
                Amount: item.Amount,
                Transaction_Date: item.Transaction_Date,
                Transaction_Content: item.Transaction_Content,
                AccountNumber: item.AccountNumber,
                codeTransactionBank: item.codeTransactionBank,
                Bank_Ower: item.Bank_Ower,
                Tel: item.Tel,
                Status: item.Status,
                Origin_Messeage: item.Origin_Messeage,
                Descriptions: item.Descriptions
            })
        }
        return list_accBank
    } catch (error) {
        return ThrowError(error.code, error.message);
    }
}

const getAccountBankReceiveComplete = async () => {
  try {
      const acc_bank_trans = await AccountBankSystem.findAll({
          where: {
            [Op.and]: [
              {Transation_Type_ID: 2},
              {status: 3}
            ]
          }
      })
      let list_accBank = []
      for (let item of acc_bank_trans) {
          list_accBank.push({
              ID: item.ID,
              Transation_Type_ID: item.Transation_Type_ID,
              ChangedAmount: item.ChangedAmount,
              Amount: item.Amount,
              Transaction_Date: item.Transaction_Date,
              Transaction_Content: item.Transaction_Content,
              AccountNumber: item.AccountNumber,
              codeTransactionBank: item.codeTransactionBank,
              Bank_Ower: item.Bank_Ower,
              Tel: item.Tel,
              Status: "tất toán",
              Origin_Messeage: item.Origin_Messeage,
              Descriptions: item.Descriptions
          })
      }
      return list_accBank
  } catch (error) {
      return ThrowError(error.code, error.message);
  }
}

const getAccountBankTransfers = async () => {
    try {
        const acc_bank_trans = await AccountBankSystem.findAll({
            where: {
                Transation_Type_ID:1
            }
        })
        let list_accBank = []
        for (let item of acc_bank_trans) {
            list_accBank.push({
              ID: item.ID,
              Transation_Type_ID: item.Transation_Type_ID,
              ChangedAmount: item.ChangedAmount,
              Amount: item.Amount,
              Transaction_Date: item.Transaction_Date,
              Transaction_Content: item.Transaction_Content,
              AccountNumber: item.AccountNumber,
              codeTransactionBank: item.codeTransactionBank,
              Bank_Ower: item.Bank_Ower,
              Tel: item.Tel,
              Status: item.Status,
              Origin_Messeage: item.Origin_Messeage,
              Descriptions: item.Descriptions
            })
        }
        return list_accBank
    } catch (error) {
        return ThrowError(error.code, error.message);
    }
}

const getAccountBankReceiveDetail = async (id) => {
  try {
    const acc_bank_trans = await AccountBankSystem.findByPk(id);    
    return acc_bank_trans;
  } catch (error) {
      return ThrowError(error.code, error.message);
  }
}


const editAccountBankReceiveMoney = async (
  id,
  Transation_Type_ID,
  ChangedAmount,
  Amount, 
  Transaction_Date, 
  Transaction_Content, 
  AccountNumber, 
  codeTransactionBank, 
  Bank_Ower,
  tel,
  status,
  message,
  Descriptions 
) => {
  const bank_acc_trans = await AccountBankSystem.update(
    {
      Transation_Type_ID: Transation_Type_ID,
      ChangedAmount: ChangedAmount,
      Amount: Amount, 
      Transaction_Date: Transaction_Date, 
      Transaction_Content: Transaction_Content, 
      AccountNumber: AccountNumber, 
      codeTransactionBank: codeTransactionBank, 
      Bank_Ower: Bank_Ower, 
      Tel: tel,
      Status: status,
      Origin_Messeage: message,
      Descriptions: Descriptions 
    }, {
    where: {
      ID: id
    }
  })

  return bank_acc_trans;
};

const confirmRecharge = async (id) => {
  try{
    
    //where
    const transactionBank = await AccountBankSystem.findOne({
      where: {
        ID: id,
        Transation_Type_ID: 2,
        Status: 1
      }
    })
    
    if(!transactionBank){
      return ThrowError(CONSTANTS.HTTP_CODE.ERROR, CONSTANTS.ERROR)
    }


    const account = await accountModel.findOne({
      where: {
        Account_Number: transactionBank.Tel
      }
    })
    
    await accountModel.update({
      Amount: account.Amount + transactionBank.ChangedAmount
    },{
      where: {
        Account_Number: transactionBank.Tel
      }
    })

    
    await AccountBankSystem.update({
      Status: 3
    }, {
      where: {
        ID: id
      }
    })

    const accountResult  = await accountModel.findOne({
      where: {
        Account_Number: transactionBank.Tel
      }
    })

    await sendNotifyClient(account.ID,7,sampleNotify.recharge_success(transactionBank.ChangedAmount))
    await sendNotifyClient(account.ID,7, sampleNotify.change_amount(transactionBank.ChangedAmount, accountResult.Amount))
    // gui sms
    await SendNotifySMS(transactionBank.Tel, sampleNotifySMS.change_amount(transactionBank.ChangedAmount, accountResult.Amount))
    return 1;
  } catch(error){
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, CONSTANTS.ERROR)
  }
 
}

module.exports = {
    getAccountBankReceiveMoney,
    getAccountBankTransfers,
    editAccountBankReceiveMoney,
    getAccountBankReceiveDetail,
    confirmRecharge,
    getAccountBankReceiveComplete
}