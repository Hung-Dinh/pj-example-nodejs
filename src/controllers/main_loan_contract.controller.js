const { ApiResponse } = require('../utils/helper/response');
const { CONSTANTS } = require('../constants/constants');
const mainLoanContractService = require('../services/main_loan_contract.service')
const loanContractService = require('../services/loan_contract.service');
const db = require('../models/init-models');
const notificationModel = db.notification
const { Op } = require('sequelize')
const schedule = require('node-schedule')
const notificationService = require("../services/notifications.service")
const sampleNotify = require('../constants/notifications')
const sampleNotifySMS = require('../constants/smsNotify')
const accountService = require('../services/account.service')
const mainLoanContractModel = db.main_loan_contract

const moment = require('moment')

let contractNumber = 1
const resetContractNumber = schedule.scheduleJob('0 0 0 * * *', async () => {
  contractNumber = 1
})

const checkDisbursement = schedule.scheduleJob('0 0 8 * * *', async () => {

  const listMainContracts = await mainLoanContractService.GetMainLoanContractByStatus(1)

  // Cancel after 24 hours
  let listMainLoanAutoCancel = []
  for (const item of listMainContracts) {
    if (item.loan_contract_invested_count > 0) {
      if (moment() = moment(item.Deadline_Disbursement_Date).add(32, 'hour')) {
        listMainLoanAutoCancel.push({
          loan_objective: item.loan_objective,
          amount: item.amount,
          contract_number: item.contract_number,
          status: item.status,
          borrower_id: item.borrower_id,
          loan_rate: item.loan_rate,
          disbursement_before: item.disbursement_before,
          loan_term: item.loan_term,
          loan_id: item.loan_id,
          method_payment: item.method_payment,
          loan_contract_invested_count: item.loan_contract_invested_count,
          loan_contract_count: item.loan_contract_count,
          Deadline_Disbursement_Date: item.Deadline_Disbursement_Date,
          Disbursement_Date: item.Disbursement_Date,
          Payment_Due_Date: item.Payment_Due_Date,
        })
      }
    }
  }

  for (const item of listMainLoanAutoCancel) {
    await mainLoanContractService.MainLoanContractCancel(item.loan_id, item.borrower_id)
  }

  // Send notification to user when overdue disbursement date
  let listMainLoanWaitting = []
  for (const item of listMainContracts) {
    if (item.loan_contract_invested_count > 0) {
      if (item.Deadline_Disbursement_Date < moment() && moment() < moment(item.Deadline_Disbursement_Date).add(2, 'days')) {
        listMainLoanWaitting.push({
          loan_objective: item.loan_objective,
          amount: item.amount,
          contract_number: item.contract_number,
          status: item.status,
          borrower_id: item.borrower_id,
          loan_rate: item.loan_rate,
          disbursement_before: item.disbursement_before,
          loan_term: item.loan_term,
          loan_id: item.loan_id,
          method_payment: item.method_payment,
          loan_contract_invested_count: item.loan_contract_invested_count,
          loan_contract_count: item.loan_contract_count,
          Deadline_Disbursement_Date: item.Deadline_Disbursement_Date,
          Disbursement_Date: item.Disbursement_Date,
          Payment_Due_Date: item.Payment_Due_Date,
        })
      }
    }
  }

  for (const item of listMainLoanWaitting) {
    await notificationModel.create({
      To_User_ID: item.borrower_id,
      Notification_Date: moment().format("YYYY-MM-DD HH:mm:ss"),
      Notification_Status_ID: 1,
      Notification_Content: `Khoản vay có mã ${item.contract_number} của bạn chưa đủ, bạn có muốn tiếp tục vay không ? (Hợp đồng sẽ tự hủy sau 24h kể từ khi nhận thông báo này!) `
    })
  }
})

