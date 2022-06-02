const express = require('express');
const router = express.Router();
const RequestInvestController = require('../controllers/request_investment.controller');

router.get(
  "/api/request-investment", 
  RequestInvestController.GetReqInvestmentForUser
);

router.get(
  "/api/admin/request-investment/all", 
  RequestInvestController.GetReqInvestmentForAdmin
);

router.post(
  "/api/request-investment/detail", 
  RequestInvestController.GetDetailReqInvestment
);

router.post(
  "/api/request-investment", 
  RequestInvestController.CreateReqInvestment
)

router.put(
  "/api/investment-auto/confirm",
  RequestInvestController.confirmInvestmentAuto
)

router.put(
  "/api/request-investment/cancel",
  RequestInvestController.cancelInvestmentAuto
)

router.put(
  "/api/admin/request-investment/cancel",
  RequestInvestController.cancelInvestmentAutoForAdmin
)

router.get(
  "/api/admin/request-investment",
  RequestInvestController.GetLoanForRequest
)

router.put(
  "/api/admin/request-investment",
  RequestInvestController.InsertLoanToRequestInvestment
)

module.exports = router;