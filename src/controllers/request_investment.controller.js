
const { ApiResponse } = require('../utils/helper/response');
const { CONSTANTS } = require('../constants/constants');
const ReqInvestmentService = require('../services/request_investment.service');
const loanContractService = require('../services/loan_contract.service')
const accountBlockService = require('../services/account_block.service')
const notificationService = require("../services/notifications.service")
const sampleNotify = require('../constants/notifications')
const sampleNotifySMS = require('../constants/smsNotify')
const accountService = require('../services/account.service')
const moment = require('moment');
const { sequelize } = require('../models/init-models');

const GetReqInvestmentForUser = async (req, res) => {
  try {
    const customerID = req.ID

    const waitting_contract = await ReqInvestmentService.GetReqInvestmentForUser(customerID, [1, 2, 3]);
    const investing_contract = await ReqInvestmentService.GetReqInvestmentForUser(customerID, [4, 5]);
    const closed_contract = await ReqInvestmentService.GetReqInvestmentForUser(customerID, 6);
    return ApiResponse(
      res,
      true,
      CONSTANTS.HTTP_CODE.SUCCESS,
      CONSTANTS.SUCCESS,
      {
        waitting_contract: waitting_contract,
        investing_contract: investing_contract,
        closed_contract: closed_contract
      }
    );
  } catch (error) {
    return ApiResponse(
      res,
      false,
      CONSTANTS.HTTP_CODE.ERROR,
      error.message
    )
  }
};

