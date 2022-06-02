const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loan_contract.controller');

router.get(
  "/api/loan-contract/all",
  loanController.GetAllLoanContract
);

router.get(
  "/api/loan-contract/detail",
  loanController.GetLoanContractByID
);

router.get(
  "/api/loan-contract/loan-account-detail",
  loanController.GetLoanContractByIDAccount
);

router.get(
  "/api/loan-contract/investment-account-detail",
  loanController.GetInvestmentContractByIDAccount
);

router.get(
  '/api/loan-contract/list-contract',
  loanController.getLoanContract)

router.put(
  "/api/loan-contract/invest/:id",
  loanController.updateLenderToLoanContract
);

router.put(
  "/api/loan-contract/invest-many-loans",
  loanController.investManyLoans
);

router.get(
  "/api/loan-contract/detail_contract",
  loanController.detailLoanContractById
);

router.post(
  "/api/loan-contract/divison",
  loanController.LoanDivision
)

router.put(
  "/api/request-extend-loan-contract/confirm",
  loanController.confirmAcceptRequestExtendLoanContract
)

router.put(
  "/api/request-extend-loan-contract/cancel",
  loanController.confirmCancelRequestExtendLoanContract
)

router.get(
  '/api/request-extend-loan-contract',
  loanController.GetLoanContractExtendOfCustomer
)

module.exports = router;
