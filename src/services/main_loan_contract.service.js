const db = require('../models/init-models');
const { ThrowError } = require('../utils/helper/response');
const { CONSTANTS } = require('../constants/constants');

const accountModel = db.account
const accountTransactionModel = db.account_transaction
const accountTranSactionStatusModel = db.account_trannsaction_status
const mainLoanContractModel = db.main_loan_contract;
const customerModel = db.customer;
const loanObjectiveModel = db.loan_objective;
const loanTermModel = db.loan_term;
const mainLoanContractStatusModel = db.main_loan_contract_status;
const loanContractModel = db.loan_contract
const loanContractStatusChangeModel = db.loan_contract_status_change
const mainLoanContractStatusChangeModel = db.main_loan_contract_status_change
const requestExtendLoanContractModel = db.request_extend_loan_contract
const methodPaymentModel = db.method_payment
const loanTermMethodPayment = db.loan_term_method_payment
const customer_service = require('./customer.services')
const accountTransactionService = require('./account_transaction.service')
const loanContractService = require('../services/loan_contract.service')
const AccountLoanService = require('../services/account_loan.service')
const PaymentScheduleService = require('../services/payment_schedule.service')
const AccountService = require('./account.service')
const { getRateAndFee, getLoanTermMethodPaymentByID } = require('../services/loan_term_method_payment.service')
const { Op } = require("sequelize");
const sequelize = require('sequelize')
const AccountBlockService = require('../services/account_block.service')
const AccountLoanLimitationService = require('../services/account_loan_limitation.service')
const AccountinvestmentService = require('../services/account_investment.service')
const { createSchedule } = require('../services/payment_schedule.service')
const moment = require('moment')

const GetStatus = async (id) => {
  const status = await mainLoanContractStatusModel.findOne({
    where: { ID: id }
  })
  return status.Status_Name
}

const getCountLoanInvested = async (ID) => {
  const { count } = await loanContractModel.findAndCountAll({
    where: { Main_Loan_Contract_ID: ID, Lender_ID: !null }
  })
  return count
}

const CreateMainLoanStatusChange = async (main_loan_contract_id, status_id, statusDate) => {
  const status_change = await mainLoanContractStatusChangeModel.create({
    Main_Loan_Contract_Status_ID: status_id,
    Main_Contract_ID: main_loan_contract_id,
    Status_Date: statusDate
  })
  return status_change
}

const GetMainLoanInTableByID = async (ID) => {
  const MainLoan = await mainLoanContractModel.findOne({
    where: { ID: ID }
  })
  return MainLoan
}

const FindMainLoanContract = async (idMainLoanContract) => {
  const mainLoanContract = await mainLoanContractModel.findOne({
    where: { ID: idMainLoanContract }
  });
  return mainLoanContract;
}

const getCountInMainLoan = async (ID) => {
  const { count } = await loanContractModel.findAndCountAll({
    where: { Main_Loan_Contract_ID: ID }
  })
  return count
}

const GetAllMainLoanContractForAdminDivision = async () => {
  try {
    const mainLoanContracts = await mainLoanContractModel.findAll({
      include: [
        {
          model: loanObjectiveModel,
          as: 'Loan_Objective',
          attributes: ['Loan_Objective_Name']
        }, {
          model: loanTermModel,
          as: 'Loan_Term',
          attributes: ['Term_Name']
        }, {
          model: customerModel,
          as: 'Borrower',
          attributes: ['First_Name', 'Last_Name']
        }
      ],
      where: {
        Main_Loan_Status_ID: 6
      }
    });

    let listContract = [];
    for (const item of mainLoanContracts) {
      listContract.push({
        id: item.ID,
        status: item.Main_Loan_Status_ID,
        contract_number: item.Contract_Number,
        borrower: item.Borrower.Last_Name + ' ' + item.Borrower.First_Name,
        contract_date: item.Contract_Date,
        amount: item.Amount,
        loan_term: item.Loan_Term.Term_Name,
        loan_objective: item.Loan_Objective.Loan_Objective_Name,
        description: item.description
      })
    }

    return listContract;

  } catch (error) {
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, CONSTANTS.ERROR);
  }
};

const GetMainLoanContractByID = async (id) => {
  try {
    const mainLoanContract = await mainLoanContractModel.findOne({
      include: [{
        model: loanObjectiveModel,
        as: 'Loan_Objective',
        attributes: ['Loan_Objective_Name']
      }, {
        model: loanTermModel,
        as: 'Loan_Term',
        attributes: ['Term_Name']
      }, {
        model: customerModel,
        as: 'Borrower',
        attributes: ['First_Name', 'Last_Name']
      }],
      where: {
        ID: id
      }
    });

    if (!mainLoanContract) {
      return ThrowError(CONSTANTS.HTTP_CODE.NOT_FOUND_ERR, "MAIN LOAN CONTRACT DOES NOT EXIST");
    }

    return {
      id: mainLoanContract.ID,
      status: await GetStatus(mainLoanContract.Main_Loan_Status_ID),
      contract_number: mainLoanContract.Contract_Number,
      borrower: mainLoanContract.Borrower.Last_Name + ' ' + mainLoanContract.Borrower.First_Name,
      contract_date: mainLoanContract.Contract_Date,
      amount: mainLoanContract.Amount,
      loan_term: mainLoanContract.Loan_Term.Term_Name,
      loan_objective: mainLoanContract.Loan_Objective.Term_Name,
      description: mainLoanContract.description,
      status_id: mainLoanContract.Main_Loan_Status_ID,
      payment_due_date: mainLoanContract.Payment_Due_Date
    };
  } catch (error) {
    return ThrowError(error.code, error.message);
  }
}

const GetMainLoanContractsByIDAccount = async (id, status_id) => {
  try {
    const customer = await customer_service.getCustomerByID(id)
    if (!customer) {
      return ThrowError(CONSTANTS.HTTP_CODE.NOT_FOUND_ERR, "ID ACCOUNT DOES NOT EXIST")
    }
    const mainLoanContracts = await mainLoanContractModel.findAll({
      include: [{
        model: loanObjectiveModel,
        as: 'Loan_Objective',
        attributes: ['Loan_Objective_Name']
      }, {
        model: loanTermModel,
        as: 'Loan_Term',
        attributes: ['Term_Name']
      }, {
        model: customerModel,
        as: 'Borrower',
        attributes: ['First_Name', 'Last_Name']
      }],
      where: {
        Borrower_ID: customer.ID,
        Main_Loan_Status_ID: status_id
      }
    });

    if (!mainLoanContracts) {
      return ThrowError(CONSTANTS.HTTP_CODE.NOT_FOUND_ERR, "BORROWER DOES NOT EXIST");
    }

    let listContract = [];
    for (const item of mainLoanContracts) {
      listContract.push({
        id: item.ID,
        contract_number: item.Contract_Number,
        borrower: item.Borrower.Last_Name + ' ' + item.Borrower.First_Name,
        contract_date: item.Contract_Date,
        amount: item.Amount,
        loan_term: item.Loan_Term.Term_Name,
        loan_objective: item.Loan_Objective.Loan_Objective_Name,
        Method_Payment_ID: item.Method_Payment_ID,
        Deadline_Disbursement_Date: item.Deadline_Disbursement_Date,
        Disbursement_Date: item.Disbursement_Date,
        Payment_Due_Date: item.Payment_Due_Date,
        description: item.description
      })
    }

    return listContract;

  } catch (error) {
    return ThrowError(error.code, error.message);
  }

}

const CreateMainLoanContract = async (
  borrowerID,
  amount,
  loan_term_id,
  method_payment_id,
  loan_objective_id,
  deadline_date_disbursement,
  description,
  contract_date,
  contractNumber
) => {
  const loanLimitation = await AccountLoanLimitationService.findLoanLimitById(borrowerID)
  let contract_Number
  let deadline_disbursement = moment(deadline_date_disbursement)
  deadline_disbursement.set('hour', 23)
  deadline_disbursement.set('minute', 59)
  deadline_disbursement.set('second', 59)
  const current = moment().format('YYYYMMDD')
  if (amount <= loanLimitation.Amount_Release + loanLimitation.Amount_Debit) {
    contract_Number = 'M4U_' + current + '_' + contractNumber + '/THC'
  } else {
    contract_Number = 'M4U_' + current + '_' + contractNumber + '/TIC'
  }
  try {
    const getLoanLimitation = await AccountLoanLimitationService.getTotalLoanLimitByID(borrowerID)
    console.log(getLoanLimitation)
    if (getLoanLimitation < amount) {
      return ThrowError(CONSTANTS.HTTP_CODE.ERROR, "Hạn mức vay của bạn không đủ")
    }
    const mainLoanContract = await mainLoanContractModel.create({
      Amount: amount,
      Main_Loan_Status_ID: 6,
      Loan_Term_ID: loan_term_id,
      Method_Payment_ID: method_payment_id,
      Loan_Objective_ID: loan_objective_id,
      Contract_Number: contract_Number,
      Borrower_ID: borrowerID,
      Deadline_Disbursement_Date: deadline_disbursement,
      Contract_Date: contract_date,
      Descriptions: description,
    })
    await AccountLoanLimitationService.updateLoanLimitationChange(borrowerID, amount, contract_date)
    return mainLoanContract;
  } catch (error) {
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, error.message);
  }
};

