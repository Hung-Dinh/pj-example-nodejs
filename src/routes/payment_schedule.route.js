const express = require('express');
const router = express.Router();
const payment_schedule = require('../controllers/payment_schedule.controller');

router.post('/api/payment-schedule/:id', payment_schedule.createSchedule)
router.get('/api/repayment-schedule', payment_schedule.getRepaymentSchedule)
router.get('/api/debt-collection-schedule', payment_schedule.getDebtCollectionSchedule)

router.get('/api/repayment-detail/:id', payment_schedule.getDetailRepayment)
router.get('/api/debt-detail/:id', payment_schedule.getDetailtDebt)

router.get('/api/repayment-mainloan-account/:id', payment_schedule.getRepaymentMainLoan)
router.get('/api/schedule-account', payment_schedule.getScheduleAccount)

module.exports = router;
