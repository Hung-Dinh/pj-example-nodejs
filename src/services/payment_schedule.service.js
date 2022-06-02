const { CONSTANTS } = require('../constants/constants')
const db = require('../models/init-models')
const Payment_schedule = db.payment_schedule
const mainLoanContractModel = db.main_loan_contract
const loanObjectiveModel = db.loan_objective
const loanTermModel = db.loan_term
const methodPaymentModel = db.method_payment
const loanContractModel = db.loan_contract
const CustomerModel = db.customer
const AccountModel = db.account

const {ThrowError} = require('../utils/helper/response')
const moment = require('moment');
const { Op } = require("sequelize");
const sequelize = require("sequelize");
const getRateFromLoanContract = async(id) => {
  try{
    const loancontract = await loanContractModel.findOne({
      where: {
        Main_Loan_Contract_ID: id,
        Loan_Contract_Status_ID: 2
      }
    })
    if(!loancontract){
      return ThrowError(CONSTANTS.HTTP_CODE.ERROR, "Không tồn tại khoản vay chính")
    }
    return loancontract.Loan_Rate;

  } catch(error){
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, error.message)
  }  
}

const getLoanContractsFromMainLoan = async(id) => {
  try{
    const loancontracts = await loanContractModel.findAll({
      where: {
        Main_Loan_Contract_ID: id,
        Loan_Contract_Status_ID: 2
      }
    })
    if(loancontracts === []){
      return ThrowError(CONSTANTS.HTTP_CODE.ERROR, "Không tồn tại khoản vay chính")
    }
    return loancontracts;

  } catch(error){
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, error.message)
  }  
}


