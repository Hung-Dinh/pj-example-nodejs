const express = require('express');
const router = express.Router();
const customer = require('../controllers/customer.controller');
const uploadAvatar = require('../middlewares/uploadAvatar');
const uploadVideo = require('../middlewares/uploadVideoMiddleware');

router.get('/api/customer', customer.findAllCustomer);
router.get('/api/customer/video/:id', customer.ViewVideo);
router.put('/api/customer/video', customer.AdminConfirmVideo)
router.put('/api/customer',uploadAvatar,customer.editCustomer)
router.put('/api/admin/customer', customer.AdminEditCustomer)
router.delete('/api/customer', customer.deleteCustomer)
router.get('/api/customer/profile', customer.findOneCustomer);
router.put('/api/video/customer',uploadVideo,customer.uploadVideo);
router.get('/api/admin/customer-profile/:id', customer.findCustomer);
router.get('/api/admin/customer-profile', customer.findOneCustomerByUserName);
module.exports = router;
