const express = require('express');
const router = express.Router();
const relative_cutomer = require('../controllers/relative_customer.controller');

router.post('/api/relative_customer',relative_cutomer.createRelativeCustomer)
router.put('/api/relative_customer',relative_cutomer.editRelativeCustomer)
router.put('/api/admin/relative_customer',relative_cutomer.AdminEditRelativeCustomer)
router.get('/api/relative_customer',relative_cutomer.getListRelativeCustomer)
module.exports=router
