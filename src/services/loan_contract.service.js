const db = require('../models/init-models');
const { ThrowError } = require('../utils/helper/response');
const { CONSTANTS } = require('../constants/constants');
const customer_service = require('../services/customer.services')
const moment = require('moment')

const Loan_contract = db.loan_contract;
const Loan_term_method_payment = db.loan_term_method_payment
const Loan_term = db.loan_term
const Method_payment = db.method_payment
const Main_loan_contract = db.main_loan_contract
const Loan_objective = db.loan_objective
const Loan_contract_status = db.loan_contract_status
const CustomerModel = require('./customer.services');
const loanContractStatusChangeModel = db.loan_contract_status_change
const requestExtendLoanContractModel = db.request_extend_loan_contract
const accountTransactionService = require('./account_transaction.service')
const Customer = require('./customer.services');
const { getRateAndFee } = require('../services/loan_term_method_payment.service')
const AccountInvestmentService = require('../services/account_investment.service')
const AccountLoanService = require('../services/account_loan.service')
const mainLoanContractModel = db.main_loan_contract
const { Op } = require('sequelize')

const GetMainLoanInTableByID = async (ID) => {
  const MainLoan = await mainLoanContractModel.findOne({
    where: { ID: ID }
  })
  return MainLoan
}

const GetIDByTermMethodPayment = async (termID, methodPaymentID) => {
  const TermMethodPayment = Loan_term_method_payment.findOne({
    where: {
      Loan_Term_ID: termID,
      Method_Payment_ID: methodPaymentID
    }
  })
  return TermMethodPayment
}

const update_loan_contract_invest = async (lender_id, loan_contract_id, statusID, t) => {
  // const t = await db.sequelize.transaction()
  try {
    console.log(lender_id, loan_contract_id, statusID,)
    const current = moment().format("YYYY-MM-DD HH:mm:ss");
    const loan_contract = await Loan_contract.update(
      {
        Lender_ID: lender_id,
        Loan_Contract_Status_ID: statusID
      },
      {
        where: {
          ID: loan_contract_id,
        }
      }, { transaction: t })

    await loanContractStatusChangeModel.create({
      Loan_Contract_Status_ID: statusID,
      Loan_Contract_ID: loan_contract_id,
      Status_Date: current
    }, { transaction: t })

    // await t.commit();
    return loan_contract
  }
  catch (error) {
    // await t.rollback()
    return ThrowError(500, error.message)
  }

}

const GetAllLoanContract = async () => {
  try {
    const loan_contracts = await Loan_contract.findAll({
      include: [
        {
          model: Loan_term_method_payment, as: 'Loan_Term_Method_Payment',
          include: [
            { model: Loan_term, as: 'Loan_Term' },
          ]
        },
        {
          model: Main_loan_contract, as: 'Main_Loan_Contract',
          include: [
            { model: Loan_objective, as: 'Loan_Objective' }
          ]
        }
      ]
    })
    let list_contract = [];

    for (const item of loan_contracts) {
      list_contract.push({
        loan_id: item.ID,
        loan_code: item.Contract_Number,
        loan_object: item.Main_Loan_Contract.Loan_Objective.Loan_Objective_Name,
        loan_amount: item.Amount,
        loan_rate: item.Loan_Rate,
        loan_fee: item.Loan_Fee,
        contract_date: item.Contract_Date,
        amount_rate: item.Amount * item.Loan_Rate / 100,
        loan_term: item.Loan_Term_Method_Payment.Loan_Term.Term_Name,
        status: item.Loan_Contract_Status_ID,
      })
    }
    return list_contract;
  } catch (error) {
    return ThrowError(error.code, error.message);
  }

}

