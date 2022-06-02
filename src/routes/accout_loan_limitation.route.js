const express = require('express');
const router = express.Router();
const loan_limitController = require('../controllers/account_loan_limitation.controller');

router.get('/api/account_loan_limitation', loan_limitController.getListLoanLimitation)
router.put('/api/account_loan_limitation',loan_limitController.updateLoanLimitation)
router.get('/api/account_loan_limitation_type',loan_limitController.getListLoanLimitationType)
router.get('/api/account_loan_limitation_status',loan_limitController.getListLoanLimitationStatus)
router.get('/api/account_loan_limitation/account',loan_limitController.getListAccountLoanLimitation)
module.exports = router;