const UpdateMainLoanContract = async (
  id,
  mainLoanStatusID,
  contractNumber,
  borrowerID,
  contractDate,
  amount,
  loanTermID,
  loanObjectiveID,
  descriptions
) => {
  try {
    const mainLoanContract = await FindMainLoanContract(id);
    if (!mainLoanContract) {
      return ThrowError(CONSTANTS.HTTP_CODE.ERROR, "MAIN LOAN CONTRACT DOES NOT EXIST");
    }
    const update = await mainLoanContractModel.update({
      Main_Loan_Status_ID: mainLoanStatusID,
      Contract_Number: contractNumber,
      Borrower_ID: borrowerID,
      Contract_Date: contractDate,
      Amount: amount,
      Loan_Term_ID: loanTermID,
      Loan_Objective_ID: loanObjectiveID,
      Descriptions: descriptions,
    }, {
      where: {
        ID: id
      }
    })
    return update;
  } catch (error) {
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, error.message);
  }
}

const GetWattingContract = async (borrowerID) => {
  try {
    const mainLoanContracts = await mainLoanContractModel.findAll({
      include: [
        {
          model: loanObjectiveModel,
          as: 'Loan_Objective',
          attributes: ['Loan_Objective_Name']
        }, {
          model: loanTermModel,
          as: 'Loan_Term',
          attributes: ['Term_Name']
        }, {
          model: customerModel,
          as: 'Borrower',
          attributes: ['First_Name', 'Last_Name']
        }
      ], where: {
        Main_Loan_Status_ID: [1, 2, 6],
        Borrower_ID: borrowerID
      }
    });

    let listContract = [];
    for (const item of mainLoanContracts) {
      listContract.push({
        loan_objective: item.Loan_Objective.Loan_Objective_Name,
        amount: item.Amount,
        contract_number: item.Contract_Number,
        status: item.Main_Loan_Status_ID,
        loan_rate: '18.5% - 14.500',
        disbursement_before: '2021-07-01',
        loan_contract_invested_count: await getCountLoanInvested(item.ID),
        loan_term: item.Loan_Term.Term_Name,
        loan_id: item.ID,
        method_payment: 'Trả lãi đầu kì',
        loan_contract_count: await getCountInMainLoan(item.ID)
      })
    }

    return listContract;

  } catch (error) {
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, CONSTANTS.ERROR);
  }
};

const GetContractByStatus = async (statusID, borrowerID) => {
  try {
    const mainLoanContracts = await mainLoanContractModel.findAll({
      include: [
        {
          model: loanObjectiveModel,
          as: 'Loan_Objective',
          attributes: ['Loan_Objective_Name']
        }, {
          model: loanTermModel,
          as: 'Loan_Term',
        }, {
          model: customerModel,
          as: 'Borrower',
          attributes: ['First_Name', 'Last_Name']
        }, {
          model: methodPaymentModel,
          as: 'Method_Payment'
        }
      ], where: {
        Main_Loan_Status_ID: statusID,
        Borrower_ID: borrowerID
      }
    });
    let listContract = [];
    for (const item of mainLoanContracts) {
      console.log(item)
      let RateAndFee = await getRateAndFee(item.Loan_Term.ID, item.Method_Payment.ID, item.Amount)
      const countLoan = await getCountLoanContract(item.ID)
      listContract.push({
        loan_objective: item.Loan_Objective.Loan_Objective_Name,
        amount: item.Amount,
        contract_number: item.Contract_Number,
        status: item.Main_Loan_Status_ID,
        loan_rate: RateAndFee.rate + ' - ' + RateAndFee.amountRate,
        disbursement_before: item.Deadline_Disbursement_Date,
        loan_term: item.Loan_Term.Term_Name,
        loan_id: item.ID,
        method_payment: item.Method_Payment.Payment_Name,
        loan_contract_invested_count: countLoan.loan_contract_invested_count,
        loan_contract_count: countLoan.loan_contract_count,
        Deadline_Disbursement_Date: item.Deadline_Disbursement_Date,
        Disbursement_Date: item.Disbursement_Date,
        Payment_Due_Date: item.Payment_Due_Date,

      })
    }

    return listContract;

  } catch (error) {
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, CONSTANTS.ERROR);
  }
};

const MainLoanContractCancel = async (ID, borrowerID) => {
  try {
    const current = moment().format("YYYY-MM-DD HH:mm:ss");
    const getMainLoan = await mainLoanContractModel.findOne({ where: { ID: ID } })
    const MainLoan = await mainLoanContractModel.update({
      Main_Loan_Status_ID: 5
    }, {
      where: {
        ID: ID
      }
    })

    if (MainLoan) {
      const LoanContract = await loanContractModel.findAll({ where: { Main_Loan_Contract_ID: ID, Borrower_ID: borrowerID } })
      if (LoanContract.length > 0) {
        for (let item of LoanContract) {
          await loanContractService.LoanContractCancel(item.ID, borrowerID)
          if (item.Lender_ID != null) {
            await AccountBlockService.CancelBlock(item.Lender_ID, item.Amount, `Hợp đồng bạn đầu tư ${item.ID} đã bị hủy`)
          }
        }
      }
      await AccountLoanLimitationService.LoanLimitationAfterCancelOrBorrow(borrowerID, getMainLoan.Amount, 0, 5, getMainLoan.Contract_Date)
      await CreateMainLoanStatusChange(ID, 5, current)
      return true
    }
  }
  catch (error) {
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, error.message)
  }
}

const MainLoanContractCancelForAdmin = async (ID) => {
  try {
    const current = moment().format("YYYY-MM-DD HH:mm:ss");
    const getMainLoan = await GetMainLoanInTableByID(ID);
    if (getMainLoan) {
      const MainLoan = await mainLoanContractModel.update({
        Main_Loan_Status_ID: 5
      }, {
        where: {
          ID: ID
        }
      })

      if (MainLoan) {
        const LoanContract = await loanContractModel.findAll({ where: { Main_Loan_Contract_ID: ID } })
        if (LoanContract.length > 0) {
          for (let item of LoanContract) {
            await loanContractService.LoanContractCancel(item.ID, item.Borrower_ID)
          }
        }
        await CreateMainLoanStatusChange(ID, 5, current)
        return true
      }
    }
    else {
      return ThrowError(CONSTANTS.HTTP_CODE.ERROR, CONSTANTS.ERROR)
    }
  }
  catch (error) {
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, error.message)
  }
}

const MainLoanDisbursement = async (idMainLoan) => {
  try {
    const current = moment().format("YYYY-MM-DD HH:mm:ss")
    const mainloan = await mainLoanContractModel.findOne({
      include: [
        { model: loanTermModel, as: 'Loan_Term' }
      ],
      where: { ID: idMainLoan }
    })

    const result = await mainLoanContractModel.update({
      Main_Loan_Status_ID: 3,
      Disbursement_Date: moment().format('YYYY-MM-DD HH:mm:ss'),
      Payment_Due_Date: moment().add(mainloan.Loan_Term.Term_Value, 'days')
    }, { where: { ID: idMainLoan } })
    if (result) {
      await CreateMainLoanStatusChange(idMainLoan, 3, current);
    }
    return true
  }
  catch (error) {
    ThrowError(CONSTANTS.HTTP_CODE.ERROR, error.message)
  }

}

