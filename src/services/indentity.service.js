const db = require('../models/init-models');
const Indentity = db.indentity_document
const Indentity_type = db.indentity_document_type
const customer_service = require('./customer.services')
const moment = require('moment')
const { ThrowError } = require('../utils/helper/response');
const { CONSTANTS } = require('../constants/constants');

const createDocumentType = async (Document_Type_Name, Descriptions) => {
  try {
    const document_type = await Indentity_type.create({ Document_Type_Name: Document_Type_Name, Descriptions: Descriptions })
    return document_type
  }
  catch (err) {
    throw err
  }
};
const getListDocumentType = async () => {
  const document_type = await Indentity_type.findAll();
  return document_type
};

const getDocumentType = async (id) => {
  const document_type = await Indentity_type.findOne({
    where: {
      ID: id,
    },
  })
  return document_type
}
const editDocumentType = async (id, Document_Type_Name, Descriptions) => {
  try {
    const document_type = await Indentity_type.update({ Document_Type_Name: Document_Type_Name, Descriptions: Descriptions }, {
      where: {
        ID: id
      }
    })
    return document_type
  } catch (err) {
    throw err
  }
};
const deleteDocumentType = async (id) => {
  const document_type = await Indentity_type.destroy({
    where: {
      ID: id
    }
  })
  if (document_type) return true
  else return false
}

const findDocument = async(id) => {
  try{
    const document = await Indentity.findOne({
      where: {
        ID: id
      }
    })
    if(!document){
      return ThrowError(CONSTANTS.HTTP_CODE.ERROR, "Mã không hợp lệ")
    }
    return document
  } catch(error){
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, error.message)
  }
}

const createDocument = async (id, entity) => {
  try {
    const document = await Indentity.create({
      ID: id,
      IdentityNumber: entity.IdentityNumber,
      DateOfIssue: entity.DateOfIssue,
      DateOfExpiry: entity.DateOfExpiry,
      PlaceOfIssue: entity.PlaceOfIssue,
      FrontalImage: entity.FrontalImage,
      BackImage: entity.BackImage,
      SelfieWithDocument: entity.SelfieWithDocument,
      Descriptions: entity.Descriptions,
      Status: -1,
      IdentityNumber_Status: -1,
      DateOfIssue_Status: -1,
      DateOfExpiry_Status: -1,
      PlaceOfIssue_Status: -1,
      FrontalImage_Status: -1,
      BackImage_Status: -1,
      SelfieWithDocument_Status: -1,
      IdentityNumber_Decline_Reason: entity.IdentityNumber_Decline_Reason,
      DateOfIssue_Decline_Reason: entity.DateOfIssue_Decline_Reason,
      DateOfExpiry_Decline_Reason: entity.DateOfExpiry_Decline_Reason,
      PlaceOfIssue_Decline_Reason: entity.PlaceOfIssue_Decline_Reason,
      FrontalImage_Decline_Reason: entity.FrontalImage_Decline_Reason,
      BackImage_Decline_Reason: entity.BackImage_Decline_Reason,
      SelfieWithDocument_Decline_Reason: entity.SelfieWithDocument_Decline_Reason,
    })
    return document
  } catch (err) {
    throw err
  }
}

const getListDocument = async () => {
  const document = await Indentity.findAll();
  return document
};
const getDocument = async (id) => {
  const document = await Indentity.findOne({
    where: {
      ID: id
    }
  })
  if (!document) {
    return ThrowError(CONSTANTS.HTTP_CODE.NOT_FOUND_ERR, 'CUSTOMER DOES NOT EXIST');
  }
  let list_document = {
    IdentityNumber: document.IdentityNumber,
    DateOfIssue: document.DateOfIssue,
    DateOfExpiry: document.DateOfExpiry,
    PlaceOfIssue: document.PlaceOfIssue,
    FrontalImage: document.FrontalImage,
    BackImage: document.BackImage,
    SelfieWithDocument: document.SelfieWithDocument,
    Descriptions: document.Descriptions,
    Status: document.Status,
    IdentityNumber_Status: document.IdentityNumber_Status,
    DateOfIssue_Status: document.DateOfIssue_Status,
    DateOfExpiry_Status: document.DateOfExpiry_Status,
    PlaceOfIssue_Status: document.PlaceOfIssue_Status,
    FrontalImage_Status: document.FrontalImage_Status,
    BackImage_Status: document.BackImage_Status,
    SelfieWithDocument_Status: document.SelfieWithDocument_Status,
    IdentityNumber_Decline_Reason: document.IdentityNumber_Decline_Reason,
    DateOfIssue_Decline_Reason: document.DateOfIssue_Decline_Reason,
    DateOfExpiry_Decline_Reason: document.DateOfExpiry_Decline_Reason,
    PlaceOfIssue_Decline_Reason: document.PlaceOfIssue_Decline_Reason,
    FrontalImage_Decline_Reason: document.FrontalImage_Decline_Reason,
    BackImage_Decline_Reason: document.BackImage_Decline_Reason,
    SelfieWithDocument_Decline_Reason: document.SelfieWithDocument_Decline_Reason,
  }

  return list_document;
}
const editDocument = async (
  id,
  IdentityNumber,
  PlaceOfIssue,
  DateOfIssue,
  DateOfExpiry,
  FrontalImage,
  BackImage,
  SelfieWithDocument,
  Descriptions,
  FrontalImage_Status,
  BackImage_Status,
  SelfieWithDocument_Status,
) => {
  try {
    const current = moment().format("YYYY-MM-DD HH:mm:ss");
    const document = await Indentity.update({
      IdentityNumber_Status: 0,
      DateOfIssue_Status: 0,
      DateOfExpiry_Status: 0,
      PlaceOfIssue_Status: 0,
      FrontalImage_Status: FrontalImage_Status,
      BackImage_Status: BackImage_Status,
      SelfieWithDocument_Status: SelfieWithDocument_Status,
      Status: 0,
      IdentityNumber: IdentityNumber,
      PlaceOfIssue: PlaceOfIssue,
      DateOfIssue: DateOfIssue,
      DateOfExpiry: DateOfExpiry,
      FrontalImage: FrontalImage,
      BackImage: BackImage,
      SelfieWithDocument: SelfieWithDocument,
      Descriptions: Descriptions,
      Date_Updated: current
    }, {
      where: {
        ID: id
      }
    })
    return document
  } catch (err) {
    throw err
  }
};

