const db = require('../models/init-models');
const moment = require('moment');
const { ThrowError } = require('../utils/helper/response');
const { CONSTANTS } = require('../constants/constants');
const Loan_limit = db.account_loan_limitation
const Loan_limitation_type = db.account_loan_limitation_type
const Loan_limitation_status = db.account_loan_limitation_transaction_status
const accountLoanLimitTransModel = db.account_loan_limitation_transaction
const AccountModel = db.account
const CustomerModel = db.customer
const AccountBankModel = db.account_bank
const IdentityDocumentModel = db.indentity_document
const RelativeRelation = db.relative_relation
const RelativeCustomer = db.relative_customer

const IdentityDocumentService = require('./indentity.service')

const getListLoanLimitation = async () => {
  const loan_limit = await Loan_limit.findAll()
  return loan_limit

}
const getListLoanLimitationType = async () => {
  const type = await Loan_limitation_type.findAll()
  return type
}
const getListLoanLimitationStatus = async () => {
  const limitation_status = await Loan_limitation_status.findAll()
  return limitation_status
}
const createAccountLoanLimitation = async (id, entity) => {
  try {
    const loan_limit = await Loan_limit.create({
      ID: id,
      Amount_Credit: entity.Amount_Credit,
      Amount_Debit: entity.Amount_Debit,
      Amount_Release: entity.Amount_Release,
      Description: entity.Description
    })
    return loan_limit
  } catch {
    return false
  }
}

const findLoanLimitById = async (id) => {
  const loan_limit = await Loan_limit.findOne({
    where: {
      ID: id
    }
  })
  return { Amount_Credit: loan_limit.Amount_Credit, Amount_Debit: loan_limit.Amount_Debit, Amount_Release: loan_limit.Amount_Release }
}

const getTotalLoanLimitByID = async (id) =>{
  const loan = await findLoanLimitById(id)
  return loan.Amount_Credit + loan.Amount_Debit + loan.Amount_Release
}

const listLoanLimitation = async () => {

  const loan_limit = await Loan_limit.findAll({
    include: [
      {
        model: AccountModel, as: 'ID_account',
        include: [
          {
            model: CustomerModel, as: 'ID_customer',
            include: [{
              model: RelativeRelation, as: 'relative_relations',
              include: [
                {
                  model: RelativeCustomer, as: 'Relative_Customer',
                  attributes: ['Status']
                }
              ]
            }, {
              model: AccountBankModel, as: 'account_bank',

            }, {
              model: IdentityDocumentModel, as: 'indentity_document',
            }]
          }
        ],
      },
    ],
    where: {
      '$ID_account.ID_customer.Status$': 1,
      "$ID_account.ID_customer.account_bank.Status$": 1,
      "$ID_account.ID_customer.indentity_document.Status$": 1,
      "$ID_account.ID_customer.relative_relations.Relative_Customer.Status$": 1
    },
    order: [
      [
        'ID_account', 'ID_customer', 'ID', 'DESC'
      ]
    ]
  })
  let list_loan_limit = []
  for (let item of loan_limit) {

    let id_document = await IdentityDocumentService.getIdentityDocumentByID(item.ID)
    list_loan_limit.push({
      ID: item.ID,
      First_Name: item.ID_account.ID_customer.First_Name,
      Last_Name: item.ID_account.ID_customer.Last_Name,
      DateOfBirth: item.ID_account.ID_customer.DateOfBirth,
      PlaceOfBirth: item.ID_account.ID_customer.PlaceOfBirth,
      Sex: item.ID_account.ID_customer.Sex,
      PermanentResidence: item.ID_account.ID_customer.PermanentResidence,
      Address: item.ID_account.ID_customer.Address,
      Avatar: item.ID_account.ID_customer.Avatar,
      PhoneNumber: item.ID_account.ID_customer.PhoneNumber,
      Amount_Credit: item.Amount_Credit,
      Amount_Debit: item.Amount_Debit,
      Amount_Release: item.Amount_Release,
      IdentityDocuemt: id_document,
      Description: item.Description
    })
  }
  return list_loan_limit;
}

