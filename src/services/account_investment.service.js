const db = require('../models/init-models');
const { ThrowError } = require('../utils/helper/response');
const { CONSTANTS } = require('../constants/constants');
const moment = require('moment');
const { sendSMS } = require('../utils/api/gsm');

const accountModel = db.account
const accountBlockModel = db.account_block;
const accountBlockTransModel = db.account_block_transaction;
const accountBlockTransStatusModel = db.account_block_transaction_status;

const accountInvestmentModel = db.account_investment;
const accountInvestmentTransModel = db.account_investment_transaction;
const accountInvestmentTransStatusModel = db.account_investment_transaction_status
const accountLoanModel = db.account_loan

const GetAmountInvestmentOfAcc = async (id) => {
  try {
    const account = await accountModel.findOne({
      where: {
        ID: id
      }
    })
    return account.Amount_Investment;
  } catch (error) {
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, CONSTANTS.ERROR)
  }
};

const GetAmountOfAcc = async (id) => {
  try {
    const account = await accountModel.findOne({
      where: {
        ID: id
      }
    })
    return account.Amount;
  } catch (error) {
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, CONSTANTS.ERROR)
  }
};

const GetAmountBlockAcc = async (id) => {
  try {
    const account = await accountModel.findOne({
      where: {
        ID: id
      }
    })
    return account.Amount_Block;
  } catch (error) {
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, CONSTANTS.ERROR)
  }
};

const GetAccBlockWaitInvestment = async (id) => {
  try {
    const accountBlock = await accountBlockModel.findOne({
      where: {
        ID: id
      }
    })
    return accountBlock.Amount_Wait_Investment;
  } catch (error) {
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, CONSTANTS.ERROR)
  }
};

const GetAmountOfAccInvestment = async (id) => {
  try {
    const accountInvestment = await accountInvestmentModel.findOne({
      where: {
        ID: id
      }
    })
    return accountInvestment.Amount;
  } catch (error) {
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, CONSTANTS.ERROR)
  }
}


const GetAmountLoanOfAccLoan = async (id) => {
  try {
    const accountLoan = await accountLoanModel.findOne({
      where: {
        ID: id
      }
    })
    return accountLoan.Amount;
  } catch (error) {
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, CONSTANTS.ERROR)
  }
}

const GetAmountWaitLoanFormOwn = async (id) => {
  try {
    const accountBlock = await accountBlockModel.findOne({
      where: {
        ID: id
      }
    })
    return accountBlock.Amount_Wait_LoanFromOwn;
  } catch (error) {
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, CONSTANTS.ERROR)
  }
}

const InvestmentDisbursement = async (lenderID, amountDisbursement, content, paymentID,  amountRate) => {
  const t = await db.sequelize.transaction();
  try {
    const amountOfAcc = await GetAmountOfAcc(lenderID)
    const amountBlockOfAcc = await GetAmountBlockAcc(lenderID);
    const amountInvestmentOfAcc = await GetAmountInvestmentOfAcc(lenderID)
    const amountWaitInvestmentOfAccBlock = await GetAccBlockWaitInvestment(lenderID)
    const amountOfAccInvestment = await GetAmountOfAccInvestment(lenderID)
    const current = moment().format("YYYY-MM-DD HH:mm:ss");

    await accountInvestmentModel.update({
      Amount: Number(amountOfAccInvestment) + Number(amountDisbursement)
    }, {
      where: { ID: lenderID },
    }, { transaction: t })

    const newAmountOfAccInvestment = await GetAmountOfAccInvestment(lenderID)

    if(paymentID === 1){
      await accountModel.update({
        Amount: Number(amountOfAcc) + Number(amountRate) ,
        Amount_Block: Number(amountBlockOfAcc) - Number(amountDisbursement),
        Amount_Investment: newAmountOfAccInvestment
      }, {
        where: { ID: lenderID }
      }, { transaction: t }
      );
    }
    else {
      await accountModel.update({
        Amount: Number(amountOfAcc),
        Amount_Block: Number(amountBlockOfAcc) - Number(amountDisbursement),
        Amount_Investment: newAmountOfAccInvestment
      }, {
        where: { ID: lenderID }
      }, { transaction: t }
      );
    }

    await accountBlockModel.update({
      Amount_Wait_Investment: Number(amountWaitInvestmentOfAccBlock) - Number(amountDisbursement)
    }, {
      where: { ID: lenderID }
    }, { transaction: t })

    const accountTrans = await accountBlockTransModel.create({
      Account_Block_Type_ID: 2,
      Account_Block_ID: lenderID,
      Amount_Block_Change: -amountDisbursement,
      Transaction_Content: content
    }, { transaction: t })

    await accountBlockTransStatusModel.create({
      Sub_Account_Status_ID: 2,
      Account_Block_Transaction_ID: accountTrans.ID,
      Transaction_Date: current,
    }, { transaction: t })

    const accountInvestmentTrasaction = await accountInvestmentTransModel.create({
      Account_Investment_ID: lenderID,
      Amount_Investment_Change: amountDisbursement,
      Transaction_Content: content
    }, { transaction: t })

    await accountInvestmentTransStatusModel.create({
      Sub_Account_Status_ID: 2,
      Account_Investment_Transaction_ID: accountInvestmentTrasaction.ID,
      Transaction_Date: current
    }, { transaction: t })

    await t.commit();

  } catch (error) {
    await t.rollback();
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, error.message)
  }
}

// tất toán khoản vay cho nhà đầu tư 
const GetPayment = async (lenderID, amountGetPayment, content, paymentID,  amountRate) => {
  const t = await db.sequelize.transaction();
  try {
    const amountOfAcc = await GetAmountOfAcc(lenderID)
    const amountInvestmentOfAcc = await GetAmountInvestmentOfAcc(lenderID)
    const amountOfAccInvestment = await GetAmountOfAccInvestment(lenderID)
    const current = moment().format("YYYY-MM-DD HH:mm:ss");
    if(paymentID === 1){
      await accountModel.update({
        Amount: Number(amountOfAcc) + Number(amountGetPayment),
        Amount_Investment: Number(amountInvestmentOfAcc) - Number(amountGetPayment)
      }, {
        where: { ID: lenderID }
      }, { transaction: t }
      );
    }
    else {
      await accountModel.update({
        Amount: Number(amountOfAcc) + Number(amountGetPayment) + Number(amountRate),
        Amount_Investment: Number(amountInvestmentOfAcc) - Number(amountGetPayment)
      }, {
        where: { ID: lenderID }
      }, { transaction: t }
      );
    }

    await accountInvestmentModel.update({
      Amount: Number(amountOfAccInvestment) - Number(amountGetPayment)
    }, {
      where: { ID: lenderID },
    }, { transaction: t })

    const accountInvestmentTrasaction = await accountInvestmentTransModel.create({
      Account_Investment_ID: lenderID,
      Amount_Investment_Change: -amountGetPayment,
      Transaction_Content: content
    }, { transaction: t })

    await accountInvestmentTransStatusModel.create({
      Sub_Account_Status_ID: 2,
      Account_Investment_Transaction_ID: accountInvestmentTrasaction.ID,
      Transaction_Date: current
    }, { transaction: t })

    await t.commit();

  } catch (error) {
    await t.rollback();
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, error.message)
  }
}

const createAccountInvestment = async (id, entity) => {
  try {
    const accountInvestment = await accountInvestmentModel.create({
      ID: id,
      Amount: entity.Amount
    })
    return accountInvestment
  } catch (error) {
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, error.message)
  }
}
module.exports = {
  InvestmentDisbursement,
  createAccountInvestment,
  GetPayment
}