const MainLoanConfirmationForAdmin = async (idMainLoan) => {
  try {
    let sum = 0;
    const getMainLoan = await mainLoanContractModel.findOne({
      where: { ID: idMainLoan }
    })
    const content = `Hợp đông được giải ngân ${getMainLoan.Contract_Number}`
    const RateAndFeeMainLoan = await getRateAndFee(getMainLoan.Loan_Term_ID, getMainLoan.Method_Payment_ID, getMainLoan.Amount)
    if (getMainLoan.Method_Payment_ID === 1) {
      if (getMainLoan.Contract_Number.includes('GH')) {
        const LoanContract = await loanContractModel.findAll({ where: { Main_Loan_Contract_ID: idMainLoan } })
        let sumAmountRate = 0
        for (let item of LoanContract) {
          // giải ngân cho người đầu tư mới 
          if (item.Loan_Contract_Status_ID == 1) {
            sum += item.Amount
            await loanContractService.LoanContractDisbursement(item.ID)
          }

          // cộng lãi mới cho người đồng ý gia hạn 
          if (item.Loan_Contract_Status_ID == 2) {
            let termMethodPayment = await getLoanTermMethodPaymentByID(item.Loan_Term_Method_Payment_ID)
            const RateAndFee = await getRateAndFee(termMethodPayment.Loan_Term_ID, termMethodPayment.Method_Payment_ID, item.Amount)

            const acc = await AccountService.GetAccountByID(item.Lender_ID)

            await accountModel.update({
              Amount: Number(acc.amount) + Number(RateAndFee.amountRate)
            }, {
              where: { ID: item.Lender_ID }
            });
            const accTransRate = await accountTransactionService.createAccountTransaction(
              item.Contract_Number,
              item.Lender_ID,
              2,
              RateAndFee.amountRate,
              5,
              moment().format('YYYY-MM-DD HH:mm:ss'),
              item.Lender_ID,
              item.Borrower_ID,
              2,
              `Giao dich giai ngan lai cho hop dong ${item.Contract_Number}`
            )
          }
        }

        // Tất toán cho người đầu tư cũ 
        for (let item of LoanContract) {
          if (item.Loan_Contract_Status_ID == 1) {
            let oldLoanContractNumber = item.Contract_Number.replace('_GH', '')
            const oldLoanContract = await loanContractModel.findOne({ where: { Contract_Number: oldLoanContractNumber } })

            await AccountinvestmentService.GetPayment(oldLoanContract.Lender_ID, oldLoanContract.Amount, `Nhận tất toán hợp đồng ${item.Contract_Number}`, 1, 0)

            const accTrans = await accountTransactionService.createAccountTransaction(
              oldLoanContract.Contract_Number,
              oldLoanContract.Lender_ID,
              2,
              oldLoanContract.Amount,
              7,
              moment().format('YYYY-MM-DD HH:mm:ss'),
              oldLoanContract.Borrower_ID,
              oldLoanContract.Lender_ID,
              2,
              `Giao dich nhan tien tat toan hop dong ${item.Contract_Number}`
            )

            await loanContractService.UpdateLoanContractStatus(oldLoanContract.ID, 3)
          }
          else {
            let oldLoanContractNumber = item.Contract_Number.replace('_GH', '')
            const oldLoanContract = await loanContractModel.findOne({ where: { Contract_Number: oldLoanContractNumber } })
            await loanContractService.UpdateLoanContractStatus(oldLoanContract.ID, 3)
          }

        }

        // cập nhật main loan cũ và tài khoan vay 
        await AccountLoanService.LoanDisbursement(getMainLoan.Borrower_ID, 0, 1, RateAndFeeMainLoan.amountRate, RateAndFeeMainLoan.fee, content)
        const oldContractNumber = getMainLoan.Contract_Number.slice(0, getMainLoan.Contract_Number.indexOf('GH') - 1)
        const getoldMainLoan = await mainLoanContractModel.findOne({
          where: { Contract_Number: oldContractNumber }
        })

        await MainLoanDisbursement(idMainLoan)
        // await ReqPaymentOfCustomer(getoldMainLoan.Borrower_ID, getoldMainLoan.ID)
        await UpdateStatusMainLoan(getoldMainLoan.ID, 8, 9)
        // await createSchedule(idMainLoan)
        return true

      }
      else {
        const LoanContract = await loanContractModel.findAll({ where: { Main_Loan_Contract_ID: idMainLoan } })
        await MainLoanDisbursement(idMainLoan)

        for (let item of LoanContract) {
          sum += item.Amount
          await loanContractService.LoanContractDisbursement(item.ID)
        }
        await AccountLoanService.LoanDisbursement(getMainLoan.Borrower_ID, sum, 1, RateAndFeeMainLoan.amountRate, RateAndFeeMainLoan.fee, content)
        // await createSchedule(idMainLoan)
        return true
      }
    }
    else {
      if (getMainLoan.Contract_Number.includes('GH')) {
        const LoanContract = await loanContractModel.findAll({ where: { Main_Loan_Contract_ID: idMainLoan } })
        await MainLoanDisbursement(idMainLoan)
        for (let item of LoanContract) {
          if (item.Loan_Contract_Status_ID == 1) {
            sum += item.Amount
            await loanContractService.LoanContractDisbursement(item.ID)

            const accTrans = await accountTransactionService.createAccountTransaction(
              item.Contract_Number,
              item.Lender_ID,
              2,
              -item.loan_amount,
              3,
              moment().format('YYYY-MM-DD HH:mm:ss'),
              item.Lender_ID,
              item.Borrower_ID,
              2,
              `Giao dich giai ngan cho hop dong ${item.Contract_Number}`
            )

          }
        }

        await AccountLoanService.LoanDisbursement(getMainLoan.Borrower_ID, sum, 2, 0, RateAndFeeMainLoan.fee, content)

        const oldContractNumber = getMainLoan.Contract_Number.slice(0, getMainLoan.Contract_Number.indexOf('GH') - 1)
        const getoldMainLoan = await mainLoanContractModel.findOne({
          where: { Contract_Number: oldContractNumber }
        })
        await ReqPaymentOfCustomer(getoldMainLoan.Borrower_ID, getoldMainLoan.ID)
        await UpdateStatusMainLoan(getoldMainLoan.ID, 4, 9)
        await createSchedule(idMainLoan)
        return true
      }
      else {
        const LoanContract = await loanContractModel.findAll({ where: { Main_Loan_Contract_ID: idMainLoan } })
        await MainLoanDisbursement(idMainLoan)

        for (let item of LoanContract) {
          sum += item.Amount
          await loanContractService.LoanContractDisbursement(item.ID)

          const accTrans = await accountTransactionService.createAccountTransaction(
            item.Contract_Number,
            item.Lender_ID,
            2,
            -item.loan_amount,
            3,
            moment().format('YYYY-MM-DD HH:mm:ss'),
            item.Lender_ID,
            item.Borrower_ID,
            2,
            `Giao dich giai ngan cho hop dong ${item.Contract_Number}`
          )
        }
        await AccountLoanService.LoanDisbursement(getMainLoan.Borrower_ID, sum, 2, 0, RateAndFeeMainLoan.fee, content)
        // await createSchedule(idMainLoan)
        return true
      }
    }
  }
  catch (error) {
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, error.message)
  }

}

const getMainLoanByIDLoan = async (idLoanContract) => {
  const mainLoan = await mainLoanContractModel.findOne({
    where: { ID: idLoanContract }
  })
  return mainLoan
}

const updateStatusDisbursingOfMainLoan = async (IdMainLoan) => {
  try {
    const current = moment().format("YYYY-MM-DD HH:mm:ss");
    const getMainLoan = await GetMainLoanInTableByID(IdMainLoan);
    if (getMainLoan.Main_Loan_Status_ID === 1) {
      const MainLoan = await mainLoanContractModel.update({
        Main_Loan_Status_ID: 2
      }, {
        where: {
          ID: IdMainLoan
        }
      })

      if (MainLoan) {
        await CreateMainLoanStatusChange(IdMainLoan, 2, current)
      }
    }
  }
  catch (error) {
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, error.message)
  }
}

const updateStatusWattingForDisbursment = async (IdMainLoan) => {
  try {
    const current = moment().format("YYYY-MM-DD HH:mm:ss");
    const getMainLoan = await GetMainLoanInTableByID(IdMainLoan);
    if (getMainLoan.Main_Loan_Status_ID === 6) {
      const MainLoan = await mainLoanContractModel.update({
        Main_Loan_Status_ID: 1
      }, {
        where: {
          ID: IdMainLoan
        }
      })

      if (MainLoan) {
        await CreateMainLoanStatusChange(IdMainLoan, 1, current)
      }
    }
  }
  catch (error) {
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, error.message)
  }
}

const Request_Extend_Contract = async (idMainLoan, borrowerID) => {
  try {
    const account = await AccountService.GetAccountByID(borrowerID)
    const current = moment().format("YYYY-MM-DD HH:mm:ss");
    const getMainLoan = await GetMainLoanInTableByID(idMainLoan);
    const RateAndFee = await getRateAndFee(getMainLoan.Loan_Term_ID, getMainLoan.Method_Payment_ID, getMainLoan.Amount)
    if (account.amount < RateAndFee.amountRate + RateAndFee.fee) {
      return ThrowError(CONSTANTS.HTTP_CODE.ERROR, 'Nạp thêm tiền để có thể yêu cầu đáo hạn')
    }
    if (getMainLoan.Main_Loan_Status_ID === 3 && getMainLoan.Borrower_ID === borrowerID) {
      const MainLoan = await mainLoanContractModel.update({
        Main_Loan_Status_ID: 7
      }, {
        where: {
          ID: idMainLoan
        }
      })

      if (MainLoan) {
        await CreateMainLoanStatusChange(idMainLoan, 7, current)
        return true
      }
    }
    else {
      return ThrowError(CONSTANTS.HTTP_CODE.ERROR, 'MainLoan not found or BorrowerID not found')
    }
  }
  catch (error) {
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, error.message)
  }
}