const updateLoanLimitation = async (
  id,
  Amount_Credit,
  Amount_Debit,
  Amount_Release,
  content
) => {
  const t = await db.sequelize.transaction()
  try {
    if (Amount_Credit !== '' && Amount_Debit === '' && Amount_Release === '') {
      const current = moment().format("YYYY-MM-DD HH:mm:ss");
      await Loan_limit.update({
        Amount_Credit: Amount_Credit,
      }, {
        where: { ID: id }
      }, { transaction: t })
      await accountLoanLimitTransModel.create({
        Account_Loan_Limitation_ID: id,
        Account_Loan_Limitation_Type_ID: 1,
        Account_Loan_Limitation_Status_ID: 3,
        Transaction_Date: current,
        Amount_Limitation_Change: Number(Amount_Credit),
        Customer_ID: id,
        Transaction_Content: content
      }, { transaction: t })
      await t.commit()
    }
    else if (Amount_Credit === '' && Amount_Debit !== '' && Amount_Release === '') {
      const current = moment().format("YYYY-MM-DD HH:mm:ss");
      await Loan_limit.update({
        Amount_Debit: Amount_Debit
      }, {
        where: { ID: id }
      }, { transaction: t })
      await accountLoanLimitTransModel.create({
        Account_Loan_Limitation_ID: id,
        Account_Loan_Limitation_Type_ID: 2,
        Account_Loan_Limitation_Status_ID: 3,
        Transaction_Date: current,
        Amount_Limitation_Change: Number(Amount_Debit),
        Customer_ID: id,
        Transaction_Content: content
      }, { transaction: t })
      await t.commit()
    }

    else if (Amount_Credit !== '' && Amount_Debit !== '' && Amount_Release === '') {
      const current = moment().format("YYYY-MM-DD HH:mm:ss");
      await Loan_limit.update({
        Amount_Credit: Amount_Credit,
        Amount_Debit: Amount_Debit
      }, {
        where: { ID: id }
      }, { transaction: t })
      await accountLoanLimitTransModel.create({
        Account_Loan_Limitation_ID: id,
        Account_Loan_Limitation_Type_ID: 1,
        Account_Loan_Limitation_Status_ID: 3,
        Transaction_Date: current,
        Amount_Limitation_Change: Number(Amount_Credit),
        Customer_ID: id,
        Transaction_Content: content
      }, { transaction: t })

      await accountLoanLimitTransModel.create({
        Account_Loan_Limitation_ID: id,
        Account_Loan_Limitation_Type_ID: 2,
        Account_Loan_Limitation_Status_ID: 3,
        Transaction_Date: current,
        Amount_Limitation_Change: Number(Amount_Debit),
        Customer_ID: id,
        Transaction_Content: content
      }, { transaction: t })
      await t.commit()
    }
    else {
      return false
    }

  } catch (error) {
    await t.rollback();
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, error.message)
  }
}


const updateLoanLimitationChange = async (
  id,
  amount,
  current
) => {
  const limitation = await findLoanLimitById(id)
  const t = await db.sequelize.transaction()
  try {
    if (Number(limitation.Amount_Release) >= Number(amount)) {
      await Loan_limit.update({
        Amount_Release: limitation.Amount_Credit,
        Amount_Debit: limitation.Amount_Debit,
        Amount_Release: Number(limitation.Amount_Release) - Number(amount),

      }, {
        where: { ID: id }
      }, { transaction: t })
      await accountLoanLimitTransModel.create({
        Account_Loan_Limitation_ID: id,
        Transaction_Date: current,
        Account_Loan_Limitation_Status_ID: 3,
        Account_Loan_Limitation_Type_ID: 3,
        Amount_Limitation_Change: Number(amount),
        Customer_ID: id
      }, { transaction: t })
      await t.commit()
    }
    else {
      const amount_debit = Number(amount) - Number(limitation.Amount_Release)
      if (limitation.Amount_Debit >= amount_debit) {
        await Loan_limit.update({
          Amount_Credit: limitation.Amount_Credit,
          Amount_Debit: Number(limitation.Amount_Debit) - Number(amount_debit),
          Amount_Release: 0,
        }, {
          where: { ID: id }
        }, { transaction: t })
        await accountLoanLimitTransModel.create({
          Account_Loan_Limitation_ID: id,
          Transaction_Date: current,
          Account_Loan_Limitation_Status_ID: 3,
          Account_Loan_Limitation_Type_ID: 3,
          Amount_Limitation_Change: Number(limitation.Amount_Release),
          Customer_ID: id,
        }, { transaction: t })

        await accountLoanLimitTransModel.create({
          Account_Loan_Limitation_ID: id,
          Transaction_Date: current,
          Account_Loan_Limitation_Status_ID: 3,
          Account_Loan_Limitation_Type_ID: 2,
          Amount_Limitation_Change: Number(amount_debit),
          Customer_ID: id,
        }, { transaction: t })
        await t.commit()

      }
      else {
        const amount_credit = Number(amount) - Number(limitation.Amount_Release) - Number(limitation.Amount_Debit)
        if (limitation.Amount_Credit >= amount_credit) {
          await Loan_limit.update({
            Amount_Credit: Number(limitation.Amount_Credit) - Number(amount_credit),
            Amount_Debit: 0,
            Amount_Release: 0
          }, {
            where: { ID: id }
          }, { transaction: t })
          await accountLoanLimitTransModel.create({
            Account_Loan_Limitation_ID: id,
            Transaction_Date: current,
            Account_Loan_Limitation_Status_ID: 3,
            Account_Loan_Limitation_Type_ID: 3,
            Amount_Limitation_Change: Number(limitation.Amount_Release),
            Customer_ID: id,
          }, { transaction: t })

          await accountLoanLimitTransModel.create({
            Account_Loan_Limitation_ID: id,
            Transaction_Date: current,
            Account_Loan_Limitation_Status_ID: 3,
            Account_Loan_Limitation_Type_ID: 2,
            Amount_Limitation_Change: Number(limitation.Amount_Debit),
            Customer_ID: id,
          }, { transaction: t })

          await accountLoanLimitTransModel.create({
            Account_Loan_Limitation_ID: id,
            Transaction_Date: current,
            Account_Loan_Limitation_Status_ID: 3,
            Account_Loan_Limitation_Type_ID: 1,
            Amount_Limitation_Change: Number(amount_credit),
            Customer_ID: id,
          }, { transaction: t })
          await t.commit()
        }
        else {
          return false
        }
      }

    }
  } catch (error) {
    await t.rollback();
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, error.message)
  }
}

