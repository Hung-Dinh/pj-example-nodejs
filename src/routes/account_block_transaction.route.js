const express = require('express');
const router = express.Router();
const account_block_transaction = require('../controllers/account_block_transaction.controller');

router.get(
  '/api/account_block_transaction', 
  account_block_transaction.getWithdrawalHistory
);
module.exports=router