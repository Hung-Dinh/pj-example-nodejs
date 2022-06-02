const { CONSTANTS } = require('../constants/constants')
const db = require('../models/init-models')
const { ThrowError } = require('../utils/helper/response')
const RequestExtendContractModel = db.request_extend_loan_contract
const loanContractModel = db.loan_contract
const accountTransactionModel = db.account_transaction
const accountTranSactionStatusModel = db.account_trannsaction_status
const loanContractService = require('./loan_contract.service')
const mainLoanContractService = require('./main_loan_contract.service')
const accountService = require('./account.service')
const accountModel = db.account
const { getRateAndFee, getLoanTermMethodPaymentByID } = require('../services/loan_term_method_payment.service')
const moment = require('moment')

const getRequestExtendLoanContractByID = async (idLoanContract) => {
  const reqExtend = await RequestExtendContractModel.findOne({
    where: { Loan_Contract_ID: idLoanContract }
  })
  return reqExtend
}

const putRequestExtendLoanContract = async (idLoanContract, status) => {
  try {
    const current = moment().format("YYYY-MM-DD HH:mm:ss");
    const result = await RequestExtendContractModel.update({
      Status: status,
      Confirm_Time: current
    }, {
      where: { Loan_Contract_ID: idLoanContract }
    })
    return result
  } catch {
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, 'Can not update Request Extend Contract')
  }

}
// 1 - đang chờ confirm, 2- confirm, 3- cancel
const CustomerConfirmAcceptRequestExtend = async (idLoanContract, ReqExtendstatus, idCustomer) => {
  try {
    const reqExtend = await getRequestExtendLoanContractByID(idLoanContract);
    if (ReqExtendstatus === 2 && reqExtend.Customer_ID === idCustomer && reqExtend.Status === 1) {
      await putRequestExtendLoanContract(idLoanContract, ReqExtendstatus)
      await loanContractService.update_loan_contract_invest(reqExtend.Customer_ID, reqExtend.Loan_Contract_ID, 2)
      const getLoan = await loanContractService.GetLoanContractByID(reqExtend.Loan_Contract_ID)
      await mainLoanContractService.ChangeStatusForMainLoanDone(getLoan.main_loan_contract_id)
      return true
    }
    return false
  } catch (error) {
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, error.message)
  }
}

const CustomerConfirmCancelRequestExtend = async (idLoanContract, ReqExtendstatus, idCustomer) => {
  try {
    const reqExtend = await getRequestExtendLoanContractByID(idLoanContract);
    if (ReqExtendstatus === 3 && reqExtend.Customer_ID === idCustomer && reqExtend.Status === 1) {
      await loanContractService.UpdateLoanContractStatus(idLoanContract, 1)
      await putRequestExtendLoanContract(idLoanContract, ReqExtendstatus)
      return true
    }
    return false
  } catch {
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, 'Can not confirm Request Extend')
  }
}

const GetLoanContractExtendOfCustomer = async (idCustomer) => {
  const listReqExtend = await RequestExtendContractModel.findAll({
    include: [
      { model: loanContractModel, as: 'Loan_Contract' }
    ],

    where: {
      Customer_ID: idCustomer,
      Status: 1
    }
  })
  return listReqExtend
}

module.exports = { CustomerConfirmAcceptRequestExtend, CustomerConfirmCancelRequestExtend, GetLoanContractExtendOfCustomer }