const GetMainContractFromPayment = async (id) => {
  try {
    const mainLoanContract = await mainLoanContractModel.findOne({
      include: [{
        model: loanObjectiveModel,
        as: 'Loan_Objective',
        attributes: ['Loan_Objective_Name']
      }, {
        model: loanTermModel,
        as: 'Loan_Term',
        attributes: ['Term_Value']
      },{
        model: methodPaymentModel,
        as: 'Method_Payment'
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
      contract_date: mainLoanContract.Contract_Date,
      amount: mainLoanContract.Amount,
      loan_term: mainLoanContract.Loan_Term.Term_Value,
      method_id: mainLoanContract.Method_Payment.ID,
      status_id: mainLoanContract.Main_Loan_Status_ID,
      payment_due_date: mainLoanContract.Payment_Due_Date
    };
  } catch (error) {
    return ThrowError(error.code, error.message);
  }
}
// lich tra no
const createScheduleFirstMain = async (mainLoan) => {
  const t = await db.sequelize.transaction();
  try{
    const rate = await getRateFromLoanContract(mainLoan.id)
    await Payment_schedule.create({
      Main_Loan_Contract_ID: mainLoan.id,
      Amount: Math.round(mainLoan.amount*rate*mainLoan.loan_term/(100*365)),
      Payment_Date: mainLoan.contract_date,
      Actual_Payment_Date: mainLoan.contract_date
    })

    await Payment_schedule.create({
      Main_Loan_Contract_ID: mainLoan.id,
      Amount: Math.round(mainLoan.amount),
      Payment_Date: mainLoan.payment_due_date,
    })

    await createScheduleFirst(mainLoan)

    await t.commit()
  } catch(error){
    await t.rollback();
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, error.message)
  }
}

const createScheduleLastMain = async (mainLoan) => {
  const t = await db.sequelize.transaction();
  try{
    const rate = await getRateFromLoanContract(mainLoan.id)
    await Payment_schedule.create({
      Main_Loan_Contract_ID: mainLoan.id,
      Amount: mainLoan.amount + Math.round(mainLoan.amount*rate*mainLoan.loan_term/(100*365)),
      Payment_Date: mainLoan.payment_due_date,
    })
    await createScheduleLast(mainLoan)

    await t.commit()
  } catch(error){
    await t.rollback();
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, error.message)
  }
}

const createScheduleEveryTermMain = async (mainLoan) => {
  const t = await db.sequelize.transaction();
  try{
    let countDay;
    if(mainLoan.method_id === 3){
      countDay = 30
    } else if(mainLoan.method_id === 4){
      countDay = 7
    }else{
      return ThrowError(CONSTANTS.HTTP_CODE.ERROR, "Lỗi không xác định được kì hạn ngày")
    }

    if(mainLoan.loan_term < countDay){
      return ThrowError(CONSTANTS.HTTP_CODE.ERROR,"Kỳ hạn không hợp lệ")
    }

    const mod = mainLoan.loan_term % countDay
    const countTerm = Math.floor(mainLoan.loan_term / countDay)
    const rate = await getRateFromLoanContract(mainLoan.id)

    let dem = countDay + mod
    for(let i = 0; i < countTerm; i++){
      
      let dayNext = moment(mainLoan.contract_date).add(dem, 'days').format('YYYY-MM-DD HH:mm:ss')
  
      if(i === 0){
        await Payment_schedule.create({
          Main_Loan_Contract_ID: mainLoan.id,
          Amount: Math.round(mainLoan.amount*rate*dem/(100*365)),
          Payment_Date: dayNext
        })
      } else if( i === countTerm -1){
        await Payment_schedule.create({
          Main_Loan_Contract_ID: mainLoan.id,
          Amount: mainLoan.amount + Math.round(mainLoan.amount*rate*countDay/(100*365)),
          Payment_Date: dayNext,
        })
      } else{
        await Payment_schedule.create({
          Main_Loan_Contract_ID: mainLoan.id,
          Amount: Math.round(mainLoan.amount*rate*countDay/(100*365)),
          Payment_Date: dayNext
        })
      }
      dem += countDay
    }
    await createScheduleEveryTerm(mainLoan,countDay,mod,countTerm)
    await t.commit()
  } catch(error){
    await t.rollback();
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, error.message)
  }
}
// lich thu no
const createScheduleFirst = async (mainLoan) => {
  
  try{
    const loanContracts = await getLoanContractsFromMainLoan(mainLoan.id)
    for(const item of loanContracts){ 
      await Payment_schedule.create({
        Loan_Contract_ID: item.ID,
        Main_Loan_Contract_ID: mainLoan.id,
        Amount: Math.round(item.Amount*item.Loan_Rate*mainLoan.loan_term/(100*365)),
        Payment_Date: mainLoan.contract_date,
        Actual_Payment_Date: mainLoan.contract_date
      })

      await Payment_schedule.create({
        Loan_Contract_ID: item.ID,
        Main_Loan_Contract_ID: mainLoan.id,
        Amount: Math.round(item.Amount),
        Payment_Date: mainLoan.payment_due_date,
      })
    }
   
  } catch(error){
   
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, error.message)
  }
}

const createScheduleLast = async (mainLoan) => {
  try{
    const loanContracts = await getLoanContractsFromMainLoan(mainLoan.id)
    for(const item of loanContracts){
      await Payment_schedule.create({
        Loan_Contract_ID: item.ID,
        Main_Loan_Contract_ID: mainLoan.id,
        Amount: item.amount + Math.round(item.Amount*item.Loan_Rate*mainLoan.loan_term/(100*365)),
        Payment_Date: mainLoan.payment_due_date
      })
    }  
  } catch(error){
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, error.message)
  }
}

const createScheduleEveryTerm = async (mainLoan,countDay,mod,countTerm) => {
  try{
  
    const loanContracts = await getLoanContractsFromMainLoan(mainLoan.id)

    for(let item of loanContracts){
      let dem = countDay + mod
      
      for(let i = 0; i < countTerm; i++){
        let dayNext = moment(mainLoan.contract_date).add(dem, 'days').format('YYYY-MM-DD HH:mm:ss')
      
        if(i === 0){
          await Payment_schedule.create({
            Loan_Contract_ID: item.ID,
            Main_Loan_Contract_ID: mainLoan.id,
            Amount: Math.round(item.Amount*item.Loan_Rate*dem/(100*365)),
            Payment_Date: dayNext
          })
        } else if( i === countTerm -1){
          await Payment_schedule.create({
            Loan_Contract_ID: item.ID,
            Main_Loan_Contract_ID: mainLoan.id,
            Amount: item.Amount + Math.round(item.Amount*item.Loan_Rate*countDay/(100*365)),
            Payment_Date: dayNext
          })
        } else{
          await Payment_schedule.create({
            Loan_Contract_ID: item.ID,
            Main_Loan_Contract_ID: mainLoan.id,
            Amount: Math.round(item.Amount*item.Loan_Rate*countDay/(100*365)),
            Payment_Date: dayNext
          })
        }
        dem += countDay
      }
    }
    
  } catch(error) {
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, error.message)
  }
}


