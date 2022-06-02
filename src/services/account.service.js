const db = require('../models/init-models');
const { ThrowError } = require('../utils/helper/response');
const { CONSTANTS } = require('../constants/constants');

const accountModel = db.account;
const accountStatusModel = db.account_status;
const customerModel = db.customer;

const GetStatus = async (id) => {
  const status = await accountStatusModel.findOne({
    where: {
      ID: id
    }
  });
  return status.Status_Name;
}

const GetAccountByID = async (id) => {
  try {
    const account = await accountModel.findOne({
      include: [{
        model: customerModel,
        as: 'ID_customer'
      }],
      where: {
        ID: id
      }
    });
    if (!account) {
      return ThrowError(CONSTANTS.HTTP_CODE.NOT_FOUND_ERR, "ACCOUNT DOES NOT EXIST");
    }

    return {
      name: account.ID_customer.Last_Name + account.ID_customer.First_Name,
      status: await GetStatus(account.Status_ID),
      account_number: account.Account_Number,
      amount: account.Amount,
      amount_loan: account.Amount_Loan,
      amount_investment: account.Amount_Investment,
      amount_block: account.Amount_Block,
      description: account.Descriptions
    }

  } catch (error) {
    return ThrowError(error.code, error.message);
  }
}
const createAccount = async (id, entity, Account_Number) => {
  try {
    const account = await accountModel.create({
      ID: id,
      Status_ID: 1,
      Account_Number: Account_Number,
      Amount: entity.Amount,
      Amount_Loan: entity.Amount_Loan,
      Amount_Investment: entity.Amount_Investment,
      Amount_Block: entity.Amount_Block,
      Descriptions: entity.Descriptions
    })
    return account
  } catch {
    return false
  }
}
module.exports = {
  GetAccountByID,
  createAccount
}