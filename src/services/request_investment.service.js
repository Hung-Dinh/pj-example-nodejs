const db = require('../models/init-models');
const { ThrowError } = require('../utils/helper/response');
const { CONSTANTS } = require('../constants/constants');
const moment = require('moment');
const { Op } = require("sequelize");
const loanContractService = require('../services/loan_contract.service')
const loanRateService = require('./loan_rate.service')
const loanTermMethodPaymentService = require('./loan_term_method_payment.service')

const RequestInvestmentModel = db.request_investment_auto;
const RequestInvestmentChangeModel = db.request_investment_auto_change_status;
const RequestInvestmentStatusModel = db.request_investment_auto_status;
const loanTermModel = db.loan_term;
const loanRateModel = db.loan_rate;
const loanContractModel = db.loan_contract;
const Loan_term_method_payment = db.loan_term_method_payment;
const customerModel = db.customer;
const Loan_term = db.loan_term;
const Method_payment = db.method_payment;
const loanContractStatusChangeModel = db.loan_contract_status_change
const Loan_contract = db.loan_contract
const mainLoanContractModel = db.main_loan_contract
const schedule = require('node-schedule')

let Request_code = 1
const resetContractNumber = schedule.scheduleJob('0 0 0 * * *', async () => {
  Request_code = 1
})

const GetTerm = async (id) => {
  const loanTerm = await loanTermModel.findOne({
    where: {
      ID: id
    }
  });

  return loanTerm.Term_Name;
}

const GetReqInvestmentForUser = async (id, status) => {
  try {
    const requestInvestments = await RequestInvestmentModel.findAll({
      where: {
        CUSTOMER_ID: id,
        status_ID: status
      }
    });
    let listReq = [];
    for (const item of requestInvestments) {
      listReq.push({
        ID: item.ID,
        amount: item.Amount,
        code: item.Request_code,
        status: item.status_ID,
        term: await GetTerm(item.Loan_Term_ID),
        rate: item.Loan_Rate,
        description: item.Description
      })
    }

    return listReq;

  } catch (error) {
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, CONSTANTS.ERROR);
  }
};

const GetReqInvestmentForAdmin = async (status) => {
  try {
    const requestInvestments = await RequestInvestmentModel.findAll({
      include: [
        { model: customerModel, as: 'CUSTOMER' }
      ],
      where: {
        status_ID: status
      }
    });
    let listReq = [];
    for (const item of requestInvestments) {
      listReq.push({
        ID: item.ID,
        phoneNumber: item.CUSTOMER.PhoneNumber,
        fullName: item.CUSTOMER.Last_Name + ' ' + item.CUSTOMER.First_Name,
        amount: item.Amount,
        code: item.Request_code,
        status: item.status_ID,
        term: await GetTerm(item.Loan_Term_ID),
        rate: item.Loan_Rate,
        description: item.Description
      })
    }

    return listReq;

  } catch (error) {
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, error.message);
  }
};

const GetReqInvestmentClosed = async (id) => {
  try {
    const requestInvestments = await RequestInvestmentModel.findAll({
      where: {
        CUSTOMER_ID: id,
        status_ID: [5, 6]
      }
    });

    let listReq = [];
    for (const item of requestInvestments) {
      listReq.push({
        ID: item.ID,
        amount: item.Amount,
        code: item.Request_code,
        status: item.status_ID,
        term: await GetTerm(item.Loan_Term_ID),
        rate: item.Loan_Rate_ID,
        description: item.Description
      })
    }

    return listReq;

  } catch (error) {
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, CONSTANTS.ERROR);
  }
};


