const express = require('express');
const router = express.Router();
const accountController = require('../controllers/account.controller');

router.get(
  '/api/account/detail', 
  accountController.GetAccountByID
);

module.exports = router;