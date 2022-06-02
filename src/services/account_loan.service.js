const db = require('../models/init-models');
const { ThrowError } = require('../utils/helper/response');
const { CONSTANTS } = require('../constants/constants');
const moment = require('moment');
const { sendSMS } = require('../utils/api/gsm');
const accountTransactionService = require('./account_transaction.service')

const accountModel = db.account
const accountBlockModel = db.account_block;
const accountBlockTransModel = db.account_block_transaction;
const accountBlockTransStatusModel = db.account_block_transaction_status;

const accountLoanModel = db.account_loan
const accountLoanTransModel = db.account_loan_transaction
const accountLoanTransStatusModel = db.account_loan_transaction_status

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


const LoanDisbursement = async (borrowerID, amountDisbursement, methodPayment, amountRate, fee, content) => {
  const t = await db.sequelize.transaction();
  try {
    const amountOfAcc = await GetAmountOfAcc(borrowerID)
    const amountOfAccLoan = await GetAmountLoanOfAccLoan(borrowerID)
    // const amountOfAccM4U = await GetAmountOfAcc(119)
    const current = moment().format("YYYY-MM-DD HH:mm:ss");

    await accountLoanModel.update({
      Amount: Number(amountOfAccLoan) + Number(amountDisbursement),
    }, {
      where: { ID: borrowerID }
    }, { transaction: t }
    );

    const newAmountOfAccLoan = await GetAmountLoanOfAccLoan(borrowerID)

    if (methodPayment == 1) {
      await accountModel.update({
        Amount: Number(amountOfAcc) + Number(amountDisbursement) - Number(amountRate) - Number(fee),
        Amount_Loan: newAmountOfAccLoan
      }, {
        where: { ID: borrowerID }
      }, { transaction: t }
      );
    }
    else {
      await accountModel.update({
        Amount: Number(amountOfAcc) + Number(amountDisbursement) - Number(fee),
        Amount_Loan: newAmountOfAccLoan
      }, {
        where: { ID: borrowerID }
      }, { transaction: t }
      );
    }

    // await accountModel.update({
    //   Amount: Number(amountOfAccM4U) + Number(fee)
    // }, {
    //   where: { ID: 100 }
    // }, { transaction: t }
    // );

    const accountLoanTrans = await accountLoanTransModel.create({
      Account_Loan_ID: borrowerID,
      Amount_Loan_Change: amountDisbursement,
      Transaction_Content: content
    }, { transaction: t })

    await accountLoanTransStatusModel.create({
      Sub_Account_Status_ID: 2,
      Account_Loan_Transaction_ID: accountLoanTrans.ID,
      Transaction_Date: current
    }, { transaction: t })

    // const accTrans = await accountTransactionService.createAccountTransaction(
    //   'Trả phí cho M4U',
    //   borrowerID,
    //   2,
    //   -Number(fee),
    //   10,
    //   moment().format('YYYY-MM-DD HH:mm:ss'),
    //   borrowerID,
    //   119,
    //   2,
    //   `Trả phí cho M4U`
    // )

    await t.commit();
  }
  catch (error) {
    await t.rollback();
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, error.message)
  }
}

const LoanPayment = async (borrowerID, amountPayment, methodPayment, amountRate, content) => {
  const t = await db.sequelize.transaction();
  try {
    const amountOfAcc = await GetAmountOfAcc(borrowerID)
    const amountOfAccLoan = await GetAmountLoanOfAccLoan(borrowerID)

    await accountLoanModel.update({
      Amount: Number(amountOfAccLoan) - Number(amountPayment),
    }, {
      where: { ID: borrowerID }
    }, { transaction: t }
    );

    const newAmountOfAccLoan = await GetAmountLoanOfAccLoan(borrowerID)
    const current = moment().format("YYYY-MM-DD HH:mm:ss");
    if (methodPayment == 1) {
      await accountModel.update({
        Amount: Number(amountOfAcc) - Number(amountPayment),
        Amount_Loan: newAmountOfAccLoan
      }, {
        where: { ID: borrowerID }
      }, { transaction: t }
      );
    }
    else {
      await accountModel.update({
        Amount: Number(amountOfAcc) - Number(amountPayment) - Number(amountRate),
        Amount_Loan: newAmountOfAccLoan
      }, {
        where: { ID: borrowerID }
      }, { transaction: t }
      );
    }

    const accountLoanTrans = await accountLoanTransModel.create({
      Account_Loan_ID: borrowerID,
      Amount_Loan_Change: -amountPayment,
      Transaction_Content: content
    }, { transaction: t })

    await accountLoanTransStatusModel.create({
      Sub_Account_Status_ID: 2,
      Account_Loan_Transaction_ID: accountLoanTrans.ID,
      Transaction_Date: current
    }, { transaction: t })

    await t.commit();
  }
  catch (error) {
    await t.rollback();
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, error.message)
  }
}

const createAccountLoan = async (id, entity) => {
  try {
    const accountLoan = await accountLoanModel.create({
      ID: id,
      Amount: entity.Amount
    })
    return accountLoan
  } catch (error) {
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, CONSTANTS.ERROR)
  }
}
module.exports = {
  LoanDisbursement,
  createAccountLoan,
  LoanPayment
}
