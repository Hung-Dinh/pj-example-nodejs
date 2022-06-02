const db = require('../models/init-models');
const { ThrowError } = require('../utils/helper/response');
const { CONSTANTS } = require('../constants/constants');
const mainLoanContractService = require('./main_loan_contract.service')
const moment = require('moment');
const {sendSMS, sendMulSMS} = require('../utils/api/gsm');
const { Op } = require('sequelize');
const sampleNotify = require("../constants/notifications");
const axios = require('axios').default

const notificationModel = db.notification;
const notificationTypeModel = db.notification_type;
const userModel = db.users;


const DebReminder = async (arrayMainID,content) => {
  try{
    if(Array.isArray(arrayMainID) === false){
      arrayMainID = [arrayMainID]
    }
    const mainLoanOverDue = await mainLoanContractService.GetListOverDueContractForAdminOption(arrayMainID);
    if(mainLoanOverDue.length === 0){
      return ThrowError(CONSTANTS.HTTP_CODE.ERROR, "Mã hợp đồng quá hạn không tồn tại");
    }
    let now = moment();
    console.log(now)
    
    let listNotify = [];
    let current = moment().format("YYYY-MM-DD HH:mm:ss")
    for(const mainContract of mainLoanOverDue) {
      let Payment_Due_Date = mainContract.payment_due_date;
      let diffday = now.diff(Payment_Due_Date,"days");
      let contractNumber = mainContract.contract_number
      let money = mainContract.amount
      let id = mainContract.borrower_id
      let contentNotify = content
     
      contentNotify = await contentNotify.replace("${MHD}", contractNumber)
      contentNotify = await contentNotify.replace("${day}",diffday)
      contentNotify = await contentNotify.replace("${money}",money)
      console.log(contentNotify)
      const notification = await notificationModel.create({
        Notification_Type_ID: 1,
        To_User_ID: id,
        Notification_Date: current ,
        Notification_Status_ID: 1,
        Notification_Content: contentNotify
      })
      listNotify.push(notification)
    }
  
    return listNotify;
  } catch(error){
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, error.message)
  }
};

const NewInvestment = async (arrayUserID, content) => {
  try{
    if(Array.isArray(arrayUserID) === false){
      arrayUserID = [arrayUserID]
    }
    if(arrayUserID.length === 0){
      return ThrowError(CONSTANTS.HTTP_CODE.ERROR, "ID khách hàng không hợp lệ")
    }
    let listNotify = [];
    let curent = moment().format("YYYY-MM-DD HH:mm:ss")
    for( const userID of arrayUserID){
      const notification = await notificationModel.create({
        Notification_Type_ID: 2,
        To_User_ID: userID,
        Notification_Date:  curent,
        Notification_Status_ID: 1,
        Notification_Content: content
      })
      listNotify.push(notification)
    }
    return listNotify;
  } catch(error){
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, error.message)
  }
};

const ChangeAmount = async (id, content) => {
  try{
    const notification = await notificationModel.create({
      Notification_Type_ID: 3,
      To_User_ID: id,
      Notification_Date:  moment().format("YYYY-MM-DD HH:mm:ss"),
      Notification_Status_ID: 1,
      Notification_Content: content
    })
    return notification;
  } catch(error){
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, CONSTANTS.ERROR)
  }
};

const WithDrawal = async (id, content) => {
  try{
    const notification = await notificationModel.create({
      Notification_Type_ID: 4,
      To_User_ID: id,
      Notification_Date:  moment().format("YYYY-MM-DD HH:mm:ss"),
      Notification_Status_ID: 1,
      Notification_Content: content
    })
    return notification;
  } catch(error){
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, CONSTANTS.ERROR)
  }
};

const promotion = async (arrayUserID, content) => {
  try{
    if(Array.isArray(arrayUserID) === false){
      arrayUserID = [arrayUserID]
    }
    if(arrayUserID.length === 0){
      return ThrowError(CONSTANTS.HTTP_CODE.ERROR, "ID khách hàng không hợp lệ")
    }
    let listNotify = [];
    let curent = moment().format("YYYY-MM-DD HH:mm:ss")
    for( const userID of arrayUserID){
      const notification = await notificationModel.create({
        Notification_Type_ID: 5,
        To_User_ID: userID,
        Notification_Date:  curent,
        Notification_Status_ID: 1,
        Notification_Content: content
      })
      listNotify.push(notification)
    }
    return listNotify;
  } catch(error){
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, error.message)
  }
};

