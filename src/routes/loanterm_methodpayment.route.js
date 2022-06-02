const express = require('express');
const router = express.Router();
const loan_term_method_payment = require('../controllers/loan_term_method_payment.controller');

router.get(
  '/api/loan_term_method_payment/rate_fee', 
  loan_term_method_payment.getRateAndFee
);

module.exports = router;