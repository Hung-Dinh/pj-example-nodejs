const express = require('express');
const router = express.Router();
const method_paymentController = require('../controllers/method_payment.controller');

router.get('/api/method_payment', method_paymentController.getListMethodPayment)

module.exports = router;
