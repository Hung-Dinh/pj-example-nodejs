const express = require('express');
const router = express.Router();
const loan_termController = require('../controllers/loan_term.controller');

router.get('/api/loan_term', loan_termController.getListLoanTerm)

module.exports = router;
