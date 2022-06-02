const db = require('../models/init-models');
const Loan_rate = db.loan_rate
const { Op } = require('sequelize')

const listLoanRate = async () => {
  const loan_rate = await Loan_rate.findAll()
  let list_rate = []
  for (const item of loan_rate) {
    list_rate.push({
      id: item.ID,
      rate: item.Rate
    })
  }
  return list_rate
}

const getListLoanRateForRequestInvestmentAuto = async (rateValue) => {
  const listRate = await Loan_rate.findAll({
    where: { Rate: { [Op.gte]: rateValue } }
  })
  const arrayRate =[]
  for(const item of listRate){
    arrayRate.push(item.ID)
  }
  return arrayRate;
}

module.exports = {
  listLoanRate,
  getListLoanRateForRequestInvestmentAuto
}