const db = require('../models/init-models');
const Loan_objective = db.loan_objective

const getListLoanObjective = async () => {
  const loan_objective = await Loan_objective.findAll()
  return loan_objective
}

module.exports = {
  getListLoanObjective
}
