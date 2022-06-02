const db = require('../models/init-models');
const Customer = db.customer;
const moment = require('moment');
const { ThrowError } = require('../utils/helper/response');
const { CONSTANTS } = require('../constants/constants');


const getListCustomer = async () => {
  const customers = await Customer.findAll();
  return customers
};
const getCustomerByID = async (id) => {
  try {
    const customers = await Customer.findOne({
      where: {
        ID: id,
      },
    });
    return customers
  } catch (error) {
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, error.message)
  }
};

const getStatusCustomer = async (id) => {
  const statusCustomer = await Customer.findOne({
    where: {
      ID: id
    }
  })
  return statusCustomer.Status
}
const findUrlVideo = async (id) => {
  try {
    const customer = await Customer.findOne({
      where: {
        ID: id
      }
    })
    if (!customer) {
      return ThrowError(CONSTANTS.HTTP_CODE.NOT_FOUND_ERR, "Mã khách hàng không tồn tại");
    }
    return customer.Url_Video;
  } catch (error) {
    return ThrowError(CONSTANTS.HTTP_CODE.NOT_FOUND_ERR, error.message)
  }

}

const findAvatar = async (id) => {
  try {
    const customer = await Customer.findOne({
      where: {
        ID: id
      }
    })
    if (!customer) {
      return ThrowError(CONSTANTS.HTTP_CODE.NOT_FOUND_ERR, "Mã khách hàng không tồn tại");
    }
    return customer.Avatar;
  } catch (error) {
    return ThrowError(CONSTANTS.HTTP_CODE.NOT_FOUND_ERR, error.message)
  }

}

const getVideoStatus = async (id) => {
  const statusCustomer = await Customer.findOne({
    where: {
      ID: id
    }
  })
  return {
    Url_Video_Status: statusCustomer.Url_Video_Status,
    Url_Video_Decline_Reason: statusCustomer.Url_Video_Decline_Reason
  }
}

const createCustomer = async (entity, PhoneNumber) => {
  const customer = await Customer.create(
    {
      First_Name: entity.First_Name,
      Last_Name: entity.Last_Name,
      DateOfBirth: entity.DateOfBirth,
      PlaceOfBirth: entity.PlaceOfBirth,
      PermanentResidence: entity.PermanentResidence,
      Address: entity.Address,
      PhoneNumber: PhoneNumber,
      Descriptions: entity.Descriptions,
      Url_Facebook: entity.Url_Facebook,
      Contact_Often: entity.Contact_Often,
      Sex: entity.Sex,
      Avatar: entity.Avatar,
      Url_Video: entity.Url_Video,
      First_Name_Status: -1,
      Last_Name_Status: -1,
      DateOfBirth_Status: -1,
      PlaceOfBirth_Status: -1,
      PermanentResidence_Status: -1,
      Address_Status: -1,
      PhoneNumber_Status: -1,
      Url_Facebook_Status: -1,
      Contact_Often_Status: -1,
      Sex_Status: -1,
      Url_Video_Status: -1,
      Avatar_Status: -1,
      First_Name_Decline_Reason: entity.First_Name_Decline_Reason,
      Last_Name_Decline_Reason: entity.Last_Name_Decline_Reason,
      DateOfBirth_Decline_Reason: entity.DateOfBirth_Decline_Reason,
      PlaceOfBirth_Decline_Reason: entity.PlaceOfBirth_Decline_Reason,
      PermanentResidence_Decline_Reason: entity.PermanentResidence_Decline_Reason,
      Address_Decline_Reason: entity.Address_Decline_Reason,
      PhoneNumber_Decline_Reason: entity.PhoneNumber_Decline_Reason,
      Url_Facebook_Decline_Reason: entity.Url_Facebook_Decline_Reason,
      Contact_Often_Decline_Reason: entity.Contact_Often_Decline_Reason,
      Sex_Decline_Reason: entity.Sex_Decline_Reason,
      Url_Video_Decline_Reason: entity.Url_Video_Decline_Reason,
      Avatar_Decline_Reason: entity.Avatar_Decline_Reason,
      Status: -1
    });
  return customer
};


