const db = require('../models/init-models')
const { ApiResponse } = require('../utils/helper/response');
const { CONSTANTS } = require('../constants/constants');
const loanContractService = require('../services/loan_contract.service')
const accountBlockService = require('../services/account_block.service')
const mainLoanContractService = require('../services/main_loan_contract.service')
const requestExtendLoanContractService = require('../services/request_extend_loan_contract.service')
// const notificationService = require("../services/notifications.service")
// const sampleNotify = require('../constants/notifications')
// const sampleNotifySMS = require('../constants/smsNotify')
const accountService = require('../services/account.service')

const moment = require('moment')

const GetAllLoanContract = async (req, res) => {
  try {
    const loan_contracts = await loanContractService.GetAllLoanContract();
    return ApiResponse(
      res,
      true,
      CONSTANTS.HTTP_CODE.SUCCESS,
      CONSTANTS.SUCCESS,
      loan_contracts
    );
  } catch (error) {
    return ApiResponse(
      res,
      false,
      error.code,
      error.message
    )
  }
};

const GetLoanContractByID = async (req, res) => {
  try {
    const { id } = req.body;
    const loan_contract = await loanContractService.GetLoanContractByID(id)
    return ApiResponse(
      res,
      true,
      CONSTANTS.HTTP_CODE.SUCCESS,
      CONSTANTS.SUCCESS,
      loan_contract
    );
  } catch (error) {
    return ApiResponse(
      res,
      false,
      error.code,
      error.message
    )
  }
};

const GetLoanContractByIDAccount = async (req, res) => {
  try {
    const { idAccount } = req.body;
    const loan_contract = await loanContractService.GetLoanContractByIDAccount(idAccount)
    return ApiResponse(
      res,
      true,
      CONSTANTS.HTTP_CODE.SUCCESS,
      CONSTANTS.SUCCESS,
      loan_contract
    );
  } catch (error) {
    return ApiResponse(
      res,
      false,
      error.code,
      error.message
    )
  }
};