const LoanLimitationAfterCancelOrBorrow = async (id, amount, new_amount, mainLoanStatusId, transDate) => {
  const limitation = await findLoanLimitById(id)
  const t = await db.sequelize.transaction()
  const limitationTrans = await LimitationTransaction(id, transDate)
  try {
    if (mainLoanStatusId == 5) {
      if (limitationTrans.length == 1) {
        await Loan_limit.update({
          Amount_Credit: limitation.Amount_Credit,
          Amount_Debit: limitation.Amount_Debit,
          Amount_Release: Number(limitation.Amount_Release) + Number(amount),
        }, {
          where: { ID: id }
        }, { transaction: t })
        await accountLoanLimitTransModel.update({
          Account_Loan_Limitation_ID: id,
          Account_Loan_Limitation_Status_ID: 3,
          Account_Loan_Limitation_Type_ID: 3,
          Amount_Limitation_Change: 0,
          Customer_ID: id
        }, {
          where: {
            ID: limitationTrans[0].ID
          }
        }, { transaction: t })
        await t.commit()
      }
      else if (limitationTrans.length == 2) {
        await Loan_limit.update({
          Amount_Credit: limitation.Amount_Credit,
          Amount_Debit: Number(limitation.Amount_Debit) + Number(limitationTrans[1].Amount_Limitation_Change),
          Amount_Release: Number(limitation.Amount_Release) + Number(limitationTrans[0].Amount_Limitation_Change),
        }, {
          where: { ID: id }
        }, { transaction: t })
        await accountLoanLimitTransModel.update({
          Account_Loan_Limitation_ID: id,
          Account_Loan_Limitation_Status_ID: 3,
          Account_Loan_Limitation_Type_ID: 3,
          Amount_Limitation_Change: 0,
          Customer_ID: id
        }, {
          where: {
            ID: limitationTrans[0].ID
          }
        }, { transaction: t })

        await accountLoanLimitTransModel.update({
          Account_Loan_Limitation_ID: id,
          Account_Loan_Limitation_Status_ID: 3,
          Account_Loan_Limitation_Type_ID: 2,
          Amount_Limitation_Change: 0,
          Customer_ID: id
        }, {
          where: {
            ID: limitationTrans[1].ID
          }
        }, { transaction: t })
        await t.commit()
      }
      else if (limitationTrans.length == 3) {
        await Loan_limit.update({
          Amount_Credit: Number(limitation.Amount_Credit) + Number(limitationTrans[2].Amount_Limitation_Change),
          Amount_Debit: Number(limitation.Amount_Debit) + Number(limitationTrans[1].Amount_Limitation_Change),
          Amount_Release: Number(limitation.Amount_Release) + Number(limitationTrans[0].Amount_Limitation_Change),
        }, {
          where: { ID: id }
        }, { transaction: t })

        await accountLoanLimitTransModel.update({
          Account_Loan_Limitation_ID: id,
          Account_Loan_Limitation_Status_ID: 3,
          Account_Loan_Limitation_Type_ID: 3,
          Amount_Limitation_Change: 0,
          Customer_ID: id
        }, {
          where: {
            ID: limitationTrans[0].ID
          }
        }, { transaction: t })

        await accountLoanLimitTransModel.update({
          Account_Loan_Limitation_ID: id,
          Account_Loan_Limitation_Status_ID: 3,
          Account_Loan_Limitation_Type_ID: 2,
          Amount_Limitation_Change: 0,
          Customer_ID: id
        }, {
          where: {
            ID: limitationTrans[1].ID
          }
        }, { transaction: t })

        await accountLoanLimitTransModel.update({
          Account_Loan_Limitation_ID: id,
          Account_Loan_Limitation_Status_ID: 3,
          Account_Loan_Limitation_Type_ID: 1,
          Amount_Limitation_Change: 0,
          Customer_ID: id
        }, {
          where: {
            ID: limitationTrans[2].ID
          }
        }, { transaction: t })
        await t.commit()
      }
    }
    else if (mainLoanStatusId == 2) {
      if (limitationTrans.length == 1) {
        await Loan_limit.update({
          Amount_Credit: limitation.Amount_Credit,
          Amount_Debit: limitation.Amount_Debit,
          Amount_Release: Number(limitation.Amount_Release) + Number(amount) - Number(new_amount),

        }, {
          where: { ID: id }
        }, { transaction: t })
        await accountLoanLimitTransModel.update({
          Account_Loan_Limitation_ID: id,
          Account_Loan_Limitation_Status_ID: 3,
          Account_Loan_Limitation_Type_ID: 3,
          Amount_Limitation_Change: - Number(new_amount),
          Customer_ID: id
        }, {
          where: {
            ID: limitationTrans[0].ID
          }
        }, { transaction: t })
        await t.commit()
      }

      if (limitationTrans.length == 2) {
        if (new_amount <= limitationTrans[0].Amount_Limitation_Change) {
          await Loan_limit.update({
            Amount_Credit: limitation.Amount_Credit,
            Amount_Debit: Number(limitation.Amount_Debit) + Number(limitationTrans[1].Amount_Limitation_Change),
            Amount_Release: Number(limitation.Amount_Release) + Number(limitationTrans[0].Amount_Limitation_Change) - Number(new_amount),
          }, {
            where: { ID: id }
          }, { transaction: t })
          await accountLoanLimitTransModel.update({
            Account_Loan_Limitation_ID: id,
            Account_Loan_Limitation_Status_ID: 3,
            Account_Loan_Limitation_Type_ID: 3,
            Amount_Limitation_Change: - Number(new_amount),
            Customer_ID: id
          },
            {
              where: {
                ID: limitationTrans[0].ID
              }
            }, { transaction: t })

          await accountLoanLimitTransModel.update({
            Account_Loan_Limitation_ID: id,
            Account_Loan_Limitation_Status_ID: 3,
            Account_Loan_Limitation_Type_ID: 2,
            Amount_Limitation_Change: 0,
            Customer_ID: id
          },
            {
              where: {
                ID: limitationTrans[1].ID
              }
            }, { transaction: t })
          await t.commit()
        }
        else {
          await Loan_limit.update({
            Amount_Credit: limitation.Amount_Credit,
            Amount_Debit: Number(limitation.Amount_Debit) + Number(limitationTrans[1].Amount_Limitation_Change) + Number(limitationTrans[0].Amount_Limitation_Change) - new_amount,
            Amount_Release: 0
          }, {
            where: { ID: id }
          }, { transaction: t })
          await accountLoanLimitTransModel.update({
            Account_Loan_Limitation_ID: id,
            Account_Loan_Limitation_Status_ID: 3,
            Account_Loan_Limitation_Type_ID: 2,
            Amount_Limitation_Change: - (new_amount - Number(limitationTrans[0].Amount_Limitation_Change)),
            Customer_ID: id
          },
            {
              where: {
                ID: limitationTrans[1].ID
              }
            }, { transaction: t })
          await t.commit()
        }
      }
      if (limitationTrans.length == 3) {
        if (new_amount <= limitationTrans[0].Amount_Limitation_Change) {
          await Loan_limit.update({
            Amount_Credit: limitation.Amount_Credit + Number(limitationTrans[2].Amount_Limitation_Change),
            Amount_Debit: Number(limitation.Amount_Debit) + Number(limitationTrans[1].Amount_Limitation_Change),
            Amount_Release: Number(limitation.Amount_Release) + Number(limitationTrans[0].Amount_Limitation_Change) - Number(new_amount),
          }, {
            where: { ID: id }
          }, { transaction: t })
          await accountLoanLimitTransModel.update({
            Account_Loan_Limitation_ID: id,
            Account_Loan_Limitation_Status_ID: 3,
            Account_Loan_Limitation_Type_ID: 3,
            Amount_Limitation_Change: - Number(new_amount),
            Customer_ID: id
          },
            {
              where: {
                ID: limitationTrans[0].ID
              }
            }, { transaction: t })

          await accountLoanLimitTransModel.update({
            Account_Loan_Limitation_ID: id,
            Account_Loan_Limitation_Status_ID: 3,
            Account_Loan_Limitation_Type_ID: 2,
            Amount_Limitation_Change: 0,
            Customer_ID: id
          },
            {
              where: {
                ID: limitationTrans[1].ID
              }
            }, { transaction: t })

          await accountLoanLimitTransModel.update({
            Account_Loan_Limitation_ID: id,
            Account_Loan_Limitation_Status_ID: 3,
            Account_Loan_Limitation_Type_ID: 1,
            Amount_Limitation_Change: 0,
            Customer_ID: id
          },
            {
              where: {
                ID: limitationTrans[2].ID
              }
            }, { transaction: t })
          await t.commit()
        }
        else if (limitationTrans[0].Amount_Limitation_Change < new_amount && new_amount <= limitationTrans[0].Amount_Limitation_Change + limitationTrans[1].Amount_Limitation_Change) {
          await Loan_limit.update({
            Amount_Credit: limitation.Amount_Credit + Number(limitationTrans[2].Amount_Limitation_Change),
            Amount_Debit: Number(limitation.Amount_Debit) + Number(limitationTrans[1].Amount_Limitation_Change) + Number(limitationTrans[0].Amount_Limitation_Change) - new_amount,
            Amount_Release: 0
          }, {
            where: { ID: id }
          }, { transaction: t })

          await accountLoanLimitTransModel.update({
            Account_Loan_Limitation_ID: id,
            Account_Loan_Limitation_Status_ID: 3,
            Account_Loan_Limitation_Type_ID: 2,
            Amount_Limitation_Change: - (new_amount + Number(limitationTrans[0].Amount_Limitation_Change)),
            Customer_ID: id
          },
            {
              where: {
                ID: limitationTrans[1].ID
              }
            }, { transaction: t })

          await accountLoanLimitTransModel.update({
            Account_Loan_Limitation_ID: id,
            Account_Loan_Limitation_Status_ID: 3,
            Account_Loan_Limitation_Type_ID: 1,
            Amount_Limitation_Change: 0,
            Customer_ID: id
          },
            {
              where: {
                ID: limitationTrans[2].ID
              }
            }, { transaction: t })
          await t.commit()
        }
        else {
          await Loan_limit.update({
            Amount_Credit: limitation.Amount_Credit + Number(limitationTrans[2].Amount_Limitation_Change) + Number(limitationTrans[1].Amount_Limitation_Change) + Number(limitationTrans[0].Amount_Limitation_Change) - new_amount,
            Amount_Debit: 0,
            Amount_Release: 0
          }, {
            where: { ID: id }
          }, { transaction: t })

          await accountLoanLimitTransModel.update({
            Account_Loan_Limitation_ID: id,
            Account_Loan_Limitation_Status_ID: 3,
            Account_Loan_Limitation_Type_ID: 1,
            Amount_Limitation_Change: -(amount - new_amount),
            Customer_ID: id
          },
            {
              where: {
                ID: limitationTrans[2].ID
              }
            }, { transaction: t })
          await t.commit()
        }
      }


    }
    else {
      return false
    }
  } catch (error) {
    return false
  }
}