const GetLoanContractByID = async (loan_contract_id) => {
  try {
    const loan_contract = await Loan_contract.findOne({
      include: [
        {
          model: Loan_term_method_payment, as: 'Loan_Term_Method_Payment',
          include: [
            { model: Loan_term, as: 'Loan_Term' },
          ]
        },
        {
          model: Main_loan_contract, as: 'Main_Loan_Contract',
          include: [
            { model: Loan_objective, as: 'Loan_Objective' }
          ]
        }
      ],
      where: { ID: loan_contract_id }
    });

    if (!loan_contract) {
      return ThrowError(CONSTANTS.HTTP_CODE.NOT_FOUND_ERR, "ID LOAN CONTRACT DOES NOT EXIST");
    }

    return {
      loan_id: loan_contract.ID,
      contract_number: loan_contract.Contract_Number,
      loan_object: loan_contract.Main_Loan_Contract.Loan_Objective.Loan_Objective_Name,
      loan_amount: loan_contract.Amount,
      loan_rate: loan_contract.Loan_Rate,
      loan_fee: loan_contract.Loan_Fee,
      contract_date: loan_contract.Contract_Date,
      borrower_name: (await CustomerModel.getCustomerByID(loan_contract.Borrower_ID)).Last_Name + " " + (await CustomerModel.getCustomerByID(loan_contract.Borrower_ID)).First_Name,
      loan_term: loan_contract.Loan_Term_Method_Payment.Loan_Term.Term_Name,
      status: loan_contract.Loan_Contract_Status_ID,
      description: loan_contract.Descriptions,
      main_loan_contract_id: loan_contract.Main_Loan_Contract.ID,
      lender_id: loan_contract.Lender_ID,
      borrower_id: loan_contract.Borrower_ID,
      loan_term_value: loan_contract.Loan_Term_Method_Payment.Loan_Term.Term_Value
    };

  } catch (error) {
    return ThrowError(error.code, error.message);
  }
}

const GetLoanContractByIDAccount = async (id) => {
  try {
    const customer = await Customer.getCustomerByID(id)
    if (!customer) {
      return ThrowError(CONSTANTS.HTTP_CODE.NOT_FOUND_ERR, "ID ACCOUNT DOES NOT EXIST")
    }

    const loan_contract = await Loan_contract.findAll({
      include: [
        {
          model: Loan_term_method_payment, as: 'Loan_Term_Method_Payment',
          include: [
            { model: Loan_term, as: 'Loan_Term' },
          ]
        }, {
          model: Loan_term_method_payment, as: 'Loan_Term_Method_Payment',
          include: [
            { model: Method_payment, as: 'Method_Payment' },
          ]
        },
        {
          model: Main_loan_contract, as: 'Main_Loan_Contract',
          include: [
            { model: Loan_objective, as: 'Loan_Objective' }
          ]
        }
      ],
      where: {
        Lender_ID: id,
        Loan_Contract_Status_ID: 1
      }
    });
    if (!loan_contract) {
      return ThrowError(CONSTANTS.HTTP_CODE.NOT_FOUND_ERR, 'BORROWER DOES NOT EXIST');
    }
    let list_contract = [];

    for (const item of loan_contract) {
      list_contract.push({
        loan_id: item.ID,
        contract_number: item.Contract_Number,
        loan_object: item.Main_Loan_Contract.Loan_Objective.Loan_Objective_Name,
        loan_amount: item.Amount,
        loan_rate: item.Loan_Rate,
        loan_fee: item.Loan_Fee,
        contract_date: item.Contract_Date,
        borrower_name: (await Customer.getCustomerByID(item.Borrower_ID)).Last_Name + " " + (await Customer.getCustomerByID(item.Borrower_ID)).First_Name,
        loan_term: item.Loan_Term_Method_Payment.Loan_Term.Term_Name,
        status: item.Loan_Contract_Status_ID,
        description: item.Descriptions,
        method_payment: item.Loan_Term_Method_Payment.Method_Payment.Payment_Name,
        deadline_disbursement_date: item.Main_Loan_Contract.Deadline_Disbursement_Date
      })
    }
    return list_contract;

  } catch (error) {
    return ThrowError(error.code, error.message);
  }
};

