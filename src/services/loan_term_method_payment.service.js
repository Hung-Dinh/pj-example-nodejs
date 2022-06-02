const db = require('../models/init-models')
const LoanTermPayment = db.loan_term_method_payment
const Loan_rate = db.loan_rate
const Loan_term = db.loan_term
const Loan_fee = db.loan_fee

const getRateAndFee = async (loan_term_id, method_payment_id, amount) => {
  const Term_payment = await LoanTermPayment.findOne({
    include: [
      {
        model: Loan_rate, as: 'Loan_Rate',
      },
      {
        model: Loan_fee, as: 'Loan_Fee'
      },
      {
        model: Loan_term, as: 'Loan_Term'
      }
    ],
    where: {
      Method_Payment_ID: method_payment_id,
      Loan_Term_ID: loan_term_id
    }

  })
  const Amount_Rate = parseFloat((amount * Term_payment.Loan_Rate.Rate * Term_payment.Loan_Term.Term_Value) / (365 * 100)).toFixed(2)
  if (!Term_payment) {
    return false
  }
  return {
    fee: Term_payment.Loan_Fee.Fee,
    rate: Term_payment.Loan_Rate.Rate,
    amountRate: Amount_Rate
  }
}

const getLoanTermMethodPaymentForRequestInvestmentAuto = async (loanTermID, loanRateID) => {
  const list = await LoanTermPayment.findAll({
    where: {
      Loan_Term_ID: loanTermID,
      Loan_Rate_ID: loanRateID
    }
  })
  const arrayList = []
  for (const item of list) {
    arrayList.push(item.ID)
  }
  return arrayList
}

const getLoanTermMethodPaymentByID = async (id) => {
  const result = LoanTermPayment.findOne({ where: { ID: id } })
  return result
}

module.exports = {
  getRateAndFee,
  getLoanTermMethodPaymentForRequestInvestmentAuto,
  getLoanTermMethodPaymentByID
}