const LoanLimitationAfterPayment = async (id, amount, mainLoanStatusId, transDate, newTransDate) => {
  const limitation = await findLoanLimitById(id)
  const t = await db.sequelize.transaction()
  const limitationTrans = await LimitationTransaction(id, transDate)
  try {

    if (mainLoanStatusId == 4) {
      if (limitationTrans.length == 1) {
        await Loan_limit.update({
          Amount_Credit: limitation.Amount_Credit,
          Amount_Debit: limitation.Amount_Debit,
          Amount_Release: Number(limitation.Amount_Release) + Number(amount),

        }, {
          where: { ID: id }
        }, { transaction: t })
        await accountLoanLimitTransModel.create({
          Account_Loan_Limitation_ID: id,
          Transaction_Date: newTransDate,
          Account_Loan_Limitation_Status_ID: 3,
          Account_Loan_Limitation_Type_ID: 3,
          Amount_Limitation_Change: Number(amount),
          Customer_ID: id
        }, { transaction: t })
        await t.commit()
      }

      if (limitationTrans.length == 2) {
        await Loan_limit.update({
          Amount_Credit: limitation.Amount_Credit,
          Amount_Debit: Number(limitation.Amount_Debit) + Number(limitationTrans[1].Amount_Limitation_Change),
          Amount_Release: Number(limitation.Amount_Release) + Number(limitationTrans[0].Amount_Limitation_Change),
        }, {
          where: { ID: id }
        }, { transaction: t })
        await accountLoanLimitTransModel.create({
          Account_Loan_Limitation_ID: id,
          Transaction_Date: newTransDate,
          Account_Loan_Limitation_Status_ID: 3,
          Account_Loan_Limitation_Type_ID: 3,
          Amount_Limitation_Change: Number(limitationTrans[0].Amount_Limitation_Change),
          Customer_ID: id
        }, { transaction: t })

        await accountLoanLimitTransModel.create({
          Account_Loan_Limitation_ID: id,
          Transaction_Date: newTransDate,
          Account_Loan_Limitation_Status_ID: 3,
          Account_Loan_Limitation_Type_ID: 2,
          Amount_Limitation_Change: Number(limitationTrans[1].Amount_Limitation_Change),
          Customer_ID: id
        }, { transaction: t })
        await t.commit()
      }
      if (limitationTrans.length == 3) {
        await Loan_limit.update({
          Amount_Credit: limitation.Amount_Credit + Number(limitationTrans[2].Amount_Limitation_Change),
          Amount_Debit: Number(limitation.Amount_Debit) + Number(limitationTrans[1].Amount_Limitation_Change),
          Amount_Release: Number(limitation.Amount_Release) + Number(limitationTrans[0].Amount_Limitation_Change),
        }, {
          where: { ID: id }
        }, { transaction: t })
        await accountLoanLimitTransModel.create({
          Account_Loan_Limitation_ID: id,
          Transaction_Date: newTransDate,
          Account_Loan_Limitation_Status_ID: 3,
          Account_Loan_Limitation_Type_ID: 3,
          Amount_Limitation_Change: Number(limitationTrans[0].Amount_Limitation_Change),
          Customer_ID: id
        }, { transaction: t })

        await accountLoanLimitTransModel.create({
          Account_Loan_Limitation_ID: id,
          Transaction_Date: newTransDate,
          Account_Loan_Limitation_Status_ID: 3,
          Account_Loan_Limitation_Type_ID: 2,
          Amount_Limitation_Change: Number(limitationTrans[1].Amount_Limitation_Change),
          Customer_ID: id
        }, { transaction: t })

        await accountLoanLimitTransModel.create({
          Account_Loan_Limitation_ID: id,
          Transaction_Date: newTransDate,
          Account_Loan_Limitation_Status_ID: 3,
          Account_Loan_Limitation_Type_ID: 1,
          Amount_Limitation_Change: Number(limitationTrans[2].Amount_Limitation_Change),
          Customer_ID: id
        }, { transaction: t })
        await t.commit()
      }
    }
    else {
      return false
    }
  } catch (error) {
    return false
  }
}


const LimitationTransaction = async (id, contract_date) => {
  const limitationTrans = await accountLoanLimitTransModel.findAll({
    where: {
      Customer_ID: id,
      Transaction_Date: contract_date
    }
  })
  return limitationTrans
}

module.exports = {
  getListLoanLimitation,
  getListLoanLimitationType,
  getListLoanLimitationStatus,
  createAccountLoanLimitation,
  findLoanLimitById,
  updateLoanLimitation,
  listLoanLimitation,
  updateLoanLimitationChange,
  LoanLimitationAfterCancelOrBorrow,
  LimitationTransaction,
  LoanLimitationAfterPayment,
  getTotalLoanLimitByID
}