const GetInvestmentContractByIDAccount = async (id) => {
  try {
    const customer = await customer_service.getCustomerByID(id)

    if (!customer) {
      return ThrowError(CONSTANTS.HTTP_CODE.NOT_FOUND_ERR, "ID ACCOUNT DOES NOT EXIST")
    }

    const loan_contract = await Loan_contract.findAll({
      include: [
        {
          model: Loan_term_method_payment, as: 'Loan_Term_Method_Payment',
          include: [
            { model: Loan_term, as: 'Loan_Term' },
          ]
        },
        {
          model: Main_loan_contract, as: 'Main_Loan_Contract',
          include: [
            { model: Loan_objective, as: 'Loan_Objective' }
          ]
        }
      ],
      where: { Lender_ID: id }
    });

    if (!loan_contract) {
      return ThrowError(CONSTANTS.HTTP_CODE.NOT_FOUND_ERR, 'LENDER DOES NOT EXIST');
    }

    let list_contract = [];

    for (const item of loan_contract) {
      list_contract.push({
        loan_id: item.ID,
        contract_number: item.Contract_Number,
        loan_object: item.Main_Loan_Contract.Loan_Objective.Loan_Objective_Name,
        loan_amount: item.Amount,
        loan_rate: item.Loan_Rate,
        loan_fee: item.Loan_Fee,
        contract_date: item.Contract_Date,
        borrower_name: (await Customer.getCustomerByID(item.Borrower_ID)).Last_Name + " " + (await Customer.getCustomerByID(item.Borrower_ID)).First_Name,
        loan_term: item.Loan_Term_Method_Payment.Loan_Term.Term_Name,
        status: item.Loan_Contract_Status_ID,
        description: item.Descriptions,
        method_payment: item.Loan_Term_Method_Payment.Method_Payment.Payment_Name,
      })
    }
    return list_contract;

  } catch (error) {
    return ThrowError(error.code, error.message);
  }
}