const settlement = async (arrayMainID,content) => {
  try{
    if(Array.isArray(arrayMainID) === false){
      arrayMainID = [arrayMainID]
    }
    const mainLoanOverDue = await mainLoanContractService.GetListSettlementContractForAdminOption(arrayMainID);
    console.log(mainLoanOverDue)
    if(mainLoanOverDue.length === 0){
      return ThrowError(CONSTANTS.HTTP_CODE.ERROR, "Mã hợp đồng cần tất toán không tồn tại");
    }
    let now = moment();
    let listNotify = [];
    let current = moment().format("YYYY-MM-DD HH:mm:ss")
    for(const mainContract of mainLoanOverDue) {
      let Payment_Due_Date = mainContract.payment_due_date;
      let diffday = moment(Payment_Due_Date).diff(now,"days");
      let contractNumber = mainContract.contract_number
      let money = mainContract.amount
      let id = mainContract.borrower_id
      let contentNotify = content
     
      contentNotify = await contentNotify.replace("${MHD}", contractNumber)
      contentNotify = await contentNotify.replace("${day}",diffday)
      contentNotify = await contentNotify.replace("${money}",money)
      console.log(contentNotify)
      const notification = await notificationModel.create({
        Notification_Type_ID: 1,
        To_User_ID: id,
        Notification_Date: current ,
        Notification_Status_ID: 1,
        Notification_Content: contentNotify
      })
      listNotify.push(notification)
    }
  
    return listNotify;
  } catch(error){
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, error.message)
  }
};



const createNotifyDiff = async (id, content) => {
  try{
    const user = userModel.findOne({where: {
      ID: id
    }})
    if(!user){
      return ThrowError(CONSTANTS.HTTP_CODE.ERROR, CONSTANTS.ERROR)
    }
    const notification = await notificationModel.create({
      Notification_Type_ID: 7,
      To_User_ID: id,
      Notification_Date:  moment().format("YYYY-MM-DD HH:mm:ss"),
      Notification_Status_ID: 1,
      Notification_Content: content
    })
    return notification;
  } catch(error){
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, CONSTANTS.ERROR)
  }
};

const createManyNotifyDiff = async (arrayUserId, content) => {
  try{
    if(Array.isArray(arrayUserId) === false){
      arrayUserId = [arrayUserId]
    }
    let listNotify = [];
    for(const userId of arrayUserId){
      const user = userModel.findOne({where: {
        ID: userId
      }})
      if(!user){
        return ThrowError(CONSTANTS.HTTP_CODE.ERROR, CONSTANTS.ERROR)
      }
      const notification = await notificationModel.create({
        Notification_Type_ID: 7,
        To_User_ID: userId,
        Notification_Date:  moment().format("YYYY-MM-DD HH:mm:ss"),
        Notification_Status_ID: 1,
        Notification_Content: content
      })
      listNotify.push(notification)
    }
  
    return listNotify;
  } catch(error){
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, error.message)
  }
};

const SendNotifySMS = async (tels, content) => {
  try{
    if(Array.isArray(tels) === false){
      tels = [tels]
    }
    console.log(String(tels));
    sendMulSMS({to: String(tels) , messeage: content})
  } catch(error){
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, error.message)
  }
};

const getNotificationClient = async (id) => {
  try{
    const notification = await notificationModel.findAll({
      include: [
        {model: notificationTypeModel, as: 'Notification_Type'}
      ],
      where: {
        To_User_ID: id,
        Notification_Status_ID: {[Op.in]: [1,2]}
      }
    })
    console.log(notification)
    if(notification === []){
      return ThrowError(CONSTANTS.HTTP_CODE.ERROR, "Hiện tại bạn không có thông báo")
    }
  
    let listNotify = []
    for(const item of notification){
      listNotify.push({
        ID: item.ID,
        Type_ID: item.Notification_Type_ID,
        Type_Name: item.Notification_Type.Notification_Type_Name,
        Notification_Date: item.Notification_Date,
        Status_ID: item.Notification_Status_ID,
        Content: item.Notification_Content
      })
    }
    console.log(listNotify)
    return listNotify;
  } catch(error){
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, error.message)
  }
};

