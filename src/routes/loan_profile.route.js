const express = require('express');
const router = express.Router();
const loan_profile = require('../controllers/loan_profile.controller');

router.get('/api/loan_profile', loan_profile.listLoanProfile)

module.exports = router;