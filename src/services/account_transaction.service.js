const db = require('../models/init-models');
const { ThrowError } = require('../utils/helper/response');
const { CONSTANTS } = require('../constants/constants');

const accountTransactionModel = db.account_transaction
const accountTranSactionStatusModel = db.account_trannsaction_status

const createAccountTransaction = async (
  Transaction_Code,
  Account_ID,
  Account_Status_ID,
  Amount,
  Transation_Type_ID,
  Transaction_Date,
  FromAccount_ID,
  ToAccount_ID,
  Transaction_Status_ID,
  Transaction_Content
) => {
  // const t = await db.sequelize.transaction()
  try {
    const accTrans = await accountTransactionModel.create({
      Transaction_Code: Transaction_Code,
      Account_ID: Account_ID,
      Account_Status_ID: Account_Status_ID,
      Amount: Amount,
      Transation_Type_ID: Transation_Type_ID,
      Transaction_Date: Transaction_Date,
      FromAccount_ID: FromAccount_ID,
      ToAccount_ID: ToAccount_ID,
      Transaction_Status_ID: Transaction_Status_ID,
      Transaction_Content: Transaction_Content
    })

    await accountTranSactionStatusModel.create({
      Transaction_Status_ID: Transaction_Status_ID,
      Account_Transaction_ID: accTrans.ID,
      Transaction_Date: accTrans.Transaction_Date
    })
    // await t.commit()
    return true
  } catch (error) {
    // await t.rollback()
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, error.message)
  }

}

module.exports = {
  createAccountTransaction
}