const editCustomer = async (
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
  Avatar
) => {
  try {
    const current = moment().format("YYYY-MM-DD HH:mm:ss");

    const findCustomer = await getCustomerByID(id)
    if (!findCustomer) {
      return ThrowError(CONSTANTS.HTTP_CODE.ERROR, "Mã khách hàng không hợp lệ");
    }
    const customer = await Customer.update(
      {
        First_Name_Status: 0,
        Last_Name_Status: 0,
        DateOfBirth_Status: 0,
        PlaceOfBirth_Status: 0,
        PermanentResidence_Status: 0,
        Address_Status: 0,
        PhoneNumber_Status: 0,
        Url_Facebook_Status: 0,
        Contact_Often_Status: 0,
        Sex_Status: 0,
        Avatar_Status: 0,
        First_Name: First_Name,
        Last_Name: Last_Name,
        DateOfBirth: DateOfBirth,
        PlaceOfBirth: PlaceOfBirth,
        PermanentResidence: PermanentResidence,
        Address: Address,
        PhoneNumber: PhoneNumber,
        Descriptions: Descriptions,
        Url_Facebook: Url_Facebook,
        Contact_Often: Contact_Often,
        Sex: Sex,
        Avatar: Avatar,
        Status: 0,
        Date_Updated: current
      }, {
      where: {
        ID: id
      }
    })

    return customer
  } catch (error) {
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, error.message)
  }

};

const AdminEditCustomer = async (
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
  Sex_Decline_Reason,

) => {
  const customer = await Customer.update(
    {
      First_Name_Status: First_Name_Status,
      Last_Name_Status: Last_Name_Status,
      DateOfBirth_Status: DateOfBirth_Status,
      PlaceOfBirth_Status: PlaceOfBirth_Status,
      PermanentResidence_Status: PermanentResidence_Status,
      Address_Status: Address_Status,
      PhoneNumber_Status: PhoneNumber_Status,
      Url_Facebook_Status: Url_Facebook_Status,
      Contact_Often_Status: Contact_Often_Status,
      Sex_Status: Sex_Status,
      First_Name_Decline_Reason: First_Name_Decline_Reason,
      Last_Name_Decline_Reason: Last_Name_Decline_Reason,
      DateOfBirth_Decline_Reason: DateOfBirth_Decline_Reason,
      PlaceOfBirth_Decline_Reason: PlaceOfBirth_Decline_Reason,
      PermanentResidence_Decline_Reason: PermanentResidence_Decline_Reason,
      Address_Decline_Reason: Address_Decline_Reason,
      PhoneNumber_Decline_Reason: PhoneNumber_Decline_Reason,
      Url_Facebook_Decline_Reason: Url_Facebook_Decline_Reason,
      Contact_Often_Decline_Reason: Contact_Often_Decline_Reason,
      Sex_Decline_Reason: Sex_Decline_Reason
    }, {
    returning: true,
    plain: true,
    where: {
      ID: id
    }
  })
  if (
    First_Name_Status == 1 &&
    Last_Name_Status == 1 &&
    DateOfBirth_Status == 1 &&
    PlaceOfBirth_Status == 1 &&
    PermanentResidence_Status == 1 &&
    Address_Status == 1 &&
    PhoneNumber_Status == 1 &&
    Url_Facebook_Status == 1 &&
    Contact_Often_Status == 1 &&
    Sex_Status == 1
  ) {
    await Customer.update({
      Status: 1,
    }, {
      where: {
        ID: id
      }
    })
  }
  else {
    await Customer.update({
      Status: 2,
    }, {
      where: {
        ID: id
      }
    })
  }
  return customer
};

const deleteCustomer = async (id) => {
  const customer = await Customer.destroy({
    where: {
      ID: id
    }
  })
  if (customer) return true
  else return false
}

const uploadUrlVideo = async (id, urlVideo) => {
  try {

    const customer = await getCustomerByID(id);
    if (!customer) {
      return ThrowError(CONSTANTS.HTTP_CODE.ERROR, "MÃ khách hàng không hợp lệ");
    }
    const video = await Customer.update({
      Url_Video: urlVideo,
      Url_Video_Status: 0
    }, {
      where: {
        ID: id
      }
    })
    return video;
  } catch (error) {
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, CONSTANTS.ERROR);
  }

}


const ViewVideo = async (id) => {
  try {
    const video = await Customer.findOne({
      attributes: ['Url_Video', 'Url_Video_Status', 'Url_Video_Decline_Reason'],
      where: {
        ID: id
      }
    })
    return video;
  } catch (error) {
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, CONSTANTS.ERROR);
  }

}

const AdminConfirmVideo = async (id, video_status, video_reason) => {
  try {
    const video = await Customer.update({
      Url_Video_Status: video_status,
      Url_Video_Decline_Reason: video_reason
    }, {
      where: {
        ID: id
      }
    })
    return video;
  } catch (error) {
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, CONSTANTS.ERROR);
  }
}

module.exports = {
  getListCustomer,
  getCustomerByID,
  createCustomer,
  editCustomer,
  deleteCustomer,
  uploadUrlVideo,
  AdminEditCustomer,
  getStatusCustomer,
  getVideoStatus,
  ViewVideo,
  AdminConfirmVideo,
  findUrlVideo,
  findAvatar,
  // sendNotifyRecord
}