const GetReqInvestmentForAdmin = async (req, res) => {
  try {
    const waitting_contract = await ReqInvestmentService.GetReqInvestmentForAdmin(1);
    return ApiResponse(
      res,
      true,
      CONSTANTS.HTTP_CODE.SUCCESS,
      CONSTANTS.SUCCESS,
      {
        waitting_contract: waitting_contract
      }
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

const GetDetailReqInvestment = async (req, res) => {
  try {
    const { idReq } = req.body
    const detailReqInvestment = await ReqInvestmentService.GetDetailReqInvestment(idReq);
    console.log(detailReqInvestment)

    return ApiResponse(
      res,
      true,
      CONSTANTS.HTTP_CODE.SUCCESS,
      CONSTANTS.SUCCESS,
      {
        detailReqInvestment: detailReqInvestment
      }
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

const CreateReqInvestment = async (req, res) => {
  try {
    const customerID = req.ID;
    const { amount, term_id, rate_value } = req.body
    const createReq = await ReqInvestmentService.CreateReqInvestment(customerID, amount, term_id, rate_value);
    // await notificationService.sendNotifyClient(customerID, 7, sampleNotify.create_auto_investment_success)
    return ApiResponse(
      res,
      true,
      CONSTANTS.HTTP_CODE.SUCCESS,
      CONSTANTS.SUCCESS,
      null
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

const confirmInvestmentAuto = async (req, res) => {
  const t = sequelize.transaction()
  try {
    const lenderID = req.ID;
    const { loan_contract_id, idReq } = req.body
    let sum = 0

    if (Array.isArray(loan_contract_id)) {
      for (let item of loan_contract_id) {
        let loanContract = await loanContractService.GetLoanContractByID(item);
        sum += loanContract.loan_amount
        let content = `Đầu tư khỏan vay có mã ${loanContract.contract_number}`
        await accountBlockService.CreateReqInvest(lenderID, loanContract.loan_amount, content)
        await loanContractService.update_loan_contract_invest(lenderID, item, 1, t)
      }
      const loanContractInReqInvestment = await ReqInvestmentService.GetDetailReqInvestment(idReq)
      if (loan_contract_id.length === loanContractInReqInvestment.length) {
        await ReqInvestmentService.UpdateInvestmentAutoStatus(idReq, 4)
        await ReqInvestmentService.updateAmountActual(idReq, sum)
      }
      else {
        await ReqInvestmentService.UpdateInvestmentAutoStatus(idReq, 3)
      }
      // await notificationService.sendNotifyClient(customerID, 7, sampleNotify.invite_accept_auto_investment_success)
      return ApiResponse(
        res,
        true,
        CONSTANTS.HTTP_CODE.SUCCESS,
        CONSTANTS.SUCCESS
      );
    }
    else {
      let loanContract = await loanContractService.GetLoanContractByID(loan_contract_id);
      let content = `Đầu tư khỏan vay có mã ${loanContract.contract_number}`
      await accountBlockService.CreateReqInvest(lenderID, loanContract.loan_amount, content)
      await ReqInvestmentService.updateAmountActual(idReq, loanContract.loan_amount)
      await loanContractService.update_loan_contract_invest(lenderID, loan_contract_id, 1)
      await ReqInvestmentService.UpdateInvestmentAutoStatus(idReq, 4)
      // await notificationService.sendNotifyClient(customerID, 7, sampleNotify.invite_accept_auto_investment_success)
      // await loanContractService.createLoanContractStatusChange(loan_contract_id, 1, statusDate)
      return ApiResponse(
        res,
        true,
        CONSTANTS.HTTP_CODE.SUCCESS,
        CONSTANTS.SUCCESS
      );
    }

  }
  catch (error) {
    return ApiResponse(
      res,
      false,
      CONSTANTS.HTTP_CODE.ERROR,
      error.message,
    );
  }
}

const cancelInvestmentAuto = async (req, res) => {
  try {
    const { idReq } = req.body
    const InvestmentAuto = await ReqInvestmentService.GetRequestInvestmentByID(idReq)
    if (InvestmentAuto.status_ID === 1 || InvestmentAuto.status_ID === 2) {
      await ReqInvestmentService.UpdateInvestmentAutoStatus(idReq, 6)
      await ReqInvestmentService.removeLoanContractFromInvestmentAuto(idReq)
      return ApiResponse(
        res,
        true,
        CONSTANTS.HTTP_CODE.SUCCESS,
        CONSTANTS.SUCCESS
      )
    }
    else {
      return ApiResponse(
        res,
        false,
        CONSTANTS.HTTP_CODE.ERROR,
        CONSTANTS.ERROR
      )
    }
  }
  catch (error) {
    return ApiResponse(
      res,
      true,
      CONSTANTS.HTTP_CODE.ERROR,
      error.message
    )
  }

}

const cancelInvestmentAutoForAdmin = async (req, res) => {
  try {
    const { idReq } = req.body
    const InvestmentAuto = await ReqInvestmentService.GetRequestInvestmentByID(idReq)
    if (InvestmentAuto) {
      await ReqInvestmentService.UpdateInvestmentAutoStatus(idReq, 6)
      await ReqInvestmentService.removeLoanContractFromInvestmentAuto(idReq)
      return ApiResponse(
        res,
        true,
        CONSTANTS.HTTP_CODE.SUCCESS,
        CONSTANTS.SUCCESS
      )
    }
    else {
      return ApiResponse(
        res,
        false,
        CONSTANTS.HTTP_CODE.ERROR,
        CONSTANTS.ERROR
      )
    }
  }
  catch (error) {
    return ApiResponse(
      res,
      true,
      CONSTANTS.HTTP_CODE.ERROR,
      error.message
    )
  }

}

const GetLoanForRequest = async (req, res) => {
  try {
    const { idReq } = req.query
    const loanContracts = await ReqInvestmentService.GetLoanForRequest(idReq)
    if (loanContracts) {
      return ApiResponse(
        res,
        true,
        CONSTANTS.HTTP_CODE.SUCCESS,
        CONSTANTS.SUCCESS,
        loanContracts
      )
    }
    else {
      return ApiResponse(
        res,
        false,
        CONSTANTS.HTTP_CODE.ERROR,
        CONSTANTS.ERROR
      )
    }
  }
  catch (error) {
    return ApiResponse(
      res,
      true,
      CONSTANTS.HTTP_CODE.ERROR,
      error.message
    )
  }
}

const InsertLoanToRequestInvestment = async (req, res) => {
  try {
    const { idReq, idLoan } = req.body
    const result = await ReqInvestmentService.InsertLoanToRequestInvestment(idReq, idLoan)
    if (result) {
      return ApiResponse(
        res,
        true,
        CONSTANTS.HTTP_CODE.SUCCESS,
        CONSTANTS.SUCCESS
      )
    }
    else {
      return ApiResponse(
        res,
        false,
        CONSTANTS.HTTP_CODE.ERROR,
        CONSTANTS.ERROR
      )
    }
  }
  catch (error) {
    return ApiResponse(
      res,
      true,
      CONSTANTS.HTTP_CODE.ERROR,
      error.message
    )
  }
}

module.exports = {
  GetReqInvestmentForUser,
  GetReqInvestmentForAdmin,
  GetDetailReqInvestment,
  CreateReqInvestment,
  confirmInvestmentAuto,
  cancelInvestmentAuto,
  GetLoanForRequest,
  InsertLoanToRequestInvestment,
  cancelInvestmentAutoForAdmin
}
