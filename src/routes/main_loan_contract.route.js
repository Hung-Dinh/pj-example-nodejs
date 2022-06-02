const express = require('express');
const router = express.Router();
const mainLoanController = require('../controllers/main_loan_contract.controller');

router.get(
  "/api/customer/main-loan-contract/all", 
  mainLoanController.GetAllMainLoanContractOfCustomer
);

router.get(
  "/api/main-loan-contract/account-detail",
  mainLoanController.GetMainLoanContractsByIDAccount
);

router.post(
  "/api/main-loan-contract",
  mainLoanController.CreateMainLoanContract
);

router.put(
  "/api/main-loan-contract",
  mainLoanController.UpdateMainLoanContract
);

router.get(
  "/api/main-loan-contract/detail", 
  mainLoanController.GetLoanContractByMainLoanID
);

router.get(
  "/api/admin/main-loan-contract/detail", 
  mainLoanController.GetLoanContractByMainLoanID
);

router.put(
  "/api/main-loan-contract/cancel",
  mainLoanController.MainLoanContractCancel
)

router.put(
  "/api/admin/main-loan-contract/cancel",
  mainLoanController.MainLoanContractCancelForAdmin
)

router.put(
  "/api/admin/main-loan-contract/confirmation",
  mainLoanController.MainLoanConfirmationForAdmin
)

router.get(
  "/api/admin/main-loan-contract", 
  mainLoanController.GetAllMainLoanContractForAdminDivision
);

router.put(
  "/api/main-loan-contract/req-extend",
  mainLoanController.RequestExtendContract
)

router.put(
  "/api/admin/main-loan-contract/approve-extend-contract",
  mainLoanController.AdminApproveExtendContract
)

router.get(
  "/api/admin/main-loan-contract/done",
  mainLoanController.getListMainLoanDoneForAdminConfirm
)

router.get(
  "/api/admin/main-loan-contract/disbursement",
  mainLoanController.GetAllMainLoanContractForDisbursement
)

router.get(
  "/api/admin/main-loan-contract/extension",
  mainLoanController.GetAllMainLoanContractForExtension
)

router.get(
  "/api/admin/main-loan-contract/division",
  mainLoanController.GetAllMainLoanContractForDivision
)

router.get(
  "/api/admin/main-loan-contract/waitting-cancel",
  mainLoanController.GetMainLoanContractWaittingCancel
)

router.put(
  "/api/admin/main-loan-contract/waitting-cancel",
  mainLoanController.putMainLoanContractWaittingCancel
)

router.get(
  "/api/admin/main-loan-contract/disbursed",
  mainLoanController.getAllListMainLoanDisbursed
)

router.get(
  "/api/admin/main-loan-contract/settlement",
  mainLoanController.GetSettlementList
)

router.put(
  "/api/main-loan-contract/payment",
  mainLoanController.ReqPaymentOfCustomer
)

router.put(
  "/api/admin/main-loan-contract/m4u/payment",
  mainLoanController.m4uPaymentForCustomer
)

router.get(
  "/api/admin/main-loan-contract/overdue-contract",
  mainLoanController.GetListOverDueContractForAdmin
)

router.get(
  "/api/admin/main-loan-contract/settlement-contract",
  mainLoanController.GetListSettlementContractForAdmin
)

router.get(
  "/api/admin/main-loan-contract/all",
  mainLoanController.GetAllMainLoanContractForAdminView
)

router.get(
  "/api/main-loan-contract/:id",
  mainLoanController.GetMainLoanContractByID
)

router.get(
  "/api/admin/main-loan-contract-all/detail",
  mainLoanController.GetMainLoanContractDetailByAdmin
)

router.put(
  "/api/main-loan-contract/continue-to-borrow",
  mainLoanController.ContinueToBorrow
)

module.exports = router;