const AdminApproveExtendContract = async (idMainLoan) => {
  try {
    let count = 0
    const current = moment().format("YYYY-MM-DD HH:mm:ss");
    const oldMainLoan = await getMainLoanByIDLoan(idMainLoan)
    if (oldMainLoan) {
      const newMainLoan = await mainLoanContractModel.create({
        Amount: oldMainLoan.Amount,
        Main_Loan_Status_ID: 1,
        Loan_Term_ID: oldMainLoan.Loan_Term_ID,
        Method_Payment_ID: oldMainLoan.Method_Payment_ID,
        Loan_Objective_ID: oldMainLoan.Loan_Objective_ID,
        Contract_Number: `${oldMainLoan.Contract_Number}_GH`,
        Borrower_ID: oldMainLoan.Borrower_ID,
        Deadline_Disbursement_Date: moment(oldMainLoan.Payment_Due_Date).add(1, 'days').format("YYYY-MM-DD HH:mm:ss"),
        Contract_Date: current,
        Descriptions: oldMainLoan.Descriptions,
      })
      const loanContracts = await loanContractModel.findAll({
        where: { Main_Loan_Contract_ID: idMainLoan }
      })

      for (let item of loanContracts) {
        const newLoanContract = await loanContractService.createLoanContract(
          5, newMainLoan.ID, newMainLoan.Contract_Number + '_' + `${count + 1}`,
          item.Contract_Type_ID, null, newMainLoan.Borrower_ID, item.Amount,
          current, item.Loan_Term_Method_Payment_ID, item.Loan_Rate,
          item.Loan_Fee, item.Loan_Rate_EarlyPay, item.Loan_Fee_EarlyPay,
          `Gia hạn hợp đồng ${oldMainLoan.Contract_Number}`, null
        )

        await requestExtendLoanContractModel.create({
          Customer_ID: item.Lender_ID,
          Loan_Contract_ID: newLoanContract.ID,
          Request_Time: current,
          Status: 1
        })
        count++
      }

      await UpdateStatusMainLoan(idMainLoan, 7, 8)
      return true
    }
    else {
      return ThrowError(CONSTANTS.HTTP_CODE.ERROR, 'Can not Approve Contract')
    }
  } catch {
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, CONSTANTS.ERROR)
  }
}

const UpdateStatusMainLoan = async (idMainLoan, currentStatus, newStatus) => {
  try {
    const current = moment().format("YYYY-MM-DD HH:mm:ss");
    const getMainLoan = await GetMainLoanInTableByID(idMainLoan);
    if (getMainLoan.Main_Loan_Status_ID === currentStatus) {
      const MainLoan = await mainLoanContractModel.update({
        Main_Loan_Status_ID: newStatus
      }, {
        where: {
          ID: idMainLoan
        }
      })

      if (MainLoan) {
        await CreateMainLoanStatusChange(idMainLoan, newStatus, current)
        return true
      }
      return false
    }
    else {
      return true;
    }
  }
  catch (error) {
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, error.message)
  }
}

const getCountLoanContract = async (idMainLoan) => {
  const loanContractAll = await loanContractModel.findAll({
    where: { Main_Loan_Contract_ID: idMainLoan }
  })

  const loanContractInvested = await loanContractModel.findAll({
    where: {
      Main_Loan_Contract_ID: idMainLoan,
      Lender_ID: { [Op.not]: null }
    }
  })

  return {
    loan_contract_count: loanContractAll.length,
    loan_contract_invested_count: loanContractInvested.length
  }
}


const ChangeStatusForMainLoanDone = async (idMainLoan) => {
  try {
    const mainLoanContract = await mainLoanContractModel.findOne({
      include: [
        {
          model: loanObjectiveModel,
          as: 'Loan_Objective',
          // attributes: ['Loan_Objective_Name']
        }, {
          model: loanTermModel,
          as: 'Loan_Term',
          // attributes: ['Term_Name', 'ID']
        }, {
          model: customerModel,
          as: 'Borrower',
          // attributes: ['First_Name', 'Last_Name']
        }, {
          model: methodPaymentModel,
          as: 'Method_Payment',
          // attributes: ['Method_Payment_Name','ID']
        }
      ], where: {
        Main_Loan_Status_ID: 1,
        ID: idMainLoan
      }
    });

    const countLoan = await getCountLoanContract(mainLoanContract.ID)
    if (countLoan.loan_contract_invested_count === countLoan.loan_contract_count) {
      await UpdateStatusMainLoan(mainLoanContract.ID, 1, 2)
    }

    return true;

  } catch (error) {
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, error.message);

  };
}

const getListMainLoanDoneForAdminConfirm = async () => {
  try {
    const mainLoanContracts = await mainLoanContractModel.findAll({
      include: [
        {
          model: loanObjectiveModel,
          as: 'Loan_Objective',
          // attributes: ['Loan_Objective_Name']
        }, {
          model: loanTermModel,
          as: 'Loan_Term',
          // attributes: ['Term_Name', 'ID']
        }, {
          model: customerModel,
          as: 'Borrower',
          // attributes: ['First_Name', 'Last_Name']
        }, {
          model: methodPaymentModel,
          as: 'Method_Payment',
          // attributes: ['Method_Payment_Name','ID']
        }
      ], where: {
        Main_Loan_Status_ID: 2
      }
    });

    let listContracts = [];
    for (let item of mainLoanContracts) {
      let RateAndFee = await getRateAndFee(item.Loan_Term.ID, item.Method_Payment.ID, item.Amount)
      const countLoan = await getCountLoanContract(item.ID)
      listContracts.push({
        loan_objective: item.Loan_Objective.Loan_Objective_Name,
        amount: item.Amount,
        contract_number: item.Contract_Number,
        status: item.Main_Loan_Status_ID,
        loan_rate: RateAndFee.rate + ' - ' + RateAndFee.amountRate,
        disbursement_before: item.Deadline_Disbursement_Date,
        loan_term: item.Loan_Term.Term_Name,
        loan_id: item.ID,
        method_payment: item.Method_Payment.Payment_Name,
        loan_contract_invested_count: countLoan.loan_contract_invested_count,
        loan_contract_count: countLoan.loan_contract_count,
      })
    }

    return listContracts;

  } catch (error) {
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, CONSTANTS.ERROR);

  };
}

const getListMainLoanWaitingForExtension = async () => {
  try {
    const mainLoanContracts = await mainLoanContractModel.findAll({
      include: [
        {
          model: loanObjectiveModel,
          as: 'Loan_Objective',
          // attributes: ['Loan_Objective_Name']
        }, {
          model: loanTermModel,
          as: 'Loan_Term',
          // attributes: ['Term_Name', 'ID']
        }, {
          model: customerModel,
          as: 'Borrower',
          // attributes: ['First_Name', 'Last_Name']
        }, {
          model: methodPaymentModel,
          as: 'Method_Payment',
          // attributes: ['Method_Payment_Name','ID']
        }
      ], where: {
        Main_Loan_Status_ID: 7
      }
    });

    let listContracts = [];
    for (const item of mainLoanContracts) {
      console.log(item.Loan_Term.ID, item.Method_Payment.ID, item.Amount)
      let RateAndFee = await getRateAndFee(item.Loan_Term.ID, item.Method_Payment.ID, item.Amount)
      const countLoan = await getCountLoanContract(item.ID)
      listContracts.push({
        loan_objective: item.Loan_Objective.Loan_Objective_Name,
        amount: item.Amount,
        contract_number: item.Contract_Number,
        status: item.Main_Loan_Status_ID,
        loan_rate: RateAndFee.rate + ' - ' + RateAndFee.amountRate,
        disbursement_before: item.Deadline_Disbursement_Date,
        loan_term: item.Loan_Term.Term_Name,
        loan_id: item.ID,
        method_payment: item.Method_Payment.Payment_Name,
        loan_contract_invested_count: countLoan.loan_contract_invested_count,
        loan_contract_count: countLoan.loan_contract_count,
      })
    }

    return listContracts;

  } catch (error) {
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, error.message);

  };
}