const createSchedule = async (id) => {
  try{
    const mainLoan = await GetMainContractFromPayment(id)
    if(mainLoan.method_id === 1){
      return [ await createScheduleFirstMain(mainLoan),
                await createScheduleFirst(id)]
    } else if(mainLoan.method_id === 2){
      return [ await createScheduleLastMain(mainLoan),
                await createScheduleLast(mainLoan) ]
    } else if(mainLoan.method_id === 3 || mainLoan.method_id === 4 ){
      return [ await createScheduleEveryTermMain(mainLoan),
                await createScheduleEveryTerm(mainLoan)]
    } 
  } catch(error){
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, error.message)
  }
}

const GetNameCustomer = async(idBorrower) => {
  try{
    const customer = await CustomerModel.findOne({
      where: {
        ID: idBorrower
      }
    })
    return customer.Last_Name + ' ' + customer.First_Name
  } catch(error){
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, "Mã khách hàng không tồn tại")
  }
}

const GetAccountNumber = async(idBorrower) => {
  try{
    const account = await AccountModel.findOne({
      where: {
        ID: idBorrower
      }
    })
    return account.Account_Number
  } catch(error){
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, "Mã khách hàng không tồn tại")
  }
}

const getRepaymentSchedule = async () => {
  try{
    
    let now = moment()
    let afterWeek = now.add(7, 'days')
    const rePayment = await Payment_schedule.findAll({
      include: [{
        model: mainLoanContractModel,
        as: 'Main_Loan_Contract'
      }]
      ,where: {
        Loan_Contract_ID: null,
        
          [Op.or]: [
            {
              Payment_Date: {
                [Op.and]: {
                  [Op.gte]: now,
                  [Op.lte]: afterWeek
                }
              },
              Actual_Payment_Date: null
            },
            
            {
              Actual_Payment_Date: null,
              Payment_Date: {
                [Op.lte]: now
              }
            }
          ]
        },
      order: [
        ['Payment_Date']
      ]
    })

    if(rePayment === []){
      return ThrowError(CONSTANTS.HTTP_CODE.ERROR, "Lịch trả nợ trống")
    }

    let listRePayment = []
    for(const item of rePayment){
    
      listRePayment.push({
        Main_Loan_Contract_ID: item.Main_Loan_Contract_ID,
        Contract_Number: item.Main_Loan_Contract.Contract_Number,
        Name: await GetNameCustomer(item.Main_Loan_Contract.Borrower_ID),
        Account_Number: await GetAccountNumber(item.Main_Loan_Contract.Borrower_ID),
        Amount: item.Amount,
        Payment_Date: item.Payment_Date,
        Actual_Payment_Date: item.Actual_Payment_Date
      })
    }
    return listRePayment
  } catch(error){
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, error.message)
  }
}