// send notify action

const sendNotifyClient = async (idUser,typeNotifyID,content) => {
  try{
    const user = userModel.findOne({where: {
      ID: idUser
    }})
    if(!user){
      return ThrowError(CONSTANTS.HTTP_CODE.ERROR, CONSTANTS.ERROR)
    }
    const notification = await notificationModel.create({
      Notification_Type_ID: typeNotifyID,
      To_User_ID: idUser,
      Notification_Date:  moment().format("YYYY-MM-DD HH:mm:ss"),
      Notification_Status_ID: 1,
      Notification_Content: content
    })
    return notification;
  } catch(error){
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, CONSTANTS.ERROR)
  }
};

// type-notify
const getTypeNotification = async () => {
  try{
    const notification = await notificationTypeModel.findAll()
    return notification;
  } catch(error){
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, CONSTANTS.ERROR)
  }
};

const getDetailTypeNotification = async (id) => {
  try{
    const notification = await notificationTypeModel.findOne({
      where: {
        ID: id
      }
    })
    if(!notification){
      return ThrowError(CONSTANTS.HTTP_CODE.ERROR, "Mã thông báo không hợp lệ")
    }
    return notification;
  } catch(error){
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, error.message)
  }
};

const createTypeNotification = async (typeName, content,contentSMS, description) => {
  try{
    const notification = await notificationTypeModel.create({
      Notification_Type_Name: typeName,
      Content: content,
      Content_SMS: contentSMS,
      description: description
    })
    return notification;
  } catch(error){
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, CONSTANTS.ERROR)
  }
};

const editTypeNotification = async (id,typeName, content,contentSMS, description) => {
  try{
    const typeNotify = await getDetailTypeNotification(id)

    if(!typeNotify){
      return ThrowError(CONSTANTS.HTTP_CODE.ERROR,"Mã loại thông báo không hợp lệ" )
    }

    const notification = await notificationTypeModel.update({
      Notification_Type_Name: typeName,
      Content: content,
      Content_SMS: contentSMS
    },{
      where: {
        ID: id
      }
    })
    return notification;
  } catch(error){
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, error.message)
  }
};

const editStatusNotificationClient = async (id, status) => {
  try{
    const notify = await notificationModel.findOne({
      where: {
        ID: id
      }
    })

    if(!notify){
      return ThrowError(CONSTANTS.HTTP_CODE.ERROR,"Mã loại thông báo không hợp lệ" )
    }

    const notification = await notificationModel.update({
      Notification_Status_ID: status
    },{
      where: {
        ID: id
      }
    })
    return notification;
  } catch(error){
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, error.message)
  }
};


const sendNotifyRecord = async (idCustomer) => {
  try {
    // const statusCustomer = await getStatusCustomer(idCustomer)
    // const statusBank = await Bank_service.getStatusBank(idCustomer)
    // const statusDocument = await Indentity.getStatusDocument(idCustomer)
    // const statusRelativeCustomer = await Relative_Customer.getStatusRelativeCustomer(idCustomer)
    // const statusVideo = await getVideoStatus(idCustomer)

    const status = await axios.get('https://api.money4u.vn/api/admin/status',{
      data:{
        id: idCustomer
      }
    })
    const valueStatus = status.data.data[0].data
    console.log(status.data.data[0].data)
    const result = [valueStatus.statusCustomer, valueStatus.statusBank, valueStatus.statusDocument, valueStatus.statusRelativeCustomer, valueStatus.statusVideo.Url_Video_Status]
    let countFalse = 0
    let countTrue = 0
    for (let i = 0; i < result.length; i++) {
      if (result[i] == 2) {
        countFalse++
      }
      if (result[i] == 1) {
        countTrue++
      }
    }
    if (countFalse > 0) {
      await sendNotifyClient(idCustomer, 7, sampleNotify.notify_record_faild)
    }
    if (countTrue == 5) {
      await sendNotifyClient(idCustomer, 7, sampleNotify.notify_record_success)
    }
    return true
  } catch (error) {
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, error.message)
  }
}



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
  editStatusNotificationClient,
  sendNotifyClient,
  sendNotifyRecord
}
