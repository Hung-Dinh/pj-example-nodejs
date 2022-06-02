const db = require('../models/init-models')
const AccountBlockTransactionModel = db.account_block_transaction
const AccountBlockModel = db.account_block
const AccountModel = db.account
const customer_service=require('./customer.services')

const WithdrawalHistory = async (id) => {
    const customer = await customer_service.getCustomerByID(id)
    if (!customer) {
      return ThrowError(CONSTANTS.HTTP_CODE.NOT_FOUND_ERR, "ID ACCOUNT DOES NOT EXIST")
    }
    const withdrawalHistory = await AccountBlockTransactionModel.findAll({
        include: [
            {
                model: AccountBlockModel, as: 'Account_Block',
                include: [
                    { model: AccountModel, as: 'ID_account' }
                ]
            }
        ],
        where: {
            StatusID: 2,
            '$Account_Block.ID_account.ID$':id
        }
    })
    let list_withdrawalHistory=[]
  
  for (let item of withdrawalHistory) {
    list_withdrawalHistory.push({
      ID: item.ID,
      Account_Block_Type_ID: item.Account_Block_Type_ID,
      Account_Block_ID: item.Account_Block_ID,
      StatusID: item.StatusID,
      Amount_Block_Change: item.Amount_Block_Change,
      Transaction_Content: item.Transaction_Content,
      Amount_GetMoney: item.Account_Block.Amount_GetMoney,
      Amount_Wait_Investment: item.Account_Block.Amount_Wait_Investment,
      Amount_Wait_LoanFromOwn: item.Account_Block.Amount_Wait_LoanFromOwn,
      account_id:item.Account_Block.ID_account.ID
    })
  }
  return list_withdrawalHistory;
}

module.exports = {
    WithdrawalHistory
}