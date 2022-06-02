const express = require('express');
const router = express.Router();

const accountBlockController = require('../controllers/account_block.controller');

router.post('/api/request-get-money', accountBlockController.CreateReqGetMoney)

router.get('/api/ReqWithDrawal-personal', accountBlockController.GetReqWithDrawalPersonal)
router.get('/api/WithDrawal-personal', accountBlockController.WithDrawalPersonal)

router.get('/api/ReqWithDrawal', accountBlockController.GetReqWithDrawal)
router.put('/api/Admin-confirm-ReqWithDrawal', accountBlockController.AdminConfirmReqWithDrawal)

router.get('/api/ReqWithDrawal-account', accountBlockController.GetReqWithDrawalAccount)
router.put('/api/Employee-confirm-ReqWithDrawal', accountBlockController.EmployeeConfirmReqWithDrawal)


router.get('/api/ReqWithDrawal-detail/:id', accountBlockController.GetReqWithDrawalDetail)

module.exports = router;