const getListMainLoanDivision = async () => {
  try {
    const mainLoanContracts = await mainLoanContractModel.findAll({
      include: [
        {
          model: loanObjectiveModel,
          as: 'Loan_Objective',
          // attributes: ['Loan_Objective_Name']
        }, {
          model: loanTermModel,
          as: 'Loan_Term',
          // attributes: ['Term_Name', 'ID']
        }, {
          model: customerModel,
          as: 'Borrower',
          // attributes: ['First_Name', 'Last_Name']
        }, {
          model: methodPaymentModel,
          as: 'Method_Payment',
          // attributes: ['Method_Payment_Name','ID']
        }
      ], where: {
        Main_Loan_Status_ID: 6
      }
    });

    let listContracts = [];
    for (const item of mainLoanContracts) {
      let RateAndFee = await getRateAndFee(item.Loan_Term.ID, item.Method_Payment.ID, item.Amount)
      const countLoan = await getCountLoanContract(item.ID)
      listContracts.push({
        loan_objective: item.Loan_Objective.Loan_Objective_Name,
        amount: item.Amount,
        contract_number: item.Contract_Number,
        status: item.Main_Loan_Status_ID,
        loan_rate: RateAndFee.rate + ' - ' + RateAndFee.amountRate,
        disbursement_before: item.Deadline_Disbursement_Date,
        loan_term: item.Loan_Term.Term_Name,
        loan_id: item.ID,
        method_payment: item.Method_Payment.Payment_Name,
        loan_contract_invested_count: countLoan.loan_contract_invested_count,
        loan_contract_count: countLoan.loan_contract_count,
      })
    }

    return listContracts;

  } catch (error) {
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, error.message);

  };
}
const getListMainLoanCancel = async () => {
  try {
    const mainLoanContracts = await mainLoanContractModel.findAll({
      include: [
        {
          model: loanObjectiveModel,
          as: 'Loan_Objective',
          // attributes: ['Loan_Objective_Name']
        }, {
          model: loanTermModel,
          as: 'Loan_Term',
          // attributes: ['Term_Name', 'ID']
        }, {
          model: customerModel,
          as: 'Borrower',
          // attributes: ['First_Name', 'Last_Name']
        }, {
          model: methodPaymentModel,
          as: 'Method_Payment',
          // attributes: ['Method_Payment_Name','ID']
        }
      ], where: {
        Main_Loan_Status_ID: 5
      }
    });

    let listContracts = [];
    for (const item of mainLoanContracts) {
      let RateAndFee = await getRateAndFee(item.Loan_Term.ID, item.Method_Payment.ID, item.Amount)
      const countLoan = await getCountLoanContract(item.ID)
      listContracts.push({
        loan_objective: item.Loan_Objective.Loan_Objective_Name,
        amount: item.Amount,
        contract_number: item.Contract_Number,
        status: item.Main_Loan_Status_ID,
        loan_rate: RateAndFee.rate + ' - ' + RateAndFee.amountRate,
        disbursement_before: item.Deadline_Disbursement_Date,
        loan_term: item.Loan_Term.Term_Name,
        loan_id: item.ID,
        method_payment: item.Method_Payment.Payment_Name,
        loan_contract_invested_count: countLoan.loan_contract_invested_count,
        loan_contract_count: countLoan.loan_contract_count,
      })
    }

    return listContracts;

  } catch (error) {
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, CONSTANTS.ERROR);

  };
}

const getListMainLoanDisbursed = async () => {
  try {
    const mainLoanContracts = await mainLoanContractModel.findAll({
      include: [
        {
          model: loanObjectiveModel,
          as: 'Loan_Objective',
          // attributes: ['Loan_Objective_Name']
        }, {
          model: loanTermModel,
          as: 'Loan_Term',
          // attributes: ['Term_Name', 'ID']
        }, {
          model: customerModel,
          as: 'Borrower',
          // attributes: ['First_Name', 'Last_Name']
        }, {
          model: methodPaymentModel,
          as: 'Method_Payment',
          // attributes: ['Method_Payment_Name','ID']
        }
      ], where: {
        Main_Loan_Status_ID: 3
      }
    });

    let listContracts = [];
    for (const item of mainLoanContracts) {
      let RateAndFee = await getRateAndFee(item.Loan_Term.ID, item.Method_Payment.ID, item.Amount)
      const countLoan = await getCountLoanContract(item.ID)
      listContracts.push({
        loan_objective: item.Loan_Objective.Loan_Objective_Name,
        amount: item.Amount,
        contract_number: item.Contract_Number,
        status: item.Main_Loan_Status_ID,
        loan_rate: RateAndFee.rate + ' - ' + RateAndFee.amountRate,
        disbursement_before: item.Deadline_Disbursement_Date,
        loan_term: item.Loan_Term.Term_Name,
        loan_id: item.ID,
        method_payment: item.Method_Payment.Payment_Name,
        loan_contract_invested_count: countLoan.loan_contract_invested_count,
        loan_contract_count: countLoan.loan_contract_count,
      })
    }

    return listContracts;

  } catch (error) {
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, CONSTANTS.ERROR);

  };
}


const SettlementListForAdmin = async () => {
  try {
    const mainLoanContracts = await mainLoanContractModel.findAll({
      include: [
        {
          model: loanObjectiveModel,
          as: 'Loan_Objective',
          // attributes: ['Loan_Objective_Name']
        }, {
          model: loanTermModel,
          as: 'Loan_Term',
          // attributes: ['Term_Name', 'ID']
        }, {
          model: customerModel,
          as: 'Borrower',
          // attributes: ['First_Name', 'Last_Name']
        }, {
          model: methodPaymentModel,
          as: 'Method_Payment',
          // attributes: ['Method_Payment_Name','ID']
        }
      ], where: {
        Main_Loan_Status_ID: 4
      }
    });

    let listContracts = [];
    for (const item of mainLoanContracts) {
      let RateAndFee = await getRateAndFee(item.Loan_Term.ID, item.Method_Payment.ID, item.Amount)
      const countLoan = await getCountLoanContract(item.ID)
      listContracts.push({
        loan_objective: item.Loan_Objective.Loan_Objective_Name,
        amount: item.Amount,
        contract_number: item.Contract_Number,
        status: item.Main_Loan_Status_ID,
        loan_rate: RateAndFee.rate + ' - ' + RateAndFee.amountRate,
        disbursement_before: item.Deadline_Disbursement_Date,
        loan_term: item.Loan_Term.Term_Name,
        loan_id: item.ID,
        method_payment: item.Method_Payment.Payment_Name,
        loan_contract_invested_count: countLoan.loan_contract_invested_count,
        loan_contract_count: countLoan.loan_contract_count,
      })
    }
    return listContracts;

  } catch (error) {
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, error.message);

  };
}

const ReqPaymentOfCustomer = async (idCustomer, idMainLoan) => {
  const t = await db.sequelize.transaction()
  try {
    const account = await AccountService.GetAccountByID(idCustomer)
    const mainLoan = await getMainLoanByIDLoan(idMainLoan)
    if (mainLoan.Method_Payment_ID === 1) {
      if (account.amount > mainLoan.Amount) {
        const listLoanContract = await loanContractService.GetLoanContractInMainLoan(idMainLoan)

        for (const item of listLoanContract) {
          ///// FALSE
          await AccountinvestmentService.GetPayment(item.lender_id, item.loan_amount, `Nhận tất toán hợp đồng ${item.loan_id}`, 1, 0)

          const accTrans = await accountTransactionModel.create({
            Transaction_Code: item.loan_code,
            Account_ID: item.lender_id,
            Account_Status_ID: 2,
            Amount: item.loan_amount,
            Transation_Type_ID: 7,
            Transaction_Date: moment().format('YYYY-MM-DD HH:mm:ss'),
            FromAccount_ID: idCustomer,
            ToAccount_ID: item.lender_id,
            Transaction_Status_ID: 2,
            Transaction_Content: `Giao dich nhan tien tat toan hop dong ${item.loan_code}`
          },
            // { transaction: t }
          )

          await accountTranSactionStatusModel.create({
            Transaction_Status_ID: 2,
            Account_Transaction_ID: accTrans.ID,
            Transaction_Date: accTrans.Transaction_Date
          },
            // { transaction: t }
          )
          await loanContractService.UpdateLoanContractStatus(item.loan_id, 3)

        }
        await AccountLoanService.LoanPayment(idCustomer, mainLoan.Amount, 1, 0, `Trả nợ hợp đồng ${mainLoan.ID}`)
        await AccountLoanLimitationService.LoanLimitationAfterPayment(idCustomer, mainLoan.Amount, 4, mainLoan.Contract_Date, moment().format('YYYY-MM-DD HH:mm:ss'))

        await UpdateStatusMainLoan(idMainLoan, 3, 4)
        // await t.commit()
        return true
      }
      else {
        // await t.rollback()
        return false
      }
    }
    else {
      const RateAndFee = await getRateAndFee(mainLoan.Loan_Term_ID, mainLoan.Method_Payment_ID, mainLoan.Amount)
      if (account.amount > mainLoan.Amount + RateAndFee.amountRate) {
        const listLoanContract = await loanContractService.GetLoanContractInMainLoan(idMainLoan)

        for (const item of listLoanContract) {
          ///// FALSE
          let amountRate = item.loan_amount + item.loan_amount * item.loan_rate / 100 * item.loan_term_value / 365
          await AccountinvestmentService.GetPayment(item.lender_id, item.loan_amount, `Nhận tất toán hợp đồng ${item.loan_id}`, 2, amountRate)

          const accTrans = await accountTransactionModel.create({
            Transaction_Code: item.loan_code,
            Account_ID: item.lender_id,
            Account_Status_ID: 2,
            Amount: item.loan_amount,
            Transation_Type_ID: 7,
            Transaction_Date: moment().format('YYYY-MM-DD HH:mm:ss'),
            FromAccount_ID: idCustomer,
            ToAccount_ID: item.lender_id,
            Transaction_Status_ID: 2,
            Transaction_Content: `Giao dich nhan tien tat toan hop dong ${item.loan_code}`
          },
            // { transaction: t }
          )

          await accountTranSactionStatusModel.create({
            Transaction_Status_ID: 2,
            Account_Transaction_ID: accTrans.ID,
            Transaction_Date: accTrans.Transaction_Date
          },
            // { transaction: t }
          )

          const accTransRate = await accountTransactionModel.create({
            Transaction_Code: item.loan_code,
            Account_ID: item.lender_id,
            Account_Status_ID: 2,
            Amount: item.loan_amount * item.loan_rate / 100 * item.loan_term_value / 365,
            Transation_Type_ID: 5,
            Transaction_Date: moment().format('YYYY-MM-DD HH:mm:ss'),
            FromAccount_ID: idCustomer,
            ToAccount_ID: item.lender_id,
            Transaction_Status_ID: 2,
            Transaction_Content: `Giao dich nhan tien lai toan hop dong ${item.loan_code}`
          },
            // { transaction: t }
          )

          await accountTranSactionStatusModel.create({
            Transaction_Status_ID: 2,
            Account_Transaction_ID: accTransRate.ID,
            Transaction_Date: accTransRate.Transaction_Date
          },
            // { transaction: t }
          )
          await loanContractService.UpdateLoanContractStatus(item.loan_id, 3)

        }

        await AccountLoanService.LoanPayment(idCustomer, mainLoan.Amount, 2, RateAndFee.amountRate, `Trả nợ hợp đồng ${mainLoan.ID}`)

        await AccountLoanLimitationService.LoanLimitationAfterPayment(idCustomer, mainLoan.Amount, 4, mainLoan.Contract_Date, moment().format('YYYY-MM-DD HH:mm:ss'))
        await UpdateStatusMainLoan(idMainLoan, 3, 4)
        // await t.commit()
        return true
      }
      else {
        // await t.rollback()
        return false
      }
    }

  } catch (error) {
    // await t.rollback()
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, error.message);
  }

}