const GetInvestmentContractByIDAccount = async (req, res) => {
  try {
    const id = req.ID;
    const loan_contract = await loanContractService.GetInvestmentContractByIDAccount(id)
    return ApiResponse(
      res,
      true,
      CONSTANTS.HTTP_CODE.SUCCESS,
      CONSTANTS.SUCCESS,
      loan_contract
    );
  } catch (error) {
    return ApiResponse(
      res,
      false,
      error.code,
      error.message
    )
  }
};
const getLoanContract = async (req, res) => {
  try {
    const id = req.ID
    const loan_contract = await loanContractService.getLoanContract(id)
    const loan_account = await loanContractService.GetLoanContractByIDAccount(id)
    const loan_disbursed = await loanContractService.getLoanContractDisbursed(id)
    const loan_finish = await loanContractService.getLoanFinish(id)
    const result = { loan_contract, loan_account, loan_disbursed, loan_finish }
    return ApiResponse(
      res,
      true,
      CONSTANTS.HTTP_CODE.SUCCESS,
      CONSTANTS.SUCCESS,
      result
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
const updateLenderToLoanContract = async (req, res) => {
  try {

    const lenderID = req.ID;
    const loanContractID = req.params.id
    await loanContractService.update_loan_contract_invest(lenderID, loanContractID, 2)
    await loanContractService.createLoanContractStatusChange(parseInt(item), 2, statusDate)
    return ApiResponse(
      res,
      true,
      CONSTANTS.HTTP_CODE.SUCCESS,
      CONSTANTS.SUCCESS
    );
  }
  catch {
    return ApiResponse(
      res,
      false,
      CONSTANTS.HTTP_CODE.ERROR,
      CONSTANTS.ERROR,
    );
  }
}

const investManyLoans = async (req, res) => {
  const t = await db.sequelize.transaction()
  try {
    const lenderID = req.ID;
    const { loan_contract_id } = req.body
    let CONTRACT_NUMBER = ""
    const accountLender = await accountService.GetAccountByID(lenderID)
    if (Array.isArray(loan_contract_id)) {
      for (const item of loan_contract_id) {
        let loanContract = await loanContractService.GetLoanContractByID(item);
        if (lenderID === loanContract.borrower_id) {
          return ApiResponse(
            res,
            false,
            CONSTANTS.HTTP_CODE.ERROR,
            'Bạn không thể tự đầu tư khoản vay của mình !'
          );
        }
        if (loanContract.lender_id !== null) {
          return ApiResponse(
            res,
            false,
            CONSTANTS.HTTP_CODE.ERROR,
            `Khoản vay ${loanContract.contract_number} đã có người đầu tư !`
          );
        }
      }
      let arrayPromise = []
      for (let item of loan_contract_id) {
        let loanContract = await loanContractService.GetLoanContractByID(item);
        let content = `Đầu tư khỏan vay có mã ${loanContract.contract_number}`
        arrayPromise = [
          await accountBlockService.CreateReqInvest(lenderID, parseInt(loanContract.loan_amount), content),
          // await mainLoanContractService.updateStatusDisbursingOfMainLoan(loanContract.main_loan_contract_id)
          await loanContractService.update_loan_contract_invest(lenderID, parseInt(item), 1),
          await mainLoanContractService.ChangeStatusForMainLoanDone(loanContract.main_loan_contract_id)
        ]
        CONTRACT_NUMBER += loanContract.contract_number + ", "
      }
      Promise.all(arrayPromise)
      CONTRACT_NUMBER = CONTRACT_NUMBER.slice(0, CONTRACT_NUMBER.length - 2)
      // await notificationService.sendNotifyClient(lenderID, 7, sampleNotify.wait_investment_success(CONTRACT_NUMBER))
      return ApiResponse(
        res,
        true,
        CONSTANTS.HTTP_CODE.SUCCESS,
        CONSTANTS.SUCCESS
      );
    }
    else {
      let loanContract = await loanContractService.GetLoanContractByID(loan_contract_id);
      if (lenderID === loanContract.borrower_id) {
        return ApiResponse(
          res,
          false,
          CONSTANTS.HTTP_CODE.ERROR,
          'Bạn không thể tự đầu tư khoản vay của mình !'
        );
      }
      if (loanContract.lender_id !== null) {
        return ApiResponse(
          res,
          false,
          CONSTANTS.HTTP_CODE.ERROR,
          'Khoản vay đã có người đầu tư !'
        );
      }
      // await mainLoanContractService.updateStatusDisbursingOfMainLoan(loanContract.main_loan_contract_id)
      let content = `Đầu tư khỏan vay có mã ${loanContract.contract_number}`
      await accountBlockService.CreateReqInvest(lenderID, loanContract.loan_amount, content)
      await loanContractService.update_loan_contract_invest(lenderID, loan_contract_id, 1)
      await mainLoanContractService.ChangeStatusForMainLoanDone(loanContract.main_loan_contract_id);
      // await notificationService.sendNotifyClient(lenderID, 7, sampleNotify.wait_investment_success(loanContract.contract_number))
      return ApiResponse(
        res,
        true,
        CONSTANTS.HTTP_CODE.SUCCESS,
        CONSTANTS.SUCCESS
      );
    }

  }
  catch (error) {
    // await t.rollback()
    return ApiResponse(
      res,
      false,
      CONSTANTS.HTTP_CODE.ERROR,
      error.message,
    );
  }
}

const detailLoanContractById = async (req, res) => {
  try {
    const { id } = { ...req.query }
    const detail = await loanContractService.DetailLoanContractByID(id)
    if (detail) {
      return ApiResponse(
        res,
        true,
        CONSTANTS.HTTP_CODE.SUCCESS,
        CONSTANTS.SUCCESS,
        detail
      );
    }
    else {
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
      CONSTANTS.ERROR
    )
  }
}

const LoanDivision = async (req, res) => {
  try {
    const { idMainLoan, subContract } = req.body
    const result = await loanContractService.LoanDivision(idMainLoan, subContract)
    if (result) {
      await mainLoanContractService.updateStatusWattingForDisbursment(idMainLoan);
      return ApiResponse(
        res,
        true,
        CONSTANTS.HTTP_CODE.SUCCESS,
        CONSTANTS.SUCCESS,
        result
      );
    }
  }
  catch (error) {
    return ApiResponse(
      res,
      false,
      CONSTANTS.HTTP_CODE.ERROR,
      error.message
    )
  }

}

const confirmAcceptRequestExtendLoanContract = async (req, res) => {
  try {
    const LenderID = req.ID
    const { idLoanContract } = req.body
    const result = await requestExtendLoanContractService.CustomerConfirmAcceptRequestExtend(idLoanContract, 2, LenderID)
    console.log(result)
    if (result) {
      return ApiResponse(
        res,
        true,
        CONSTANTS.HTTP_CODE.SUCCESS,
        CONSTANTS.SUCCESS
      );
    }
    else {
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

const confirmCancelRequestExtendLoanContract = async (req, res) => {
  try {
    const LenderID = req.ID
    const { idLoanContract } = req.body
    const result = await requestExtendLoanContractService.CustomerConfirmCancelRequestExtend(idLoanContract, 3, LenderID)
    if (result) {
      return ApiResponse(
        res,
        true,
        CONSTANTS.HTTP_CODE.SUCCESS,
        CONSTANTS.SUCCESS
      );
    }
    else {
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

const GetLoanContractExtendOfCustomer = async (req, res) => {
  try {
    const idCustomer = req.ID
    const result = await requestExtendLoanContractService.GetLoanContractExtendOfCustomer(idCustomer)
    if (result) {
      return ApiResponse(
        res,
        true,
        CONSTANTS.HTTP_CODE.SUCCESS,
        CONSTANTS.SUCCESS,
        result
      );
    }
    else {
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

module.exports = {
  GetAllLoanContract,
  GetLoanContractByID,
  GetLoanContractByIDAccount,
  GetInvestmentContractByIDAccount,
  updateLenderToLoanContract,
  getLoanContract,
  investManyLoans,
  detailLoanContractById,
  LoanDivision,
  confirmAcceptRequestExtendLoanContract,
  confirmCancelRequestExtendLoanContract,
  GetLoanContractExtendOfCustomer
}