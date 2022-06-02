const express = require('express');
const { verify } = require('../utils/helper/jwt_service')
const router = express.Router();

const login=require('../controllers/login.controller')

router.post(
  '/api/register', 
  login.register
);

router.post(
  '/api/login',
  login.login
);

router.post(
  '/api/confirm-login',
  login.confirmLogin
);

router.put(
  '/api/change_password',
  login.changePassword
)

router.post(
  '/api/refresh_token', 
  login.refreshToken
)

router.delete(
  '/api/logout',
  login.logout
);

router.get(
  '/api/status',
  login.getStatusUserProfile
);

router.get(
  '/api/admin/status',
  login.getAdminStatusUserProfile
);

module.exports = router;