const m4uPaymentForCustomer = async (idM4U, idMainLoan) => {
  const t = await db.sequelize.transaction()
  try {
    const account = await AccountService.GetAccountByID(idM4U)
    const mainLoan = await getMainLoanByIDLoan(idMainLoan)
    if (mainLoan.Method_Payment_ID === 1) {
      if (account.amount > mainLoan.Amount) {
        const listLoanContract = await loanContractService.GetLoanContractInMainLoan(idMainLoan)

        for (const item of listLoanContract) {
          await AccountinvestmentService.GetPayment(item.lender_id, item.loan_amount, `Nhận tất toán hợp đồng ${item.loan_id}`, 1, 0)

          const accTrans = await accountTransactionModel.create({
            Transaction_Code: item.loan_code,
            Account_ID: item.lender_id,
            Account_Status_ID: 2,
            Amount: item.loan_amount,
            Transation_Type_ID: 7,
            Transaction_Date: moment().format('YYYY-MM-DD HH:mm:ss'),
            FromAccount_ID: idM4U,
            ToAccount_ID: item.lender_id,
            Transaction_Status_ID: 2,
            Transaction_Content: `Giao dich nhan tien tat toan hop dong ${item.loan_code}`
          },
            // { transaction: t }
          )

          await accountTranSactionStatusModel.create({
            Transaction_Status_ID: 2,
            Account_Transaction_ID: accTrans.ID,
            Transaction_Date: accTrans.Transaction_Date
          },
            // { transaction: t }
          )
          await loanContractService.UpdateLoanContractStatus(item.loan_id, 3)
        }

        await AccountLoanService.LoanPayment(idCustomer, mainLoan.Amount, 1, 0, `Trả nợ hợp đồng ${mainLoan.ID}`)
        await UpdateStatusMainLoan(idMainLoan, 3, 10)
        // await UpdateStatusMainLoan(idMainLoan, 3, 4)
        // await t.commit()
        return true
      }
      else {
        // await t.rollback()
        return false
      }
    }
    else {
      const RateAndFee = await getRateAndFee(mainLoan.Loan_Term_ID, mainLoan.Method_Payment_ID, mainLoan.Amount)
      if (account.amount > mainLoan.Amount + RateAndFee.amountRate) {
        const listLoanContract = await loanContractService.GetLoanContractInMainLoan(idMainLoan)

        for (const item of listLoanContract) {
          let amountRate = item.loan_amount + item.loan_amount * item.loan_rate / 100 * item.loan_term_value / 365
          await AccountinvestmentService.GetPayment(item.lender_id, item.loan_amount, `Nhận tất toán hợp đồng ${item.loan_id}`, 2, amountRate)

          const accTrans = await accountTransactionModel.create({
            Transaction_Code: item.loan_code,
            Account_ID: item.lender_id,
            Account_Status_ID: 2,
            Amount: item.loan_amount,
            Transation_Type_ID: 7,
            Transaction_Date: moment().format('YYYY-MM-DD HH:mm:ss'),
            FromAccount_ID: idM4U,
            ToAccount_ID: item.lender_id,
            Transaction_Status_ID: 2,
            Transaction_Content: `Giao dich nhan tien tat toan hop dong ${item.loan_code}`
          },
            // { transaction: t }
          )

          await accountTranSactionStatusModel.create({
            Transaction_Status_ID: 2,
            Account_Transaction_ID: accTrans.ID,
            Transaction_Date: accTrans.Transaction_Date
          },
            // { transaction: t }
          )

          const accTransRate = await accountTransactionModel.create({
            Transaction_Code: item.loan_code,
            Account_ID: item.lender_id,
            Account_Status_ID: 2,
            Amount: item.loan_amount * item.loan_rate / 100 * item.loan_term_value / 365,
            Transation_Type_ID: 5,
            Transaction_Date: moment().format('YYYY-MM-DD HH:mm:ss'),
            FromAccount_ID: idM4U,
            ToAccount_ID: item.lender_id,
            Transaction_Status_ID: 2,
            Transaction_Content: `Giao dich nhan tien lai tat toan hop dong ${item.loan_code}`
          },
            // { transaction: t }
          )

          await accountTranSactionStatusModel.create({
            Transaction_Status_ID: 2,
            Account_Transaction_ID: accTransRate.ID,
            Transaction_Date: accTransRate.Transaction_Date
          },
            // { transaction: t }
          )

          await loanContractService.UpdateLoanContractStatus(item.loan_id, 3)
        }

        await AccountLoanService.LoanPayment(idCustomer, mainLoan.Amount, 2, RateAndFee.amountRate, `Trả nợ hợp đồng ${mainLoan.ID}`)
        await UpdateStatusMainLoan(idMainLoan, 3, 10)
        // await UpdateStatusMainLoan(idMainLoan, 3, 4)
        // await t.commit()
        return true
      }
      else {
        // await t.rollback()
        return false
      }
    }

  } catch (error) {
    // await t.rollback()
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, error.message);
  }
}

const GetListOverDueContractForAdmin = async () => {
  const current = moment().format('YYYY-MM-DD HH:mm:ss')
  const list = await mainLoanContractModel.findAll({
    include: [
      {
        model: loanObjectiveModel,
        as: 'Loan_Objective'
      }, {
        model: loanTermModel,
        as: 'Loan_Term'
      }, {
        model: customerModel,
        as: 'Borrower'
      }, {
        model: methodPaymentModel,
        as: 'Method_Payment'
      }
    ],
    where: {
      Payment_Due_Date: { [Op.lt]: current },
      Main_Loan_Status_ID: 3
    }
  })

  let listContracts = [];
  for (const item of list) {
    let RateAndFee = await getRateAndFee(item.Loan_Term.ID, item.Method_Payment.ID, item.Amount)
    const countLoan = await getCountLoanContract(item.ID)
    listContracts.push({
      ID: item.ID,
      borrower_id: item.Borrower_ID,
      phone_number: item.Borrower.PhoneNumber,
      loan_objective: item.Loan_Objective.Loan_Objective_Name,
      amount: item.Amount,
      contract_number: item.Contract_Number,
      status: item.Main_Loan_Status_ID,
      loan_rate: RateAndFee.rate + ' - ' + RateAndFee.amountRate,
      disbursement_before: item.Deadline_Disbursement_Date,
      loan_term: item.Loan_Term.Term_Name,
      loan_id: item.ID,
      method_payment: item.Method_Payment.Payment_Name,
      loan_contract_invested_count: countLoan.loan_contract_invested_count,
      loan_contract_count: countLoan.loan_contract_count,
      payment_due_date: item.Payment_Due_Date
    })
  }
  return listContracts;
}

