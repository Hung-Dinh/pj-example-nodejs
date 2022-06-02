const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const jwt_service = require('../utils/helper/jwt_service');
const Customer_service = require('../services/customer.services')
const Bank_service = require('../services/bank.service')
const Account_service = require('../services/account.service')
const User_service = require('../services/user.service');
const env = require("./../config/env");
const { ApiResponse, ThrowError } = require('../utils/helper/response');
const { CONSTANTS } = require('../constants/constants');
const LoginService = require('../services/login.service');
const Loan_limit = require('../services/account_loan_limitation.service')
const Indentity = require('../services/indentity.service')
const Relative_Customer = require('../services/relative_customer.service')
const AccountBlockService = require('../services/account_block.service')
const AccountLoanService = require('../services/account_loan.service')
const AccountInvestmentService = require('../services/account_investment.service')
const notificationService = require('../services/notifications.service')
const sampleNotify = require("../constants/notifications")

module.exports = {
  register: async (req, res) => {
    try {
      const entity = { ...req.body };
      const user = await User_service.findByUserName(entity.UserName)
      if (user.length > 0) {
        return ApiResponse(
          res,
          false,
          CONSTANTS.NOT_AUTHENTICATION,
          CONSTANTS.HTTP_CODE.NOT_AUTHENTICATION
        );
      } else {
        entity.Password = bcrypt.hashSync(entity.Password, 6);
        const customer = await Customer_service.createCustomer(entity, entity.UserName)
        await Account_service.createAccount(customer.ID, entity, entity.UserName)
        await Bank_service.createBank(customer.ID, entity)
        await Loan_limit.createAccountLoanLimitation(customer.ID, entity)
        await Indentity.createDocument(customer.ID, entity)
        await Relative_Customer.createRelativeCustomer(customer.ID, entity)
        await AccountBlockService.createAccountBlock(customer.ID, entity)
        await AccountLoanService.createAccountLoan(customer.ID, entity)
        await AccountInvestmentService.createAccountInvestment(customer.ID, entity)
        await User_service.Create(customer.ID, entity)
        // await notificationService.sendNotifyClient(customer.ID, 7, sampleNotify.create_account_success)
        const access_token = jwt_service.sign({ id: user.ID });
        const refresh_token = jwt.sign({ id: user.ID }, env.key.REFRESH_SECRET, { expiresIn: '7d' })
        res.cookie('refresh_token', refresh_token, {
          httpOnly: true,
          path: '/api/customer/refresh_token'
        })
        res.setHeader('access_token', `${access_token}`);
        return ApiResponse(
          res,
          true,
          CONSTANTS.HTTP_CODE.SUCCESS,
          CONSTANTS.SUCCESS,
          access_token
        );
      }
    } catch (error) {
      return ApiResponse(
        res,
        false,
        CONSTANTS.HTTP_CODE.ERROR,
        error.message
      );
    }
  },

  confirmRegister: async (req, res) => {

  },

  confirmLogin: async (req, res) => {
    try {
      const { UserName, otp_code } = req.body;
      const user = await User_service.findOne(UserName);
      const otp = await LoginService.TestOTP(UserName, otp_code);
      if (!otp) {
        return ThrowError(CONSTANTS.HTTP_CODE.ERROR, CONSTANTS.ERROR)
      }
      const access_token = jwt_service.sign({ id: user.ID });
      const refresh_token = jwt.sign({ id: user.ID }, env.key.REFRESH_SECRET, { expiresIn: '7d' })
      res.cookie('refresh_token', refresh_token, {
        httpOnly: true,
        path: '/api/customer/refresh_token'
      })
      res.setHeader('access_token', `${access_token}`);

      return ApiResponse(
        res,
        true,
        CONSTANTS.HTTP_CODE.SUCCESS,
        CONSTANTS.SUCCESS,
        access_token
      );
    } catch (error) {
      return ApiResponse(
        res,
        false,
        CONSTANTS.HTTP_CODE.ERROR,
        error.message
      );
    }
  },

  login: async (req, res) => {
    const { UserName, Password } = req.body;
    const user = await User_service.findOne(UserName)
    if (user) {
      const compare_pass = bcrypt.compareSync(Password, user.Password);
      const checkOtp = await LoginService.checkOtp(UserName);
      console.log(checkOtp);
      const id = req.ID;
      if (checkOtp && id) {
        const access_token = jwt_service.sign({ id: user.ID });
        const refresh_token = jwt.sign({ id: user.ID }, env.key.REFRESH_SECRET, { expiresIn: '7d' })
        res.cookie('refresh_token', refresh_token, {
          httpOnly: true,
          path: '/api/customer/refresh_token'
        })
        res.setHeader('access_token', `${access_token}`);
        return ApiResponse(
          res,
          true,
          CONSTANTS.HTTP_CODE.SUCCESS,
          CONSTANTS.SUCCESS,
          access_token
        );
      }
      if (checkOtp) {
        console.log(1);
        return ApiResponse(
          res,
          true,
          CONSTANTS.HTTP_CODE.SUCCESS,
          "Otp vừa gửi vẫn còn thời hạn"
        );
      }
      if (compare_pass) {
        const otp = await LoginService.CreateOtp(UserName);
        return ApiResponse(
          res,
          true,
          CONSTANTS.HTTP_CODE.SUCCESS,
          CONSTANTS.SUCCESS
        );
      } else {
        return ApiResponse(
          res,
          false,
          CONSTANTS.HTTP_CODE.NOT_AUTHENTICATION,
          CONSTANTS.NOT_AUTHENTICATION
        );
      }
    } else {
      return ApiResponse(
        res,
        false,
        CONSTANTS.HTTP_CODE.NOT_FOUND_ERR,
        CONSTANTS.NOT_FOUND
      );
    }
  },

  changePassword: async (req, res) => {
    const id = req.ID
    const { old_password, Password } = req.body
    const user = await User_service.findUserById(id)
    if (user) {
      const result = bcrypt.compareSync(old_password, user.Password)
      if (result) {
        const hash = bcrypt.hashSync(Password, 6)
        await User_service.changePassword(user.UserName, hash)
        await notificationService.sendNotifyClient(customer.ID, 7, sampleNotify.change_password)
        return ApiResponse(
          res,
          true,
          CONSTANTS.HTTP_CODE.SUCCESS,
          CONSTANTS.SUCCESS
        );
      } else {
        return ApiResponse(
          res,
          false,
          CONSTANTS.HTTP_CODE.NOT_AUTHENTICATION,
          CONSTANTS.NOT_AUTHENTICATION
        );
      }
    } else {
      return ApiResponse(
        res,
        false,
        CONSTANTS.HTTP_CODE.NOT_FOUND_ERR,
        CONSTANTS.NOT_FOUND
      );
    }
  },

  logout: async (req, res) => {
    res.removeHeader('access_token')
  },

  refreshToken: async (req, res) => {
    const refreshToken = req.cookies.refresh_token
    const user = jwt.verify(refreshToken, process.env.REFRESH_SECRET)
    const token = jwt_service.sign({ id: user.id })
    res.setHeader('access_token', token)
    res.send(token)
  },

  getStatusUserProfile: async (req, res) => {
    try {
      const id = req.ID
      const statusCustomer = await Customer_service.getStatusCustomer(id)
      const statusBank = await Bank_service.getStatusBank(id)
      const statusDocument = await Indentity.getStatusDocument(id)
      const statusRelativeCustomer = await Relative_Customer.getStatusRelativeCustomer(id)
      const statusVideo = await Customer_service.getVideoStatus(id)
      const result = { statusCustomer, statusBank, statusDocument, statusRelativeCustomer, statusVideo }
      return ApiResponse(
        res,
        true,
        CONSTANTS.HTTP_CODE.SUCCESS,
        CONSTANTS.SUCCESS,
        result
      );
    } catch (error) {
      return ApiResponse(
        res,
        false,
        CONSTANTS.HTTP_CODE.ERROR,
        error.message
      )
    }
  },

  getAdminStatusUserProfile: async (req, res) => {
    try {
      const { id } = req.body
      const statusCustomer = await Customer_service.getStatusCustomer(id)
      const statusBank = await Bank_service.getStatusBank(id)
      const statusDocument = await Indentity.getStatusDocument(id)
      const statusRelativeCustomer = await Relative_Customer.getStatusRelativeCustomer(id)
      const statusVideo = await Customer_service.getVideoStatus(id)
      const result = { statusCustomer, statusBank, statusDocument, statusRelativeCustomer, statusVideo }
      return ApiResponse(
        res,
        true,
        CONSTANTS.HTTP_CODE.SUCCESS,
        CONSTANTS.SUCCESS,
        result
      );
    } catch (error) {
      return ApiResponse(
        res,
        false,
        CONSTANTS.HTTP_CODE.ERROR,
        error.message
      )
    }
  }
}
