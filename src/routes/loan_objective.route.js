const express = require('express');
const router = express.Router();
const loan_objectiveController = require('../controllers/loan_objective.controller');

router.get('/api/loan_objective', loan_objectiveController.getListLoanObjective)

module.exports = router;
