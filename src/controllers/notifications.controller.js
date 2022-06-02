const { ApiResponse } = require('../utils/helper/response');
const { CONSTANTS } = require('../constants/constants');

const notificationService = require('../services/notifications.service');
const notifications = require('../constants/notifications');
const notification = require('../models/notification');
 
const DebReminder = async (req, res) => {
  try {
    const {arrayMainID} = req.body;
    
    const debReminder = await notificationService.getDetailTypeNotification(1)  
    let contentDebReminder = debReminder.Content
  
    const notification = await notificationService.DebReminder(arrayMainID,contentDebReminder)
    if(notification){
      return ApiResponse(
        res,
        true,
        CONSTANTS.HTTP_CODE.SUCCESS,
        CONSTANTS.SUCCESS,
        notification
      
      );
    }
   
  } catch (error) {
    return ApiResponse(
      res,
      false,
      error.code,
      error.message
    )
  }
};

const NewInvestment = async (req, res) => {
  try {
    const {arrayUserID} = req.body;
    const newInvestment = await notificationService.getDetailTypeNotification(2)  
    let content = newInvestment.Content
    const notification = await notificationService.NewInvestment(arrayUserID, content)

    return ApiResponse(
      res,
      true,
      CONSTANTS.HTTP_CODE.SUCCESS,
      CONSTANTS.SUCCESS,
      notification
    
    );
  } catch (error) {
    return ApiResponse(
      res,
      false,
      error.code,
      error.message
    )
  }
};

const ChangeAmount = async (req, res) => {
  try {
    const id = req.params.id;
    const notification = await notificationService.ChangeAmount(id, change_amount)

    return ApiResponse(
      res,
      true,
      CONSTANTS.HTTP_CODE.SUCCESS,
      CONSTANTS.SUCCESS,
      notification
    
    );
  } catch (error) {
    return ApiResponse(
      res,
      false,
      error.code,
      error.message
    )
  }
};

const WithDrawal = async (req, res) => {
  try {
    const id = req.params.id;
    const notification = await notificationService.WithDrawal(id, notifications.WithDrawal)

    return ApiResponse(
      res,
      true,
      CONSTANTS.HTTP_CODE.SUCCESS,
      CONSTANTS.SUCCESS,
      notification
    
    );
  } catch (error) {
    return ApiResponse(
      res,
      false,
      error.code,
      error.message
    )
  }
};

const promotion  = async (req, res) => {
  try {
    const {arrayUserID} = req.body;
    const promotion = await notificationService.getDetailTypeNotification(5)  
    let content = promotion.Content
    const notification = await notificationService.NewInvestment(arrayUserID, content)

    return ApiResponse(
      res,
      true,
      CONSTANTS.HTTP_CODE.SUCCESS,
      CONSTANTS.SUCCESS,
      notification
    
    );
  } catch (error) {
    return ApiResponse(
      res,
      false,
      error.code,
      error.message
    )
  }
};

const settlement  = async (req, res) => {
  try {
    const {arrayMainID} = req.body;
    
    const settlement = await notificationService.getDetailTypeNotification(9)  
    let contentSettlement = settlement.Content
  
    const notification = await notificationService.settlement(arrayMainID,contentSettlement)
    if(notification){
      return ApiResponse(
        res,
        true,
        CONSTANTS.HTTP_CODE.SUCCESS,
        CONSTANTS.SUCCESS,
        notification
      
      );
    }
   
  } catch (error) {
    return ApiResponse(
      res,
      false,
      error.code,
      error.message
    )
  }
};



const createNotifyDiff = async (req, res) => {
  try {
    const {userId, content} = req.body;
    const notification = await notificationService.createNotifyDiff(userId, content)

    return ApiResponse(
      res,
      true,
      CONSTANTS.HTTP_CODE.SUCCESS,
      CONSTANTS.SUCCESS,
      notification
    
    );
  } catch (error) {
    return ApiResponse(
      res,
      false,
      error.code,
      error.message
    )
  }
};