const GetAllMainLoanContractOfCustomer = async (req, res) => {
  try {
    const borrowerID = req.ID
    const waitingContract = await mainLoanContractService.GetContractByStatus([1, 6, 2], borrowerID);
    const closedContract = await mainLoanContractService.GetContractByStatus([4, 5], borrowerID);
    const mainLoanContract = await mainLoanContractService.GetContractByStatus(3, borrowerID);

    return ApiResponse(
      res,
      true,
      CONSTANTS.HTTP_CODE.SUCCESS,
      CONSTANTS.SUCCESS,
      {
        waiting_contract: waitingContract,
        closed_contract: closedContract,
        loan_contract: mainLoanContract
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

const GetMainLoanContractByID = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const mainLoanContracts = await mainLoanContractService.GetMainLoanContractByID(id)
    return ApiResponse(
      res,
      true,
      CONSTANTS.HTTP_CODE.SUCCESS,
      CONSTANTS.SUCCESS,
      mainLoanContracts
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

const CreateMainLoanContract = async (req, res) => {
  try {
    const contract_date = moment().format("YYYY-MM-DD HH:mm:ss");
    const {
      amount,
      loan_term_id,
      method_payment_id,
      loan_objective_id,
      deadline_date_disbursement,
      description
    } = req.body;

    const current = moment().format('YYYYMMDD')
    const listMainContracts = await mainLoanContractModel.findAndCountAll({
      where: {
        Contract_Number: {
          [Op.like]: `%${current}%`
        }
      }
    })
    if (listMainContracts.count == 0) {
      contractNumber = 1
    }
    else {
      contractNumber = listMainContracts.count + 1
    }

    const borrowerID = req.ID
    const mainLoanContracts = await mainLoanContractService.CreateMainLoanContract(
      borrowerID,
      amount,
      loan_term_id,
      method_payment_id,
      loan_objective_id,
      deadline_date_disbursement,
      description,
      contract_date,
      contractNumber
    )

    if (mainLoanContracts) {
      await mainLoanContractService.CreateMainLoanStatusChange(
        mainLoanContracts.ID,
        mainLoanContracts.Main_Loan_Status_ID,
        contract_date
      )
    }
    contractNumber++
    return ApiResponse(
      res,
      true,
      CONSTANTS.HTTP_CODE.SUCCESS,
      CONSTANTS.SUCCESS,
      mainLoanContracts
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

const UpdateMainLoanContract = async (req, res) => {
  try {
    const {
      id,
      mainLoanStatusID,
      contractNumber,
      borrowerID,
      contractDate,
      amount,
      loanTermID,
      loanObjectiveID,
      descriptions
    } = req.body;

    const mainLoanContracts = await mainLoanContractService.UpdateMainLoanContract(
      id,
      mainLoanStatusID,
      contractNumber,
      borrowerID,
      contractDate,
      amount,
      loanTermID,
      loanObjectiveID,
      descriptions
    );

    return ApiResponse(
      res,
      true,
      CONSTANTS.HTTP_CODE.SUCCESS,
      CONSTANTS.SUCCESS,
      mainLoanContracts
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

const GetMainLoanContractsByIDAccount = async (req, res) => {
  try {
    const id = req.ID;
    const mainLoanContracts = await mainLoanContractService.GetMainLoanContractsByIDAccount(id);

    return ApiResponse(
      res,
      true,
      CONSTANTS.HTTP_CODE.SUCCESS,
      CONSTANTS.SUCCESS,
      mainLoanContracts
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

const GetLoanContractByMainLoanID = async (req, res) => {
  try {
    const { idMain } = req.query
    const loan_contracts = await loanContractService.GetLoanContractInMainLoan(idMain);
    if (loan_contracts) {
      return ApiResponse(
        res,
        true,
        CONSTANTS.HTTP_CODE.SUCCESS,
        CONSTANTS.SUCCESS,
        loan_contracts
      );
    } else {
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

const MainLoanContractCancel = async (req, res) => {
  try {
    const borrowerID = req.ID
    const { idMainLoan } = req.body
    const result = await mainLoanContractService.MainLoanContractCancel(idMainLoan, borrowerID)
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

const MainLoanContractCancelForAdmin = async (req, res) => {
  try {
    const { idMainLoan } = req.body
    const result = await mainLoanContractService.MainLoanContractCancelForAdmin(idMainLoan)
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

const MainLoanConfirmationForAdmin = async (req, res) => {
  try {
    const { idMainLoan } = req.body
    const result = await mainLoanContractService.MainLoanConfirmationForAdmin(idMainLoan)
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

const GetAllMainLoanContractForAdminDivision = async (req, res) => {
  try {
    const listMainLoan = await mainLoanContractService.GetAllMainLoanContractForAdminDivision()
    if (listMainLoan) {
      return ApiResponse(
        res,
        true,
        CONSTANTS.HTTP_CODE.SUCCESS,
        CONSTANTS.SUCCESS,
        listMainLoan
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

const RequestExtendContract = async (req, res) => {
  const borrowerID = req.ID
  const { idMainLoan } = req.body
  try {
    const reqExtend = await mainLoanContractService.Request_Extend_Contract(idMainLoan, borrowerID)
    // const getMainLoan = await mainLoanContractService.GetMainLoanContractByID(idMainLoan)
    if (reqExtend) {
      // await notificationService.sendNotifyClient(borrowerID, 7, sampleNotify.request_expire(getMainLoan.contract_number))
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

const AdminApproveExtendContract = async (req, res) => {
  const { idMainLoan } = req.body
  try {
    const reqExtend = await mainLoanContractService.AdminApproveExtendContract(idMainLoan)
    if (reqExtend) {
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

const getListMainLoanDoneForAdminConfirm = async (req, res) => {
  try {
    const listMainLoanDone = await mainLoanContractService.getListMainLoanDoneForAdminConfirm()
    return ApiResponse(
      res,
      true,
      CONSTANTS.HTTP_CODE.SUCCESS,
      CONSTANTS.SUCCESS,
      listMainLoanDone
    );
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


const GetAllMainLoanContractForDisbursement = async (req, res) => {
  try {
    const listMainLoan = await mainLoanContractService.getListMainLoanDoneForAdminConfirm()
    console.log('listMainLoan')
    if (listMainLoan) {
      return ApiResponse(
        res,
        true,
        CONSTANTS.HTTP_CODE.SUCCESS,
        CONSTANTS.SUCCESS,
        listMainLoan
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

const GetAllMainLoanContractForExtension = async (req, res) => {
  try {
    const listMainLoan = await mainLoanContractService.getListMainLoanWaitingForExtension()
    if (listMainLoan) {
      return ApiResponse(
        res,
        true,
        CONSTANTS.HTTP_CODE.SUCCESS,
        CONSTANTS.SUCCESS,
        listMainLoan
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

const GetAllMainLoanContractForDivision = async (req, res) => {
  try {
    const listMainLoan = await mainLoanContractService.getListMainLoanDivision()
    if (listMainLoan) {
      return ApiResponse(
        res,
        true,
        CONSTANTS.HTTP_CODE.SUCCESS,
        CONSTANTS.SUCCESS,
        listMainLoan
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

const GetAllMainLoanContractForCancel = async (req, res) => {
  try {
    const listMainLoan = await mainLoanContractService.getListMainLoanCancel()
    if (listMainLoan) {
      return ApiResponse(
        res,
        true,
        CONSTANTS.HTTP_CODE.SUCCESS,
        CONSTANTS.SUCCESS,
        listMainLoan
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

const getAllListMainLoanDisbursed = async (req, res) => {
  try {
    const listMainLoan = await mainLoanContractService.getListMainLoanDisbursed()
    if (listMainLoan) {
      return ApiResponse(
        res,
        true,
        CONSTANTS.HTTP_CODE.SUCCESS,
        CONSTANTS.SUCCESS,
        listMainLoan
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


const GetSettlementList = async (req, res) => {
  try {
    const listMainLoan = await mainLoanContractService.SettlementListForAdmin()
    if (listMainLoan) {
      return ApiResponse(
        res,
        true,
        CONSTANTS.HTTP_CODE.SUCCESS,
        CONSTANTS.SUCCESS,
        listMainLoan
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

const ReqPaymentOfCustomer = async (req, res) => {
  try {
    const idCustomer = req.ID
    const { idMainLoan } = req.body
    const reqPayment = await mainLoanContractService.ReqPaymentOfCustomer(idCustomer, idMainLoan)
    if (reqPayment) {
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

const m4uPaymentForCustomer = async (req, res) => {
  try {
    const { idMainLoan } = req.body
    const reqPayment = await mainLoanContractService.m4uPaymentForCustomer(100, idMainLoan)
    if (reqPayment) {
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

const GetListOverDueContractForAdmin = async (req, res) => {
  try {
    const listOverDueContract = await mainLoanContractService.GetListOverDueContractForAdmin()
    if (listOverDueContract) {
      return ApiResponse(
        res,
        true,
        CONSTANTS.HTTP_CODE.SUCCESS,
        CONSTANTS.SUCCESS,
        listOverDueContract
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

const GetListSettlementContractForAdmin = async (req, res) => {
  try {
    const listOverDueContract = await mainLoanContractService.GetListSettlementContractForAdmin()
    if (listOverDueContract) {
      return ApiResponse(
        res,
        true,
        CONSTANTS.HTTP_CODE.SUCCESS,
        CONSTANTS.SUCCESS,
        listOverDueContract
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




const GetAllMainLoanContractForAdminView = async (req, res) => {
  try {
    const listMainContract = await mainLoanContractService.GetAllMainLoanContractForAdminView()
    if (listMainContract) {
      return ApiResponse(
        res,
        true,
        CONSTANTS.HTTP_CODE.SUCCESS,
        CONSTANTS.SUCCESS,
        listMainContract
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

const GetMainLoanContractDetailByAdmin = async (req, res) => {
  try {
    const { idMain } = req.query
    const mainloancontract = await mainLoanContractService.GetMainLoanContractDetailByAdmin(idMain);
    if (mainloancontract) {
      return ApiResponse(
        res,
        true,
        CONSTANTS.HTTP_CODE.SUCCESS,
        CONSTANTS.SUCCESS,
        mainloancontract
      );
    } else {
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

const GetMainLoanContractWaittingCancel = async (req, res) => {
  try {
    const mainloancontract = await mainLoanContractService.GetListMainLoanByStatusID(11);
    if (mainloancontract) {
      return ApiResponse(
        res,
        true,
        CONSTANTS.HTTP_CODE.SUCCESS,
        CONSTANTS.SUCCESS,
        mainloancontract
      );
    } else {
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

const putMainLoanContractWaittingCancel = async (req, res) => {
  try {
    const { idMainLoan, descriptions } = req.body
    const mainLoan = await mainLoanContractService.GetMainLoanContractByID(idMainLoan)
    console.log(mainLoan)
    if (mainLoan.status_id === 1 || mainLoan.status_id === 2 || mainLoan.status_id === 6) {
      await mainLoanContractService.UpdateMainLoanDescription(idMainLoan, descriptions)
      const result = await mainLoanContractService.UpdateStatusMainLoan(idMainLoan, mainLoan.status_id, 11)
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
    }
    else if (mainLoan.status_id === 7) {
      await mainLoanContractService.UpdateMainLoanDescription(idMainLoan, descriptions)
      const result = await mainLoanContractService.UpdateStatusMainLoan(idMainLoan, mainLoan.status_id, 3)
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
    }
    else {
      return ApiResponse(
        res,
        false,
        CONSTANTS.HTTP_CODE.ERROR,
        'CAN NOT CANCEL THIS CONTRACT'
      )
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

const ContinueToBorrow = async (req, res) => {
  try {
    const { idMainLoan } = req.body
    const result = await mainLoanContractService.ContinueToBorrow(idMainLoan)
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

module.exports = {
  GetAllMainLoanContractOfCustomer,
  GetMainLoanContractByID,
  CreateMainLoanContract,
  UpdateMainLoanContract,
  GetMainLoanContractsByIDAccount,
  GetLoanContractByMainLoanID,
  MainLoanContractCancel,
  MainLoanContractCancelForAdmin,
  MainLoanConfirmationForAdmin,
  RequestExtendContract,
  GetAllMainLoanContractForAdminDivision,
  AdminApproveExtendContract,
  getListMainLoanDoneForAdminConfirm,
  GetAllMainLoanContractForDisbursement,
  GetAllMainLoanContractForExtension,
  GetAllMainLoanContractForDivision,
  GetAllMainLoanContractForCancel,
  GetSettlementList,
  ReqPaymentOfCustomer,
  m4uPaymentForCustomer,
  getAllListMainLoanDisbursed,
  GetListOverDueContractForAdmin,
  GetAllMainLoanContractForAdminView,
  GetMainLoanContractDetailByAdmin,
  GetMainLoanContractWaittingCancel,
  putMainLoanContractWaittingCancel,
  ContinueToBorrow,
  GetListSettlementContractForAdmin,
}