const GetListOverDueContractForAdminOption = async (arrayID) => {
  console.log(4);
  const current = moment().format('YYYY-MM-DD HH:mm:ss')
  const list = await mainLoanContractModel.findAll({
    include: [
      {
        model: loanObjectiveModel,
        as: 'Loan_Objective'
      }, {
        model: loanTermModel,
        as: 'Loan_Term'
      }, {
        model: customerModel,
        as: 'Borrower'
      }, {
        model: methodPaymentModel,
        as: 'Method_Payment'
      }
    ],
    where: {
      Payment_Due_Date: { [Op.lt]: current },
      Main_Loan_Status_ID: 3,
      ID: { [Op.in]: arrayID }
    }
  })
  console.log(list)

  let listContracts = [];
  for (const item of list) {
    let RateAndFee = await getRateAndFee(item.Loan_Term.ID, item.Method_Payment.ID, item.Amount)
    const countLoan = await getCountLoanContract(item.ID)
    listContracts.push({
      ID: item.ID,
      borrower_id: item.Borrower_ID,
      loan_objective: item.Loan_Objective.Loan_Objective_Name,
      amount: item.Amount,
      contract_number: item.Contract_Number,
      status: item.Main_Loan_Status_ID,
      loan_rate: RateAndFee.rate + ' - ' + RateAndFee.amountRate,
      disbursement_before: item.Deadline_Disbursement_Date,
      loan_term: item.Loan_Term.Term_Name,
      loan_id: item.ID,
      method_payment: item.Method_Payment.Payment_Name,
      loan_contract_invested_count: countLoan.loan_contract_invested_count,
      loan_contract_count: countLoan.loan_contract_count,
      payment_due_date: item.Payment_Due_Date
    })
  }
  return listContracts;
}

const GetListSettlementContractForAdminOption = async (arrayID) => {

  const current = moment().format('YYYY-MM-DD HH:mm:ss')
  let expiration5 = moment().add(5, 'days').format('YYYY-MM-DD HH:mm:ss')
  let expiration1 = moment().add(1, 'days').format('YYYY-MM-DD HH:mm:ss')
  console.log(arrayID)
  const list = await mainLoanContractModel.findAll({
    include: [
      {
        model: loanObjectiveModel,
        as: 'Loan_Objective'
      }, {
        model: loanTermModel,
        as: 'Loan_Term'
      }, {
        model: customerModel,
        as: 'Borrower'
      }, {
        model: methodPaymentModel,
        as: 'Method_Payment'
      }
    ],
    where: {
      Payment_Due_Date: {
        [Op.and]: {
          [Op.gte]: expiration1,
          [Op.lte]: expiration5
        }
      },
      Main_Loan_Status_ID: 3,
      ID: { [Op.in]: arrayID }

    }
  })
  console.log(1);
  console.log(list)
  let listContracts = [];
  for (const item of list) {
    console.log(item.payment_due_date >= expiration1)
    console.log(item.payment_due_date <= expiration5)
    let RateAndFee = await getRateAndFee(item.Loan_Term.ID, item.Method_Payment.ID, item.Amount)
    const countLoan = await getCountLoanContract(item.ID)
    listContracts.push({
      ID: item.ID,
      borrower_id: item.Borrower_ID,
      loan_objective: item.Loan_Objective.Loan_Objective_Name,
      amount: item.Amount,
      contract_number: item.Contract_Number,
      status: item.Main_Loan_Status_ID,
      loan_rate: RateAndFee.rate + ' - ' + RateAndFee.amountRate,
      disbursement_before: item.Deadline_Disbursement_Date,
      loan_term: item.Loan_Term.Term_Name,
      loan_id: item.ID,
      method_payment: item.Method_Payment.Payment_Name,
      loan_contract_invested_count: countLoan.loan_contract_invested_count,
      loan_contract_count: countLoan.loan_contract_count,
      payment_due_date: item.Payment_Due_Date
    })
  }
  return listContracts;
}

const GetListSettlementContractForAdmin = async (arrayID) => {

  const current = moment().format('YYYY-MM-DD HH:mm:ss')
  let expiration5 = moment().add(5, 'days').format('YYYY-MM-DD HH:mm:ss')
  let expiration1 = moment().add(1, 'days').format('YYYY-MM-DD HH:mm:ss')
  console.log(arrayID)
  const list = await mainLoanContractModel.findAll({
    include: [
      {
        model: loanObjectiveModel,
        as: 'Loan_Objective'
      }, {
        model: loanTermModel,
        as: 'Loan_Term'
      }, {
        model: customerModel,
        as: 'Borrower'
      }, {
        model: methodPaymentModel,
        as: 'Method_Payment'
      }
    ],
    where: {
      Payment_Due_Date: {
        [Op.and]: {
          [Op.gte]: expiration1,
          [Op.lte]: expiration5
        }
      },
      Main_Loan_Status_ID: 3

    }
  })
  console.log(1);
  console.log(list)
  let listContracts = [];
  for (const item of list) {
    console.log(item.payment_due_date >= expiration1)
    console.log(item.payment_due_date <= expiration5)
    let RateAndFee = await getRateAndFee(item.Loan_Term.ID, item.Method_Payment.ID, item.Amount)
    const countLoan = await getCountLoanContract(item.ID)
    listContracts.push({
      ID: item.ID,
      borrower_id: item.Borrower_ID,
      loan_objective: item.Loan_Objective.Loan_Objective_Name,
      amount: item.Amount,
      contract_number: item.Contract_Number,
      status: item.Main_Loan_Status_ID,
      loan_rate: RateAndFee.rate + ' - ' + RateAndFee.amountRate,
      disbursement_before: item.Deadline_Disbursement_Date,
      loan_term: item.Loan_Term.Term_Name,
      loan_id: item.ID,
      method_payment: item.Method_Payment.Payment_Name,
      loan_contract_invested_count: countLoan.loan_contract_invested_count,
      loan_contract_count: countLoan.loan_contract_count,
      payment_due_date: item.Payment_Due_Date
    })
  }
  return listContracts;
}

const GetAllMainLoanContractForAdminView = async () => {
  try {
    const mainLoanContracts = await mainLoanContractModel.findAll({
      include: [
        {
          model: loanObjectiveModel,
          as: 'Loan_Objective',
          // attributes: ['Loan_Objective_Name']
        }, {
          model: loanTermModel,
          as: 'Loan_Term',
          // attributes: ['Term_Name', 'ID']
        }, {
          model: customerModel,
          as: 'Borrower',
          // attributes: ['First_Name', 'Last_Name']
        }, {
          model: methodPaymentModel,
          as: 'Method_Payment',
          // attributes: ['Method_Payment_Name','ID']
        }
      ]
    });

    let listContracts = [];
    for (const item of mainLoanContracts) {
      let RateAndFee = await getRateAndFee(item.Loan_Term.ID, item.Method_Payment.ID, item.Amount)
      const countLoan = await getCountLoanContract(item.ID)
      listContracts.push({
        loan_objective: item.Loan_Objective.Loan_Objective_Name,
        amount: item.Amount,
        contract_number: item.Contract_Number,
        status: item.Main_Loan_Status_ID,
        status_name: await GetStatus(item.Main_Loan_Status_ID),
        loan_rate: RateAndFee.rate,
        loan_fee: RateAndFee.fee,
        disbursement_before: item.Deadline_Disbursement_Date,
        loan_term: item.Loan_Term.Term_Name,
        loan_id: item.ID,
        method_payment: item.Method_Payment.Payment_Name,
        loan_contract_invested_count: countLoan.loan_contract_invested_count,
        loan_contract_count: countLoan.loan_contract_count,
      })
    }
    return listContracts;

  } catch (error) {
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, error.message);

  };
}

