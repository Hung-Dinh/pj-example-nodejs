const db = require('../models/init-models');
const Loan_term = db.loan_term

const getListLoanTerm = async () => {
  const loan_term = await Loan_term.findAll()
  return loan_term
}

module.exports = {
  getListLoanTerm
}
