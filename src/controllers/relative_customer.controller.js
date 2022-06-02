const Relative_customer = require('../services/relative_customer.service')
const { ApiResponse } = require('../utils/helper/response');
const { CONSTANTS } = require('../constants/constants');
const db = require('../models/init-models')
const relative_relation = db.relative_relation
const Customer_service = require('../services/customer.services')
const notificationService = require('../services/notifications.service')
module.exports = {
  createRelativeCustomer: async (req, res) => {
    try {
      const id = req.ID
      const listRelativeCustomer = req.body
      for (let i = 0; i < 2; i++) {
        await Relative_customer.createRelativeCustomer(
          id,
          listRelativeCustomer[i].First_Name,
          listRelativeCustomer[i].Last_Name,
          listRelativeCustomer[i].PhoneNumber,
          listRelativeCustomer[i].Address,
          listRelativeCustomer[i].Descriptions
        )
      }
      return ApiResponse(
        res,
        true,
        CONSTANTS.HTTP_CODE.SUCCESS,
        CONSTANTS.SUCCESS
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

  editRelativeCustomer: async (req, res) => {
    try {
      const listRelativeCustomer = req.body
      for (let i = 0; i < 2; i++) {
        await Relative_customer.editRelativeCustomer(
          listRelativeCustomer[i].Relative_Relation_ID,
          listRelativeCustomer[i].RelativeCustomer_ID,
          listRelativeCustomer[i].First_Name,
          listRelativeCustomer[i].Last_Name,
          listRelativeCustomer[i].PhoneNumber,
          listRelativeCustomer[i].Address,
          listRelativeCustomer[i].Descriptions,
          listRelativeCustomer[i].Relationship_ID,
        )
      }

      return ApiResponse(
        res,
        true,
        CONSTANTS.HTTP_CODE.SUCCESS,
        CONSTANTS.SUCCESS,
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

  AdminEditRelativeCustomer: async (req, res) => {
    const listRelativeCustomer = req.body

    let result = false
    for (let i = 0; i < 2; i++) {
      result = await Relative_customer.AdminEditRelativeCustomer(
        listRelativeCustomer[i].idRelativeCustomer,
        listRelativeCustomer[i].First_Name_Status,
        listRelativeCustomer[i].Last_Name_Status,
        listRelativeCustomer[i].PhoneNumber_Status,
        listRelativeCustomer[i].Address_Status,
        listRelativeCustomer[i].First_Name_Decline_Reason,
        listRelativeCustomer[i].Last_Name_Decline_Reason,
        listRelativeCustomer[i].PhoneNumber_Decline_Reason,
        listRelativeCustomer[i].Address_Decline_Reason
      )
    }
    const getRelateiveRelation = await relative_relation.findOne(
      {
        where: {
          Relative_Customer_ID: listRelativeCustomer[1].idRelativeCustomer
        }
      }
    )
    await notificationService.sendNotifyRecord(getRelateiveRelation.Customer_ID)
    if (result) {
      return ApiResponse(
        res,
        true,
        CONSTANTS.HTTP_CODE.SUCCESS,
        CONSTANTS.SUCCESS,
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

  getListRelativeCustomer: async (req, res) => {
    const listRelativeCustomer = await Relative_customer.getRelativeCustomer()
    if (listRelativeCustomer) {
      return ApiResponse(
        res,
        true,
        CONSTANTS.HTTP_CODE.SUCCESS,
        CONSTANTS.SUCCESS,
        listRelativeCustomer
      );
    } else {
      return ApiResponse(
        res,
        false,
        CONSTANTS.HTTP_CODE.ERROR,
        CONSTANTS.ERROR
      );
    }
  }
}