const GetDetailReqInvestment = async (idReq) => {
  try {
    const loanContract = await loanContractModel.findAll({
      include: [
        {
          model: Loan_term_method_payment, as: 'Loan_Term_Method_Payment',
          include: [
            { model: Loan_term, as: 'Loan_Term' },
            { model: Method_payment, as: 'Method_Payment' }
          ]
        },
        {
          model: customerModel,
          as: 'Borrower',
          attributes: ['First_Name', 'Last_Name']
        }
      ],
      where: {
        Request_Investment_Auto_ID: idReq
      }
    });
    let listLoanContract = [];
    for (const item of loanContract) {
      listLoanContract.push({
        ID: item.ID,
        amount: item.Amount,
        code: item.Contract_Number,
        borrower: item.Borrower.First_Name + ' ' + item.Borrower.Last_Name,
        lender_id: item.Lender_ID,
        status: item.Loan_Contract_Status_ID,
        Rate: item.Loan_Rate,
        Fee: item.Loan_Fee,
        method_payment: item.Loan_Term_Method_Payment.Method_Payment.Payment_Name,
        loan_term: item.Loan_Term_Method_Payment.Loan_Term.Term_Name,
        description: item.Descriptions
      })
    }

    return listLoanContract;

  } catch (error) {
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, CONSTANTS.ERROR);
  }
};

const CreateReqInvestment = async (customerID, amount, term_id, rate_value) => {
  try {
    const current = moment().format('YYYYMMDD')
    const listReqInvestmentAuto = await RequestInvestmentModel.findAndCountAll({
      where: {
        Request_code: {
          [Op.like]: `%${current}%`
        }
      }
    })
    if (listReqInvestmentAuto.count == 0) {
      Request_code = 1
    }
    else {
      Request_code = listReqInvestmentAuto.count + 1
    }

    const reqInvestment = await RequestInvestmentModel.create({
      Amount: amount,
      CUSTOMER_ID: customerID,
      Request_code: "M4U" + `_${current}_${Request_code}/DTTD`,
      Loan_Term_ID: term_id,
      Loan_Rate: rate_value,
      status_ID: 1
    });

    const reqInvestmentChange = await RequestInvestmentChangeModel.create({
      Request_Investment_Auto_ID: reqInvestment.ID,
      Request_Investment_Auto_Status_ID: 1,
      Status_Date: moment().format("YYYY-MM-DD HH:mm:ss"),
    })
    return reqInvestment;
  } catch (error) {
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, error.message);
  }
}

const createLoanContractStatusChange = async (loan_contract_id, statusID, statusDate) => {
  const status_change = await loanContractStatusChangeModel.create({
    Loan_Contract_Status_ID: statusID,
    Loan_Contract_ID: loan_contract_id,
    Status_Date: statusDate
  })
  return status_change

}

const update_LenderID = async (lender_id, loan_contract_id, statusID) => {
  const loan_contract = await Loan_contract.update(
    {
      Lender_ID: lender_id,
      Loan_Contract_Status_ID: statusID
    },
    {
      where: {
        ID: loan_contract_id
      }
    })
  return loan_contract
}

const UpdateInvestmentAutoStatus = async (idReq, statusID) => {
  const reqInvestment = await RequestInvestmentModel.update(
    {
      status_ID: statusID,
    }, {
    where: {
      ID: idReq
    }
  })

  const reqInvestmentChange = await RequestInvestmentChangeModel.create({
    Request_Investment_Auto_ID: idReq,
    Request_Investment_Auto_Status_ID: statusID,
    Status_Date: moment().format("YYYY-MM-DD HH:mm:ss"),
  })
  return reqInvestment;
}

const removeLoanContractFromInvestmentAuto = async (idReq) => {
  const loanContract = await loanContractModel.update(
    {
      Request_Investment_Auto_ID: null
    }, {
    where: {
      Request_Investment_Auto_ID: idReq
    }
  })
  return true
}

const GetRequestInvestmentByID = async (idReq) => {
  const ReqInvestment = await RequestInvestmentModel.findOne(
    {
      where: { ID: idReq }
    })
  return ReqInvestment
}

const updateAmountActual = async (idReq, amountActual) => {
  try {
    const ReqInvestment = await RequestInvestmentModel.update({
      Amount: amountActual
    }, {
      where: { ID: idReq }
    })
  }
  catch (error) {
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, error.message);
  }
}