const AdminEditDocument = async (
  id,
  IdentityNumber_Status,
  DateOfIssue_Status,
  DateOfExpiry_Status,
  PlaceOfIssue_Status,
  FrontalImage_Status,
  BackImage_Status,
  SelfieWithDocument_Status,
  IdentityNumber_Decline_Reason,
  DateOfIssue_Decline_Reason,
  DateOfExpiry_Decline_Reason,
  PlaceOfIssue_Decline_Reason,
  FrontalImage_Decline_Reason,
  BackImage_Decline_Reason,
  SelfieWithDocument_Decline_Reason
) => {
  try {
    const document = await Indentity.update({
      IdentityNumber_Status: IdentityNumber_Status,
      DateOfIssue_Status: DateOfIssue_Status,
      DateOfExpiry_Status: DateOfExpiry_Status,
      PlaceOfIssue_Status: PlaceOfIssue_Status,
      FrontalImage_Status: FrontalImage_Status,
      BackImage_Status: BackImage_Status,
      SelfieWithDocument_Status: SelfieWithDocument_Status,
      IdentityNumber_Decline_Reason: IdentityNumber_Decline_Reason,
      DateOfIssue_Decline_Reason: DateOfIssue_Decline_Reason,
      DateOfExpiry_Decline_Reason: DateOfExpiry_Decline_Reason,
      PlaceOfIssue_Decline_Reason: PlaceOfIssue_Decline_Reason,
      FrontalImage_Decline_Reason: FrontalImage_Decline_Reason,
      BackImage_Decline_Reason: BackImage_Decline_Reason,
      SelfieWithDocument_Decline_Reason: SelfieWithDocument_Decline_Reason
    }, {
      where: {
        ID: id
      }
    })
    if (
      IdentityNumber_Status == 1 &&
      DateOfIssue_Status == 1 &&
      DateOfExpiry_Status == 1 &&
      PlaceOfIssue_Status == 1 &&
      FrontalImage_Status == 1 &&
      BackImage_Status == 1 &&
      SelfieWithDocument_Status == 1
    ) {
      await Indentity.update({
        Status: 1
      }, {
        where: {
          ID: id
        }
      })
    } else {
      await Indentity.update({
        Status: 2
      },
        {
          where: {
            ID: id
          }
        })
    }
    return document
  } catch (err) {
    throw err
  }
};

const deleteDocument = async (id) => {
  const document = await Indentity.destroy({
    where: {
      ID: id
    }
  })
  if (document) return true
  else return false
}

const getIdentityDocumentByID = async (id) => {
  const document = await Indentity.findOne({
    where: {
      ID: id,
    },
  })
  return document
}

const getStatusDocument = async (id) => {
  const statusDocument = await Indentity.findOne({
    where: {
      ID: id
    }
  })
  return statusDocument.Status
}

const ViewImages = async(id) => {
  try{
    const Images = await Indentity.findOne({
      attributes: ['FrontalImage','FrontalImage_Status', 'FrontalImage_Decline_Reason','BackImage','BackImage_Status','BackImage_Decline_Reason','SelfieWithDocument','SelfieWithDocument_Status','SelfieWithDocument_Decline_Reason'],
      where: {
        ID: id
      }
    })
    return Images; 

  } catch(error){
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, CONSTANTS.ERROR);
  }
}

const AdminConfirmImages = async (id, front_status, back_status, selfy_status, front_reason, back_reason, selfy_reason) => {
  try{
    const Images = await Indentity.update({
      FrontalImage_Status: front_status,
      BackImage_Status: back_status,
      SelfieWithDocument_Status: selfy_status,
      FrontalImage_Decline_Reason: front_reason,
      BackImage_Decline_Reason: back_reason,
      SelfieWithDocument_Decline_Reason: selfy_reason
    }, {
      where: {
        ID: id
      }
    })
    return Images;
  } catch(error){
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, CONSTANTS.ERROR);
  }
}

module.exports = {
  createDocumentType,
  getListDocumentType,
  getDocumentType,
  createDocument,
  editDocumentType,
  deleteDocumentType,
  getListDocument,
  getDocument,
  editDocument,
  deleteDocument,
  getIdentityDocumentByID,
  AdminEditDocument,
  getStatusDocument,
  ViewImages,
  AdminConfirmImages,
  findDocument
}

