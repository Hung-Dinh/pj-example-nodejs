const db = require('../models/init-models')
const Method_payment = db.method_payment

const getListMethodPayment = async () => {
  const method_payment = await Method_payment.findAll()
  return method_payment
}
module.exports = {
  getListMethodPayment
}