const GetLoanContractInMainLoan = async (main_loan_contract_id) => {
  const loan_contracts = await Loan_contract.findAll({
    include: [
      {
        model: Loan_term_method_payment, as: 'Loan_Term_Method_Payment',
        include: [
          { model: Loan_term, as: 'Loan_Term' },
          { model: Method_payment, as: 'Method_Payment' }
        ]
      },
      {
        model: Main_loan_contract, as: 'Main_Loan_Contract',
        include: [
          { model: Loan_objective, as: 'Loan_Objective' }
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
      contract_number: item.Contract_Number,
      contract_date: item.Contract_Date,
      lender_id: item.Lender_ID,
      main_contract_id: item.Main_Loan_Contract_ID,
      loan_term_value: item.Loan_Term_Method_Payment.Loan_Term.Term_Value,
      payment_due_date: item.Payment_Due_Date
    })
  }
  return list_contract;
}

const getLoanContract = async (id) => {
  try {
    const customer = await customer_service.getCustomerByID(id)
    if (!customer) {
      return ThrowError(CONSTANTS.HTTP_CODE.NOT_FOUND_ERR, "ID ACCOUNT DOES NOT EXIST")
    }
    const loan_contract = await Loan_contract.findAll({
      include: [
        {
          model: Loan_term_method_payment, as: 'Loan_Term_Method_Payment',
          include: [
            { model: Loan_term, as: 'Loan_Term' },
          ]
        },
        {
          model: Loan_term_method_payment, as: 'Loan_Term_Method_Payment',
          include: [
            { model: Method_payment, as: 'Method_Payment' },
          ]
        },
        {
          model: Main_loan_contract, as: 'Main_Loan_Contract',
          include: [
            { model: Loan_objective, as: 'Loan_Objective' },
          ]
        }
      ],
      where: {
        Borrower_ID: { [Op.not]: id },
        Lender_ID: null,
        Request_Investment_Auto_ID: null
      },
      order: [[{ model: Main_loan_contract, as: 'Main_Loan_Contract' }, 'Deadline_Disbursement_Date', 'ASC']]
    })
    if (!loan_contract) {
      return ThrowError(CONSTANTS.HTTP_CODE.NOT_FOUND_ERR, 'LENDER DOES NOT EXIST');
    }

    let list_contract = [];

    for (const item of loan_contract) {
      list_contract.push({
        loan_id: item.ID,
        contract_number: item.Contract_Number,
        loan_object: item.Main_Loan_Contract.Loan_Objective.Loan_Objective_Name,
        loan_amount: item.Amount,
        loan_rate: item.Loan_Rate,
        loan_fee: item.Loan_Fee,
        contract_date: item.Contract_Date,
        borrower_name: (await Customer.getCustomerByID(item.Borrower_ID)).Last_Name + " " + (await Customer.getCustomerByID(item.Borrower_ID)).First_Name,
        loan_term: item.Loan_Term_Method_Payment.Loan_Term.Term_Name,
        status: item.Loan_Contract_Status_ID,
        description: item.Descriptions,
        method_payment: item.Loan_Term_Method_Payment.Method_Payment.Payment_Name,
        dealine: item.Main_Loan_Contract.Deadline_Disbursement_Date
      })
    }
    return list_contract;


  } catch (error) {
    return ThrowError(error.code, error.message);
  }
}

const getLoanContractDisbursed = async (id) => {
  try {
    const customer = await Customer.getCustomerByID(id)
    if (!customer) {
      return ThrowError(CONSTANTS.HTTP_CODE.NOT_FOUND_ERR, "ID ACCOUNT DOES NOT EXIST")
    }

    const loan_contract = await Loan_contract.findAll({
      include: [
        {
          model: Loan_term_method_payment, as: 'Loan_Term_Method_Payment',
          include: [
            { model: Loan_term, as: 'Loan_Term' },
          ]
        }, {
          model: Loan_term_method_payment, as: 'Loan_Term_Method_Payment',
          include: [
            { model: Method_payment, as: 'Method_Payment' },
          ]
        },
        {
          model: Main_loan_contract, as: 'Main_Loan_Contract',
          include: [
            { model: Loan_objective, as: 'Loan_Objective' }
          ]
        }
      ],
      where: {
        Lender_ID: id,
        Loan_Contract_Status_ID: 2
      }
    });
    if (!loan_contract) {
      return ThrowError(CONSTANTS.HTTP_CODE.NOT_FOUND_ERR, 'BORROWER DOES NOT EXIST');
    }
    let list_contract = [];

    for (const item of loan_contract) {
      list_contract.push({
        loan_id: item.ID,
        contract_number: item.Contract_Number,
        loan_object: item.Main_Loan_Contract.Loan_Objective.Loan_Objective_Name,
        loan_amount: item.Amount,
        loan_rate: item.Loan_Rate,
        loan_fee: item.Loan_Fee,
        contract_date: item.Contract_Date,
        borrower_name: (await Customer.getCustomerByID(item.Borrower_ID)).Last_Name + " " + (await Customer.getCustomerByID(item.Borrower_ID)).First_Name,
        loan_term: item.Loan_Term_Method_Payment.Loan_Term.Term_Name,
        status: item.Loan_Contract_Status_ID,
        description: item.Descriptions,
        method_payment: item.Loan_Term_Method_Payment.Method_Payment.Payment_Name,
        payment_due_date: item.Payment_Due_Date
      })
    }
    return list_contract;

  } catch (error) {
    return ThrowError(error.code, error.message);
  }
}

const getLoanFinish = async (id) => {
  const customer = await Customer.getCustomerByID(id)
  if (!customer) {
    return ThrowError(CONSTANTS.HTTP_CODE.NOT_FOUND_ERR, "ID ACCOUNT DOES NOT EXIST")
  }
  const loan_contract = await Loan_contract.findAll({
    include: [
      {
        model: Loan_term_method_payment, as: 'Loan_Term_Method_Payment',
        include: [
          { model: Loan_term, as: 'Loan_Term' },
        ]
      },
      {
        model: Loan_term_method_payment, as: 'Loan_Term_Method_Payment',
        include: [
          { model: Method_payment, as: 'Method_Payment' },
        ]
      },
      {
        model: Main_loan_contract, as: 'Main_Loan_Contract',
        include: [
          { model: Loan_objective, as: 'Loan_Objective' }
        ]
      }
    ],
    where: {
      Loan_Contract_Status_ID: 3,
      Lender_ID: customer.ID
    }
  })
  if (!loan_contract) {
    return ThrowError(CONSTANTS.HTTP_CODE.NOT_FOUND_ERR, 'LENDER DOES NOT EXIST');
  }
  let list_contract = [];

  for (const item of loan_contract) {
    list_contract.push({
      loan_id: item.ID,
      contract_number: item.Contract_Number,
      loan_object: item.Main_Loan_Contract.Loan_Objective.Loan_Objective_Name,
      loan_amount: item.Amount,
      loan_rate: item.Loan_Rate,
      loan_fee: item.Loan_Fee,
      contract_date: item.Contract_Date,
      borrower_name: (await Customer.getCustomerByID(item.Borrower_ID)).Last_Name + " " + (await Customer.getCustomerByID(item.Borrower_ID)).First_Name,
      loan_term: item.Loan_Term_Method_Payment.Loan_Term.Term_Name,
      status: item.Loan_Contract_Status_ID,
      description: item.Descriptions,
      method_payment: item.Loan_Term_Method_Payment.Method_Payment.Payment_Name,
      payment_due_date: item.Payment_Due_Date
    })
  }
  return list_contract;
}

const createLoanContract = async (
  Loan_Contract_Status_ID,
  Main_Loan_Contract_ID,
  Contract_Number,
  Contract_Type_ID,
  Lender_ID,
  Borrower_ID,
  Amount,
  Contract_Date,
  Loan_Term_Method_Payment_ID,
  Loan_Rate,
  Loan_Fee,
  Loan_Rate_EarlyPay,
  Loan_Fee_EarlyPay,
  Descriptions,
  Request_Investment_Auto_ID,
  Payment_Due_Date
) => {
  try {
    const current = moment().format("YYYY-MM-DD HH:mm:ss");
    const loan_contract = await Loan_contract.create({
      Loan_Contract_Status_ID: Loan_Contract_Status_ID,
      Main_Loan_Contract_ID: Main_Loan_Contract_ID,
      Contract_Number: Contract_Number,
      Contract_Type_ID: Contract_Type_ID,
      Lender_ID: Lender_ID,
      Borrower_ID: Borrower_ID,
      Amount: Amount,
      Contract_Date: Contract_Date,
      Loan_Term_Method_Payment_ID: Loan_Term_Method_Payment_ID,
      Loan_Rate: Loan_Rate,
      Loan_Fee: Loan_Fee,
      Loan_Rate_EarlyPay: Loan_Rate_EarlyPay,
      Loan_Fee_EarlyPay: Loan_Fee_EarlyPay,
      Descriptions: Descriptions,
      Request_Investment_Auto_ID: Request_Investment_Auto_ID,
      Payment_Due_Date: Payment_Due_Date
    })
    if (loan_contract) {
      await createLoanContractStatusChange(loan_contract.ID, 1, current)
    }
    return loan_contract
  }
  catch (err) {
    throw err
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

const DetailLoanContractByID = async (loan_contract_id) => {
  try {
    const loan_contract = await Loan_contract.findOne({
      include: [
        {
          model: Loan_term_method_payment, as: 'Loan_Term_Method_Payment',
          include: [
            { model: Loan_term, as: 'Loan_Term' },
            { model: Method_payment, as: 'Method_Payment' },
          ],
        },
        {
          model: Main_loan_contract, as: 'Main_Loan_Contract',
          include: [
            { model: Loan_objective, as: 'Loan_Objective' }
          ]
        }
      ],
      where: {
        ID: loan_contract_id
      },

    })
    if (!loan_contract) {
      return ThrowError(CONSTANTS.HTTP_CODE.NOT_FOUND_ERR, "ID LOAN CONTRACT DOES NOT EXIST");
    }
    return {
      loan_id: loan_contract.ID,
      contract_number: loan_contract.Contract_Number,
      loan_object: loan_contract.Main_Loan_Contract.Loan_Objective.Loan_Objective_Name,
      loan_amount: loan_contract.Amount,
      loan_rate: loan_contract.Loan_Rate,
      loan_fee: loan_contract.Loan_Fee,
      contract_date: loan_contract.Contract_Date,
      // lender_name: (await customer_service.getCustomerByID(loan_contract.Lender_ID)).Last_Name + " " + (await customer_service.getCustomerByID(loan_contract.Lender_ID)).First_Name,
      borrower_name: (await customer_service.getCustomerByID(loan_contract.Borrower_ID)).Last_Name + " " + (await customer_service.getCustomerByID(loan_contract.Borrower_ID)).First_Name,
      loan_term: loan_contract.Loan_Term_Method_Payment.Loan_Term.Term_Name,
      method_payment: loan_contract.Loan_Term_Method_Payment.Method_Payment.Payment_Name,
      status: loan_contract.Loan_Contract_Status_ID,
      description: loan_contract.Descriptions,
      lender_id: loan_contract.Lender_ID,
      borrower_id: loan_contract.Borrower_ID
    };
  } catch {
    return ThrowError(CONSTANTS.HTTP_CODE.NOT_FOUND_ERR, "ID LOAN CONTRACT DOES NOT EXIST");
  }
}

const GetLoanContractByCustomerID = async (id, status_id) => {
  try {
    const customer = await Customer.getCustomerByID(id)
    if (!customer) {
      return ThrowError(CONSTANTS.HTTP_CODE.NOT_FOUND_ERR, "ID ACCOUNT DOES NOT EXIST")
    }

    const loan_contract = await Loan_contract.findAll({
      include: [
        {
          model: Loan_term_method_payment, as: 'Loan_Term_Method_Payment',
          include: [
            { model: Loan_term, as: 'Loan_Term' },
          ]
        }, {
          model: Loan_term_method_payment, as: 'Loan_Term_Method_Payment',
          include: [
            { model: Method_payment, as: 'Method_Payment' },
          ]
        },
        {
          model: Main_loan_contract, as: 'Main_Loan_Contract',
          include: [
            { model: Loan_objective, as: 'Loan_Objective' }
          ]
        }
      ],
      where: {
        Lender_ID: id,
        Loan_Contract_Status_ID: status_id
      }
    });
    if (!loan_contract) {
      return ThrowError(CONSTANTS.HTTP_CODE.NOT_FOUND_ERR, 'BORROWER DOES NOT EXIST');
    }
    let list_contract = [];

    for (const item of loan_contract) {
      list_contract.push({
        loan_id: item.ID,
        contract_number: item.Contract_Number,
        loan_object: item.Main_Loan_Contract.Loan_Objective.Loan_Objective_Name,
        loan_amount: item.Amount,
        loan_rate: item.Loan_Rate,
        loan_fee: item.Loan_Fee,
        contract_date: item.Contract_Date,
        borrower_name: (await Customer.getCustomerByID(item.Borrower_ID)).Last_Name + " " + (await Customer.getCustomerByID(item.Borrower_ID)).First_Name,
        loan_term: item.Loan_Term_Method_Payment.Loan_Term.Term_Name,

        description: item.Descriptions,
        method_payment: item.Loan_Term_Method_Payment.Method_Payment.Payment_Name,
        payment_due_date: item.Payment_Due_Date
      })
    }
    return list_contract;

  } catch (error) {
    return ThrowError(error.code, error.message);
  }
};

const LoanDivision = async (idMainLoan, list) => {
  try {
    const current = moment().format("YYYY-MM-DD HH:mm:ss");
    const mainLoan = await GetMainLoanInTableByID(idMainLoan)
    let sum = 0
    let count = 0
    for (let item of list) {
      sum = item.amount * item.count
    }
    if (sum <= mainLoan.Amount) {
      for (let item of list) {
        for (let i = count; i < item.count + count; i++) {
          let RateAndFee = await getRateAndFee(mainLoan.Method_Payment_ID, mainLoan.Loan_Term_ID, item.amount)
          await createLoanContract(
            1,
            idMainLoan,
            `${mainLoan.Contract_Number}_${i + 1}`,
            1,
            null,
            mainLoan.Borrower_ID,
            item.amount,
            current,
            (await GetIDByTermMethodPayment(mainLoan.Loan_Term_ID, mainLoan.Method_Payment_ID)).ID,
            RateAndFee.rate,
            RateAndFee.fee,
            null,
            null,
            `Khoản vay được tách từ khoản vay ${mainLoan.Contract_Number}`,
            null,
            mainLoan.Payment_Due_Date
          )
        }
        count += item.count
      }
      return true
    }
    else {
      return ThrowError(CONSTANTS.HTTP_CODE.ERROR, 'AMOUNT OVER LIMIT');
    }
  }
  catch (err) {
    throw err
  }

}

const LoanContractCancel = async (ID, borrowerID) => {
  try {
    const getLoanContract = await Loan_contract.findOne({ where: { ID: ID } })
    if (getLoanContract) {
      const current = moment().format("YYYY-MM-DD HH:mm:ss");
      const LoanContract = await Loan_contract.update({
        Loan_Contract_Status_ID: 4
      }, {
        where: {
          ID: ID,
          Borrower_ID: borrowerID
        }
      })

      if (LoanContract) {
        await createLoanContractStatusChange(ID, 4, current)
      }
    }
    else {
      return ThrowError(CONSTANTS.HTTP_CODE.ERROR, CONSTANTS.ERROR);
    }
  }
  catch {
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, CONSTANTS.ERROR);
  }

}

const LoanContractDisbursement = async (ID) => {
  try {
    const getLoanContract = await Loan_contract.findOne({
      include: [{
        model: Loan_term_method_payment, as: 'Loan_Term_Method_Payment',
        include: [
          { model: Loan_term, as: 'Loan_Term' }
        ]
      }],
      where: { ID: ID }
    })
    if (getLoanContract.Lender_ID != null) {
      const RateAndFee = await getRateAndFee(getLoanContract.Loan_Term_Method_Payment.Loan_Term_ID, getLoanContract.Loan_Term_Method_Payment.Method_Payment_ID, getLoanContract.Amount)
      const content = `Giải ngân cho hợp đồng ${getLoanContract.Contract_Number}`
      if (getLoanContract.Loan_Term_Method_Payment.Method_Payment_ID === 1) {
        await AccountInvestmentService.InvestmentDisbursement(getLoanContract.Lender_ID, getLoanContract.Amount, content, 1, RateAndFee.amountRate)
        // const accTrans = await accountTransactionService.createAccountTransaction(
        //   getLoanContract.Contract_Number,
        //   getLoanContract.Lender_ID,
        //   2,
        //   -Number(getLoanContract.Amount),
        //   3,
        //   moment().format('YYYY-MM-DD HH:mm:ss'),
        //   getLoanContract.Lender_ID,
        //   getLoanContract.Borrower_ID,
        //   2,
        //   `Giao dich giai ngan cho hop dong ${getLoanContract.Contract_Number}`
        // )
        // const accTransRate = await accountTransactionService.createAccountTransaction(
        //   getLoanContract.Contract_Number,
        //   getLoanContract.Lender_ID,
        //   2,
        //   RateAndFee.amountRate,
        //   5,
        //   moment().format('YYYY-MM-DD HH:mm:ss'),
        //   getLoanContract.Borrower_ID,
        //   getLoanContract.Lender_ID,
        //   2,
        //   `Giao dich giai ngan lai cho hop dong ${getLoanContract.Contract_Number}`
        // )
      }
      else{
        await AccountInvestmentService.InvestmentDisbursement(getLoanContract.Lender_ID, getLoanContract.Amount, content, 2, RateAndFee.amountRate)
      }
      const current = moment().format("YYYY-MM-DD HH:mm:ss");
      const LoanContract = await Loan_contract.update({
        Loan_Contract_Status_ID: 2,
        Payment_Due_Date: moment().add(getLoanContract.Loan_Term_Method_Payment.Loan_Term.Term_Value, 'days')
      }, {
        where: {
          ID: ID
        }
      })

      if (LoanContract) {
        await createLoanContractStatusChange(ID, 2, current)
      }
    }
    else {
      return ThrowError(CONSTANTS.HTTP_CODE.ERROR, CONSTANTS.ERROR);
    }
  }
  catch (error) {
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, error.message);
  }
}

const UpdateRequestInvestmentID = async (idLoanContract, idReq) => {
  try {
    await Loan_contract.update({
      Request_Investment_Auto_ID: idReq
    }, {
      where: {
        ID: idLoanContract
      }
    })
  }
  catch {
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, CONSTANTS.ERROR);
  }

}

const UpdateLoanContractStatus = async (LoanContractID, statusID) => {
  try {
    const current = moment().format('YYYY-MM-DD HH:mm:ss')
    const result = await Loan_contract.update({
      Loan_Contract_Status_ID: statusID
    }, {
      where: { ID: LoanContractID }
    })
    await createLoanContractStatusChange(LoanContractID, statusID, current)
    return true
  } catch (error) {
    ThrowError(CONSTANTS.HTTP_CODE.ERROR, error.message)
  }
}



module.exports = {
  GetAllLoanContract,
  GetLoanContractByID,
  GetLoanContractByIDAccount,
  GetInvestmentContractByIDAccount,
  update_loan_contract_invest,
  GetLoanContractInMainLoan,
  getLoanContract,
  getLoanFinish,
  createLoanContract,
  createLoanContractStatusChange,
  DetailLoanContractByID,
  GetLoanContractByCustomerID,
  LoanDivision,
  LoanContractCancel,
  LoanContractDisbursement,
  getLoanContractDisbursed,
  UpdateRequestInvestmentID,
  UpdateLoanContractStatus
}