const getDebtCollectionSchedule = async () => {
  try{
    
    let now = moment()
    let afterWeek = now.add(7, 'days')
    const debtCollection = await Payment_schedule.findAll({
      include: [
        { model: loanContractModel, as: 'Loan_Contract'}
      ]
      ,where: {
        Loan_Contract_ID: {
          [Op.not]: null
        },
        [Op.or]: [
          {
            Payment_Date: {
              [Op.and]: {
                [Op.gte]: now,
                [Op.lte]: afterWeek
              }
            },
            Actual_Payment_Date: null
          },
          
          {
            Actual_Payment_Date: null,
            Payment_Date: {
              [Op.lte]: now
            }
          }
        ]
      },
      order: [
        ['Payment_Date']
      ]
     
    })
    console.log(debtCollection)
    if(debtCollection === []){
      return ThrowError(CONSTANTS.HTTP_CODE.ERROR, "Lịch thu nợ trống")
    }
    let listDebCollect = []
    for(const item of debtCollection){
      listDebCollect.push({
        Main_Loan_Contract_ID: item.Main_Loan_Contract_ID,
        Loan_Contract_ID: item.Loan_Contract_ID,
        Contract_Number: item.Loan_Contract.Contract_Number,
        Name: await GetNameCustomer(item.Loan_Contract.Lender_ID),
        Account_Number: await GetAccountNumber(item.Loan_Contract.Lender_ID),
        Amount: item.Amount,
        Payment_Date: item.Payment_Date,
        Actual_Payment_Date: item.Actual_Payment_Date
      })
    }
    return listDebCollect
  } catch(error){
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, error.message)
  }
}

const getDetailRepayment = async (id) => {
  try{
    const rePayment = await Payment_schedule.findAll({
      include: [{
        model: mainLoanContractModel,
        as: 'Main_Loan_Contract'
      }]
      ,where: {
        Loan_Contract_ID: null,
        Main_Loan_Contract_ID: id
      },
      order: [
        ['Payment_Date']
      ]
    })
    console.log(rePayment)

    if(rePayment === []){
      return ThrowError(CONSTANTS.HTTP_CODE.ERROR, "Lịch trả nợ trống")
    }

    let listRePayment = []
    for(const item of rePayment){
      listRePayment.push({
        Main_Loan_Contract_ID: id,
        Contract_Number: item.Main_Loan_Contract.Contract_Number,
        Name: await GetNameCustomer(item.Main_Loan_Contract.Borrower_ID),
        Account_Number: await GetAccountNumber(item.Main_Loan_Contract.Borrower_ID),
        Amount: item.Amount,
        Payment_Date: item.Payment_Date,
        Actual_Payment_Date: item.Actual_Payment_Date
      })
    }
    return listRePayment
  } catch(error){
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, error.message)
  }
}

const getMainLoanOfCustomer = async(id, idMainLoan) => {
  try{
    if(!id){
      return ThrowError(CONSTANTS.HTTP_CODE.ERROR, "Bạn chưa đăng nhập")
    }
    const mainLoan = await mainLoanContractModel.findOne({
      where: {
        Borrower_ID: id,
        ID: idMainLoan
      }
    })
    
    if(!mainLoan){
      return ThrowError(CONSTANTS.HTTP_CODE.ERROR, "Không tồn tại khoản vay")
    }
    return mainLoan;
  } catch(error){
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, error.message)
  }
}

const getIDMainLoansOfCustomer = async(id) => {
  try{
  
    if(!id){
      return ThrowError(CONSTANTS.HTTP_CODE.ERROR, "Bạn chưa đăng nhập")
    }
    const mainLoan = await mainLoanContractModel.findAll({
      where: {
        Borrower_ID: id
      }
    })
    
    if(mainLoan === []){
      return ThrowError(CONSTANTS.HTTP_CODE.ERROR, "Không tồn tại khoản vay")
    }
    const idMainLoans = mainLoan.map(item => item.ID)
    return idMainLoans
    
  } catch(error){
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, error.message)
  }
}

const getIDLoansOfCustomer = async(id) => {
  try{
  
    if(!id){
      return ThrowError(CONSTANTS.HTTP_CODE.ERROR, "Bạn chưa đăng nhập")
    }
    const loans = await loanContractModel.findAll({
      where: {
        Lender_ID: id
      }
    })
    
    if(loans === []){
      return ThrowError(CONSTANTS.HTTP_CODE.ERROR, "Không tồn tại khoản vay")
    }
    const idLoans = loans.map(item => item.ID)
    return idLoans
    
  } catch(error){
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, error.message)
  }
}