const GetMainLoanContractDetailByAdmin = async (main_loan_contract_id) => {

  const mainLoanContract = await mainLoanContractModel.findOne({
    include: [
      {
        model: loanObjectiveModel,
        as: 'Loan_Objective',
        attributes: ['Loan_Objective_Name']
      }, {
        model: loanTermModel,
        as: 'Loan_Term',
      }, {
        model: customerModel,
        as: 'Borrower',
        attributes: ['ID']
      }, {
        model: methodPaymentModel,
        as: 'Method_Payment'
      }
    ], where: {
      ID: main_loan_contract_id
    }

  });
  let RateAndFee = await getRateAndFee(mainLoanContract.Loan_Term.ID, mainLoanContract.Method_Payment.ID, mainLoanContract.Amount)

  const mainloan = {
    id: mainLoanContract.ID,
    status: await GetStatus(mainLoanContract.Main_Loan_Status_ID),
    contract_number: mainLoanContract.Contract_Number,
    borrower_id: mainLoanContract.Borrower.ID,
    contract_date: mainLoanContract.Contract_Date,
    amount: mainLoanContract.Amount,
    loan_term: mainLoanContract.Loan_Term.Term_Name,
    method_payment: mainLoanContract.Method_Payment.Payment_Name,
    loan_objective: mainLoanContract.Loan_Objective.Term_Name,
    fee: RateAndFee.fee,
    rate: RateAndFee.rate,
    amount_rate: RateAndFee.amountRate,
    description: mainLoanContract.Descriptions
  };

  const loan_contracts = await loanContractModel.findAll({
    include: [
      {
        model: loanTermMethodPayment, as: 'Loan_Term_Method_Payment',
        include: [
          { model: loanTermModel, as: 'Loan_Term' },
          { model: methodPaymentModel, as: 'Method_Payment' }
        ]
      },
      {
        model: mainLoanContractModel, as: 'Main_Loan_Contract',
        include: [
          { model: loanObjectiveModel, as: 'Loan_Objective' }
        ]
      }
    ],
    where: {
      Main_Loan_Contract_ID: main_loan_contract_id
    }
  })

  let list_contract = [];
  for (const item of loan_contracts) {

    list_contract.push({
      loan_id: item.ID,
      loan_fee: item.Loan_Fee,
      loan_object: item.Main_Loan_Contract.Loan_Objective.Loan_Objective_Name,
      loan_amount: item.Amount,
      status: item.Loan_Contract_Status_ID,
      loan_rate: item.Loan_Rate,
      disbursement_before: item.Main_Loan_Contract.Deadline_Disbursement_Date,
      method_payment: item.Loan_Term_Method_Payment.Method_Payment.Payment_Name,
      loan_term: item.Loan_Term_Method_Payment.Loan_Term.Term_Name,
      loan_code: item.Contract_Number,
      contract_date: item.Contract_Date,
      lender_name: (await customer_service.getCustomerByID(item.Lender_ID)).Last_Name + " " + (await customer_service.getCustomerByID(item.Lender_ID)).First_Name,
      main_contract_id: item.Main_Loan_Contract_ID
    })
  }
  return { mainloan, list_contract };
}

const GetListMainLoanByStatusID = async (statusID) => {
  try {
    const mainLoanContracts = await mainLoanContractModel.findAll({
      include: [
        {
          model: loanObjectiveModel,
          as: 'Loan_Objective',
          // attributes: ['Loan_Objective_Name']
        }, {
          model: loanTermModel,
          as: 'Loan_Term',
          // attributes: ['Term_Name', 'ID']
        }, {
          model: customerModel,
          as: 'Borrower',
          // attributes: ['First_Name', 'Last_Name']
        }, {
          model: methodPaymentModel,
          as: 'Method_Payment',
          // attributes: ['Method_Payment_Name','ID']
        }
      ], where: {
        Main_Loan_Status_ID: statusID
      }
    });

    let listContracts = [];
    for (let item of mainLoanContracts) {
      let RateAndFee = await getRateAndFee(item.Loan_Term.ID, item.Method_Payment.ID, item.Amount)
      const countLoan = await getCountLoanContract(item.ID)
      listContracts.push({
        loan_objective: item.Loan_Objective.Loan_Objective_Name,
        amount: item.Amount,
        contract_number: item.Contract_Number,
        status: item.Main_Loan_Status_ID,
        loan_rate: RateAndFee.rate + ' - ' + RateAndFee.amountRate,
        disbursement_before: item.Deadline_Disbursement_Date,
        loan_term: item.Loan_Term.Term_Name,
        loan_id: item.ID,
        method_payment: item.Method_Payment.Payment_Name,
        descriptions: item.Descriptions,
        loan_contract_invested_count: countLoan.loan_contract_invested_count,
        loan_contract_count: countLoan.loan_contract_count,
      })
    }

    return listContracts;

  } catch (error) {
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, CONSTANTS.ERROR);

  };
}

const UpdateMainLoanDescription = async (idMainLoan, descriptions) => {
  await mainLoanContractModel.update({
    Descriptions: descriptions
  }, {
    where: {
      ID: idMainLoan
    }
  })
}

const ContinueToBorrow = async (idMainLoan) => {
  try {
    let sum = 0;
    const getMainLoan = await mainLoanContractModel.findOne({ where: { ID: idMainLoan } })
    const listContracts = await loanContractService.GetLoanContractInMainLoan(idMainLoan)
    for (const item of listContracts) {
      if (item.lender_id != null) {
        sum += item.loan_amount
      }
      else {
        await loanContractStatusChangeModel.destroy({
          where: { Loan_Contract_ID: item.loan_id }
        })
        await loanContractModel.destroy({
          where: { ID: item.loan_id }
        })
      }
    }
    await ChangeStatusForMainLoanDone(idMainLoan)
    await mainLoanContractModel.update({
      Amount: sum
    }, { where: { ID: idMainLoan } })
    const getNewMainLoan = await mainLoanContractModel.findOne({ where: { ID: idMainLoan } })
    await AccountLoanLimitationService.LoanLimitationAfterCancelOrBorrow(getNewMainLoan.Borrower_ID, getMainLoan.Amount, getNewMainLoan.Amount, 2, getMainLoan.Contract_Date)
    return true
  }
  catch (error) {
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, error.message)
  }

}

const GetMainLoanContractByStatus = async (statusID) => {
  try {
    const mainLoanContracts = await mainLoanContractModel.findAll({
      include: [
        {
          model: loanObjectiveModel,
          as: 'Loan_Objective',
          attributes: ['Loan_Objective_Name']
        }, {
          model: loanTermModel,
          as: 'Loan_Term',
        }, {
          model: customerModel,
          as: 'Borrower',
          attributes: ['First_Name', 'Last_Name']
        }, {
          model: methodPaymentModel,
          as: 'Method_Payment'
        }
      ], where: {
        Main_Loan_Status_ID: statusID
      }
    });
    let listContract = [];
    for (const item of mainLoanContracts) {
      let RateAndFee = await getRateAndFee(item.Loan_Term.ID, item.Method_Payment.ID, item.Amount)
      const countLoan = await getCountLoanContract(item.ID)
      listContract.push({
        loan_objective: item.Loan_Objective.Loan_Objective_Name,
        amount: item.Amount,
        contract_number: item.Contract_Number,
        borrower_id: item.Borrower_ID,
        status: item.Main_Loan_Status_ID,
        loan_rate: RateAndFee.rate + ' - ' + RateAndFee.amountRate,
        disbursement_before: item.Deadline_Disbursement_Date,
        loan_term: item.Loan_Term.Term_Name,
        loan_id: item.ID,
        method_payment: item.Method_Payment.Payment_Name,
        loan_contract_invested_count: countLoan.loan_contract_invested_count,
        loan_contract_count: countLoan.loan_contract_count,
        Deadline_Disbursement_Date: item.Deadline_Disbursement_Date,
        Disbursement_Date: item.Disbursement_Date,
        Payment_Due_Date: item.Payment_Due_Date,
      })
    }

    return listContract;

  } catch (error) {
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, CONSTANTS.ERROR);
  }
};

module.exports = {
  GetAllMainLoanContractForAdminDivision,
  GetMainLoanContractByID,
  CreateMainLoanContract,
  UpdateMainLoanContract,
  GetMainLoanContractsByIDAccount,
  GetWattingContract,
  GetContractByStatus,
  CreateMainLoanStatusChange,
  GetMainLoanInTableByID,
  MainLoanContractCancel,
  MainLoanContractCancelForAdmin,
  MainLoanConfirmationForAdmin,
  getMainLoanByIDLoan,
  updateStatusDisbursingOfMainLoan,
  updateStatusWattingForDisbursment,
  Request_Extend_Contract,
  AdminApproveExtendContract,
  UpdateStatusMainLoan,
  ChangeStatusForMainLoanDone,
  getListMainLoanDoneForAdminConfirm,
  getListMainLoanWaitingForExtension,
  getListMainLoanDivision,
  getListMainLoanCancel,
  SettlementListForAdmin,
  ReqPaymentOfCustomer,
  getListMainLoanDisbursed,
  m4uPaymentForCustomer,
  GetListOverDueContractForAdmin,
  GetAllMainLoanContractForAdminView,
  GetMainLoanContractDetailByAdmin,
  GetListMainLoanByStatusID,
  getCountLoanInvested,
  getCountInMainLoan,
  GetListOverDueContractForAdminOption,
  GetListSettlementContractForAdminOption,
  UpdateMainLoanDescription,
  GetListSettlementContractForAdmin,
  ContinueToBorrow,
  GetMainLoanContractByStatus
}
