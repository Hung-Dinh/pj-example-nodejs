const express = require('express');
const router = express.Router();
const loan_rate = require('../controllers/loan_rate.controller');

router.get('/api/loan_rate', loan_rate.getListLoanRate)

module.exports = router;