const GetListInvesmentAuto = async (id, status_id) => {
  try {
    const ListInvesmentAuto = await RequestInvestmentModel.findAll({
      where: {
        CUSTOMER_ID: id,
        status_ID: status_id
      }
    });
    let listReq = [];
    for (const item of ListInvesmentAuto) {
      listReq.push({

        ID: item.ID,
        amount: item.Amount,
        code: item.Request_code,
        term: await GetTerm(item.Loan_Term_ID),
        rate: item.Loan_Rate,
        description: item.Description

      })
    }

    return listReq;

  } catch (error) {
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, error.message);
  }
};

const GetLoanForRequest = async (idReq) => {
  try {
    //false
    const ReqInvestment = await GetRequestInvestmentByID(idReq);
    const ListRateID = await loanRateService.getListLoanRateForRequestInvestmentAuto(ReqInvestment.Loan_Rate)

    const ListLoanTermMethodPayment = await loanTermMethodPaymentService.getLoanTermMethodPaymentForRequestInvestmentAuto(ReqInvestment.Loan_Term_ID, ListRateID)
    // const LoanTermMethodPayment = await Loan_term_method_payment.findOne({
    //   where: {
    //     Loan_Term_ID: ReqInvestment.Loan_Term_ID,
    //     Loan_Rate_ID: ReqInvestment.Loan_Rate_ID
    //   }
    // })
    const loanContracts = await loanContractModel.findAll({
      include: [
        {
          model: Loan_term_method_payment, as: 'Loan_Term_Method_Payment',
          include: [
            { model: Loan_term, as: 'Loan_Term' },
            { model: Method_payment, as: 'Method_Payment' }
          ]
        },
        {
          model: customerModel,
          as: 'Borrower',
          attributes: ['First_Name', 'Last_Name']
        },
        {
          model: mainLoanContractModel, as:'Main_Loan_Contract'
        }
      ],
      where: {
        Amount: { [Op.lte]: ReqInvestment.Amount },
        Lender_ID: null,
        Request_Investment_Auto_ID: null,
        Loan_Term_Method_Payment_ID: ListLoanTermMethodPayment
      }
    })
    let listLoanContract = [];
    for (const item of loanContracts) {
      listLoanContract.push({
        ID: item.ID,
        amount: item.Amount,
        code: item.Contract_Number,
        borrower: item.Borrower.Last_Name + ' ' + item.Borrower.First_Name,
        lender_id: item.Lender_ID,
        status: item.Loan_Contract_Status_ID,
        Rate: item.Loan_Rate,
        Fee: item.Loan_Fee,
        method_payment: item.Loan_Term_Method_Payment.Method_Payment.Payment_Name,
        loan_term: item.Loan_Term_Method_Payment.Loan_Term.Term_Name,
        deadline_disbursement: item.Main_Loan_Contract.Deadline_Disbursement_Date,
        description: item.Descriptions
      })
    }
    return listLoanContract
  }
  catch (error) {
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, error.message);
  }
}

const InsertLoanToRequestInvestment = async (idReq, listIDLoan) => {
  try {
    const getRequestInvestment = await GetRequestInvestmentByID(idReq);
    let sum = 0;
    if (getRequestInvestment) {
      for (let item of listIDLoan) {
        const loan = await loanContractService.GetLoanContractByID(item)
        sum += loan.loan_amount
      }
      if (sum > getRequestInvestment.Amount) {
        return ThrowError(CONSTANTS.HTTP_CODE.ERROR, 'Tổng số tiền vượt quá hợp đồng yêu cầu !');
      }
      else {
        for (let item of listIDLoan) {
          await loanContractService.UpdateRequestInvestmentID(item, idReq)
        }
        await UpdateInvestmentAutoStatus(idReq, 2)
      }
      return true;
    }
  } catch (error) {
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, error.message);
  }
}

module.exports = {
  GetReqInvestmentForUser,
  GetReqInvestmentForAdmin,
  GetReqInvestmentClosed,
  GetDetailReqInvestment,
  CreateReqInvestment,
  createLoanContractStatusChange,
  update_LenderID,
  UpdateInvestmentAutoStatus,
  removeLoanContractFromInvestmentAuto,
  GetRequestInvestmentByID,
  updateAmountActual,
  GetListInvesmentAuto,
  GetLoanForRequest,
  InsertLoanToRequestInvestment
}