const getRepaymentMainLoan = async (id,idMainLoan) => {
  try{

    const mainLoan = await getMainLoanOfCustomer(id, idMainLoan)
    const rePayment = await Payment_schedule.findAll({
      include: [{
        model: mainLoanContractModel,
        as: 'Main_Loan_Contract'
      }]
      ,where: {
        Loan_Contract_ID: null,
        Main_Loan_Contract_ID: idMainLoan,
      },
      order: [
        ['Payment_Date']
      ]
    })

    if(rePayment === []){
      return ThrowError(CONSTANTS.HTTP_CODE.ERROR, "Lịch trả nợ trống")
    }

    let listRePayment = []
    for(const item of rePayment){
      listRePayment.push({
        Main_Loan_Contract_ID: id,
        Contract_Number: item.Main_Loan_Contract.Contract_Number,
        Name: await GetNameCustomer(item.Main_Loan_Contract.Borrower_ID),
        Account_Number: await GetAccountNumber(item.Main_Loan_Contract.Borrower_ID),
        Amount: item.Amount,
        Payment_Date: item.Payment_Date,
        Actual_Payment_Date: item.Actual_Payment_Date
      })
    }
    return listRePayment
  } catch(error){
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, error.message)
  }
}

const getDetailtDebt = async (id) => {
  try{
  
    const debtCollection = await Payment_schedule.findAll({
      include: [
        { model: loanContractModel, as: 'Loan_Contract'}
      ]
      ,where: {
        Loan_Contract_ID: id
      },
      order: [
        ['Payment_Date']
      ]
     
    })
  
    if(debtCollection === []){
      return ThrowError(CONSTANTS.HTTP_CODE.ERROR, "Lịch thu nợ trống")
    }
    let listDebCollect = []
    for(const item of debtCollection){
      listDebCollect.push({
        Main_Loan_Contract_ID: item.Main_Loan_Contract_ID,
        Loan_Contract_ID: item.Loan_Contract_ID,
        Contract_Number: item.Loan_Contract.Contract_Number,
        Name: await GetNameCustomer(item.Loan_Contract.Lender_ID),
        Account_Number: await GetAccountNumber(item.Loan_Contract.Lender_ID),
        Amount: item.Amount,
        Payment_Date: item.Payment_Date,
        Actual_Payment_Date: item.Actual_Payment_Date
      })
    }
    return listDebCollect
  } catch(error){
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, error.message)
  }
}

const getSettlementLoanAccount = async (id) => {
  try{
    const mainLoans = await  mainLoanContractModel.findAll({
      where: {
        Borrower_ID: id,
        Main_Loan_Status_ID: 2,
        Payment_Due_Date: {[Op.ne]: null}
      }
    })
    
    let listMainLoan = []
    
    if(mainLoans === []){
      return listMainLoan
    }
    for(let item of mainLoans){
      listMainLoan.push({
        Main_Loan_Contract_ID: item.Main_Loan_Contract_ID,
        Contract_Number: item.Contract_Number,
        Status_ID: item.Main_Loan_Status_ID,
        Name: await GetNameCustomer(item.Borrower_ID),
        Account_Number: await GetAccountNumber(item.Borrower_ID),
        Amount: item.Amount,
        Payment_Date: moment(item.Payment_Due_Date).format('YYYY-MM-DD')
      })
    } 
    
    return listMainLoan;
  } catch(error){
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, error.message)
  }
}

const getSettlementIvestmentAccount = async(id) => {
  try{
    const investments = await loanContractModel.findAll({
      where: {
        Lender_ID: id,
        Loan_Contract_Status_ID: 2
      }
    })

    let listInvestment = []
    if( listInvestment === []){
      return listInvestment
    }
    for(const item of investments){
      listInvestment.push({
        Main_Loan_Contract_ID: item.Main_Loan_Contract_ID,
        Loan_Contract_ID: item.ID,
        Status_ID: item.Loan_Contract_Status_ID,
        Contract_Number: item.Contract_Number,
        Amount: item.Amount,
        Payment_Date: moment(item.payment_due_date).format('YYYY-MM-DD')
      })
    }
    return listInvestment
  } catch(error){
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, error.message)
  }
}

