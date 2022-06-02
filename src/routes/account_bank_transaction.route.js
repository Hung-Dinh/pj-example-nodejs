const express = require('express');
const router = express.Router();
const acc_bank_trans = require('../controllers/account_bank_transcation.controller');

router.get(
  '/api/acc_bank_trans/transfers', 
  acc_bank_trans.getAccountBankTransfers
);
router.get(
    '/api/acc_bank_trans/receive', 
    acc_bank_trans.getAccountBankReceiveMoney
  );

  router.get(
    '/api/acc_bank_trans/receive-completed', 
    acc_bank_trans.getAccountBankReceiveComplete
  );

  router.get(
    '/api/acc_bank_trans/receive/:id', 
    acc_bank_trans.getAccountBankReceiveDetail
  );

  router.put(
    '/api/acc_bank_trans/receive/:id', 
    acc_bank_trans.editAccountBankReceiveMoney
  );
  
  router.put(
    '/api/acc_bank_trans/confirm-recharge', 
    acc_bank_trans.confirmRecharge
  );

module.exports = router;