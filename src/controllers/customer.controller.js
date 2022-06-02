const Customer_service = require('../services/customer.services')
const { ApiResponse, ThrowError } = require('../utils/helper/response');
const { CONSTANTS } = require('../constants/constants');
const Account = require('../services/account.service');
const Bank = require('../services/bank.service')
const Loan_limit = require('../services/account_loan_limitation.service')
const Document = require('../services/indentity.service')
const Relationship = require('../services/relative_relation.service')
const uploadVideo = require('../middlewares/uploadVideoMiddleware')
const UserService = require('../services/user.service')
const notificationService = require('../services/notifications.service')

module.exports = {
  findAllCustomer: async (req, res) => {
    try {
      const customers = await Customer_service.getListCustomer()
      return ApiResponse(
        res,
        true,
        CONSTANTS.HTTP_CODE.SUCCESS,
        CONSTANTS.SUCCESS,
        customers
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

  findOneCustomer: async (req, res) => {
    try {
      const id = req.ID;
      const customer = await Customer_service.getCustomerByID(id)
      const account = await Account.GetAccountByID(id)
      const document = await Document.getDocument(id)
      const relation = await Relationship.getRelativeRelation(id)
      const bank = await Bank.findBankById(id)
      const loan_limit = await Loan_limit.findLoanLimitById(id)
      const result = { customer, account, bank, loan_limit, document, relation }
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


  findOneCustomerByUserName: async (req, res) => {
    try {
      const { username } = req.query;
      const getCustomerUserName = await UserService.findOne(username)
      const customer = await Customer_service.getCustomerByID(getCustomerUserName.ID)
      const account = await Account.GetAccountByID(getCustomerUserName.ID)
      const document = await Document.getDocument(getCustomerUserName.ID)
      const relation = await Relationship.getRelativeRelation(getCustomerUserName.ID)
      const bank = await Bank.findBankById(getCustomerUserName.ID)
      const loan_limit = await Loan_limit.findLoanLimitById(getCustomerUserName.ID)
      const result = { customer, account, bank, loan_limit, document, relation }
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

  editCustomer: async (req, res) => {
    try {
      const id = req.ID
      const {
        First_Name,
        Last_Name,
        DateOfBirth,
        PlaceOfBirth,
        PermanentResidence,
        Address,
        PhoneNumber,
        Descriptions,
        Url_Facebook,
        Contact_Often,
        Sex } = req.body
        let avatar;

        if(req.file === undefined){
          avatar = await Customer_service.findAvatar(id)
        } else{
          avatar = req.file.filename
        }

      const customer =await Customer_service.editCustomer(
        id,
        First_Name,
        Last_Name,
        DateOfBirth,
        PlaceOfBirth,
        PermanentResidence,
        Address,
        PhoneNumber,
        Descriptions,
        Url_Facebook,
        Contact_Often,
        Sex,
        avatar)
     

      if (customer) {
        return ApiResponse(
          res,
          true,
          CONSTANTS.HTTP_CODE.SUCCESS,
          CONSTANTS.SUCCESS,
          customer
        );
      } 
    } catch (error) {
      return ApiResponse(
        res,
        false,
        CONSTANTS.HTTP_CODE.ERROR,
        error.message
      )
    }
  },

  AdminEditCustomer: async (req, res) => {
    try {
      const {
        id,
        First_Name_Status,
        Last_Name_Status,
        DateOfBirth_Status,
        PlaceOfBirth_Status,
        PermanentResidence_Status,
        Address_Status,
        PhoneNumber_Status,
        Url_Facebook_Status,
        Contact_Often_Status,
        Sex_Status,
        First_Name_Decline_Reason,
        Last_Name_Decline_Reason,
        DateOfBirth_Decline_Reason,
        PlaceOfBirth_Decline_Reason,
        PermanentResidence_Decline_Reason,
        Address_Decline_Reason,
        PhoneNumber_Decline_Reason,
        Url_Facebook_Decline_Reason,
        Contact_Often_Decline_Reason,
        Sex_Decline_Reason
      } = req.body
      const customer = await Customer_service.AdminEditCustomer(
        id,
        First_Name_Status,
        Last_Name_Status,
        DateOfBirth_Status,
        PlaceOfBirth_Status,
        PermanentResidence_Status,
        Address_Status,
        PhoneNumber_Status,
        Url_Facebook_Status,
        Contact_Often_Status,
        Sex_Status,
        First_Name_Decline_Reason,
        Last_Name_Decline_Reason,
        DateOfBirth_Decline_Reason,
        PlaceOfBirth_Decline_Reason,
        PermanentResidence_Decline_Reason,
        Address_Decline_Reason,
        PhoneNumber_Decline_Reason,
        Url_Facebook_Decline_Reason,
        Contact_Often_Decline_Reason,
        Sex_Decline_Reason
      )
      await notificationService.sendNotifyRecord(id)
      if (customer) {
        return ApiResponse(
          res,
          true,
          CONSTANTS.HTTP_CODE.SUCCESS,
          CONSTANTS.SUCCESS,
          customer
        );
      } else {
        return ApiResponse(
          res,
          false,
          CONSTANTS.HTTP_CODE.ERROR,
          CONSTANTS.ERROR
        );
      }
    } catch (error) {
      return ApiResponse(
        res,
        false,
        CONSTANTS.HTTP_CODE.ERROR,
        error.message
      )
    }
  },

  deleteCustomer: async (req, res) => {
    const id = req.ID
    const customer = await Customer_service.deleteCustomer(id)
    if (customer) {
      return ApiResponse(
        res,
        true,
        CONSTANTS.HTTP_CODE.SUCCESS,
        CONSTANTS.SUCCESS,
        customer
      );
    } else {
      return ApiResponse(
        res,
        false,
        CONSTANTS.HTTP_CODE.ERROR,
        CONSTANTS.ERROR
      );
    }
  },

  uploadVideo: async (req, res) => {
    try {
      const id = req.ID
      let urlVideo;
      //console.log(req.file.filename)

      if(req.file === undefined){
        return ThrowError(CONSTANTS.HTTP_CODE.ERROR, "Video không hợp lệ");
      } else{
        urlVideo = req.file.filename;
      }
      console.log(urlVideo);
      const video = await Customer_service.uploadUrlVideo(id, urlVideo)

      if (video) {
        return ApiResponse(
          res,
          true,
          CONSTANTS.HTTP_CODE.SUCCESS,
          CONSTANTS.SUCCESS,
          video
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


  ViewVideo: async (req, res) => {

    const id = req.params.id
    const urlVideo = await Customer_service.ViewVideo(id)
    if (urlVideo) {
      return ApiResponse(
        res,
        true,
        CONSTANTS.HTTP_CODE.SUCCESS,
        CONSTANTS.SUCCESS,
        urlVideo
      );
    } else {
      return ApiResponse(
        res,
        false,
        CONSTANTS.HTTP_CODE.ERROR,
        CONSTANTS.ERROR
      );
    }
  },

  AdminConfirmVideo: async (req, res) => {

    const { id, url_video_status, url_Video_Reason } = req.body;
    console.log(url_video_status);
    console.log(url_Video_Reason);
    const urlVideo = await Customer_service.AdminConfirmVideo(id, url_video_status, url_Video_Reason)
    await notificationService.sendNotifyRecord(id)
    if (urlVideo) {
      return ApiResponse(
        res,
        true,
        CONSTANTS.HTTP_CODE.SUCCESS,
        CONSTANTS.SUCCESS,
        urlVideo
      );
    } else {
      return ApiResponse(
        res,
        false,
        CONSTANTS.HTTP_CODE.ERROR,
        CONSTANTS.ERROR
      );
    }
  },

  findCustomer: async (req, res) => {
    try {
      const { id } = req.params;
      const customer = await Customer_service.getCustomerByID(id)
      const account = await Account.GetAccountByID(id)
      const document = await Document.getDocument(id)
      const relation = await Relationship.getRelativeRelation(id)
      const bank = await Bank.findBankById(id)
      const loan_limit = await Loan_limit.findLoanLimitById(id)
      const result = { customer, account, bank, loan_limit, document, relation }
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

}