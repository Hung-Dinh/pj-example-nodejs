const express = require('express');
const router = express.Router();
const bank = require('../controllers/bank.controller');

router.put(
  '/api/bank', 
  bank.updateBank
);

router.put(
  '/api/admin/bank', 
  bank.AdminUpdateBank
);

router.post(
  '/api/bank-system-transactions', 
  bank.CreateTransBank
);

module.exports = router;