const getRePayMentAccount = async (id) => {
  try{
    const idMainLoans = await getIDMainLoansOfCustomer(id)
    const rePayment = await Payment_schedule.findAll({
      include: [{
        model: mainLoanContractModel,
        as: 'Main_Loan_Contract'
      }]
      ,where: {
        Loan_Contract_ID: null,
        Main_Loan_Contract_ID: {[Op.in]: idMainLoans},
      },
      order: [
        ['Payment_Date']
      ]
    })

    let listRePayment = []
    if(rePayment === []){
      return listRePayment
    }

    
    for(const item of rePayment){
      listRePayment.push({
        Main_Loan_Contract_ID: item.Main_Loan_Contract_ID,
        Contract_Number: item.Main_Loan_Contract.Contract_Number,
        Name: await GetNameCustomer(item.Main_Loan_Contract.Borrower_ID),
        Account_Number: await GetAccountNumber(item.Main_Loan_Contract.Borrower_ID),
        Amount: item.Amount,
        Payment_Date: item.Payment_Date,
        Actual_Payment_Date: item.Actual_Payment_Date
      })
    }
    
    return listRePayment
  } catch(error){
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, error.message)
  }
}

const getDebtAccount = async (id) => {
  try{
    const idLoans = await getIDLoansOfCustomer(id)
    const debtCollection = await Payment_schedule.findAll({
      include: [
        { model: loanContractModel, as: 'Loan_Contract'}
      ]
      ,where: {
        Loan_Contract_ID: {[Op.in]: idLoans}
      },
      order: [
        ['Payment_Date']
      ]
     
    })
    
    let listDebCollect = []

    if(debtCollection === []){
      return listDebCollect
    }
   
    for(const item of debtCollection){
      listDebCollect.push({
        Main_Loan_Contract_ID: item.Main_Loan_Contract_ID,
        Loan_Contract_ID: item.Loan_Contract_ID,
        Contract_Number: item.Loan_Contract.Contract_Number,
        Name: await GetNameCustomer(item.Loan_Contract.Lender_ID),
        Account_Number: await GetAccountNumber(item.Loan_Contract.Lender_ID),
        Amount: item.Amount,
        Payment_Date: item.Payment_Date,
        Actual_Payment_Date: item.Actual_Payment_Date
      })
    }
    return listDebCollect
  } catch(error){
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, error.message)
  }
}


const getScheduleAccount = async(id) => {
  try{  
    let listRePayment = await getRePayMentAccount(id)
    let listDebCollect = await getDebtAccount(id)
    let listSettlement = await getSettlementLoanAccount(id)
    let listInvestment = await getSettlementIvestmentAccount(id)
    let listSchedule = listRePayment.concat(listDebCollect, listSettlement, listInvestment)
    let obj = {}

    for(let item of listSchedule){
      obj[item.Payment_Date] = {"tra_no": [], "thu_no": [], "tat_toan_vay": [], "tat_toan_dau_tu": []}
    }

    for(let i=0; i<listRePayment.length; i++){
      obj[listRePayment[i].Payment_Date]["tra_no"].push(listRePayment[i])
    }

    for(let i=0; i<listDebCollect.length; i++){
      obj[listDebCollect[i].Payment_Date]["thu_no"].push(listDebCollect[i])
    }

    for(let i=0; i<listSettlement.length; i++){
      obj[listSettlement[i].Payment_Date]["tat_toan_vay"].push(listSettlement[i])
    }

    for(let i=0; i<listInvestment.length; i++){
      obj[listInvestment[i].Payment_Date]["tat_toan_dau_tu"].push(listInvestment[i])
    }

    return obj

  } catch(error){
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, error.message)
}}

module.exports = {
  createSchedule,
  getRepaymentSchedule,
  getDebtCollectionSchedule,
  getDetailRepayment,
  getDetailtDebt,
  getRepaymentMainLoan,
  getScheduleAccount
}