const createManyNotifyDiff = async (req, res) => {
  try {
    const {arrayUserId, content} = req.body;
    const notification = await notificationService.createManyNotifyDiff(arrayUserId, content)

    return ApiResponse(
      res,
      true,
      CONSTANTS.HTTP_CODE.SUCCESS,
      CONSTANTS.SUCCESS,
      notification
    
    );
  } catch (error) {
    return ApiResponse(
      res,
      false,
      error.code,
      error.message
    )
  }
};

const SendNotifySMS = async (req, res) => {
  try {

    const {tels, content} = req.body;
    const notification = await notificationService.SendNotifySMS(tels, content);

    return ApiResponse(
      res,
      true,
      CONSTANTS.HTTP_CODE.SUCCESS,
      CONSTANTS.SUCCESS,
      notification
    
    );
  } catch (error) {
    return ApiResponse(
      res,
      false,
      error.code,
      error.message
    )
  }
};

const getNotificationClient = async (req, res) => {
  try {
    const id = req.ID;
    const notification = await notificationService.getNotificationClient(id);

    return ApiResponse(
      res,
      true,
      CONSTANTS.HTTP_CODE.SUCCESS,
      CONSTANTS.SUCCESS,
      notification
    
    );
  } catch (error) {
    return ApiResponse(
      res,
      false,
      error.code,
      error.message
    )
  }
};

const editStatusNotificationClient = async (req, res) => {
  try {
    const {id, status} = req.body;
    const notification = await notificationService.editStatusNotificationClient(id, status);

    return ApiResponse(
      res,
      true,
      CONSTANTS.HTTP_CODE.SUCCESS,
      CONSTANTS.SUCCESS,
      notification
    );
  } catch (error) {
    return ApiResponse(
      res,
      false,
      error.code,
      error.message
    )
  }
};
// type notification
const getTypeNotification = async (req, res) => {
  try {
  
    const notification = await notificationService.getTypeNotification();

    return ApiResponse(
      res,
      true,
      CONSTANTS.HTTP_CODE.SUCCESS,
      CONSTANTS.SUCCESS,
      notification
    
    );
  } catch (error) {
    return ApiResponse(
      res,
      false,
      error.code,
      error.message
    )
  }
};

const getDetailTypeNotification = async (req, res) => {
  try {
    const id = req.params.id;
    const notification = await notificationService.getDetailTypeNotification(id);

    return ApiResponse(
      res,
      true,
      CONSTANTS.HTTP_CODE.SUCCESS,
      CONSTANTS.SUCCESS,
      notification
    );
  } catch (error) {
    return ApiResponse(
      res,
      false,
      error.code,
      error.message
    )
  }
};

const createTypeNotification = async (req, res) => {
  try {
    const {typeName, content,contentSMS, description} = req.body;
    const notification = await notificationService.createTypeNotification(typeName, content,contentSMS, description);

    return ApiResponse(
      res,
      true,
      CONSTANTS.HTTP_CODE.SUCCESS,
      CONSTANTS.SUCCESS,
      notification
    );
  } catch (error) {
    return ApiResponse(
      res,
      false,
      error.code,
      error.message
    )
  }
};

const editTypeNotification = async (req, res) => {
  try {
    const {id, typeName, content, contentSMS} = req.body;
    const notification = await notificationService.editTypeNotification(id, typeName, content, contentSMS);

    return ApiResponse(
      res,
      true,
      CONSTANTS.HTTP_CODE.SUCCESS,
      CONSTANTS.SUCCESS,
      notification
    );
  } catch (error) {
    return ApiResponse(
      res,
      false,
      error.code,
      error.message
    )
  }
};



module.exports = {
  DebReminder,
  NewInvestment,
  ChangeAmount,
  WithDrawal,
  promotion,
  settlement,
  createNotifyDiff,
  createManyNotifyDiff,
  getTypeNotification,
  getDetailTypeNotification,
  createTypeNotification,
  editTypeNotification,
  getNotificationClient,
  SendNotifySMS,
  editStatusNotificationClient
}
