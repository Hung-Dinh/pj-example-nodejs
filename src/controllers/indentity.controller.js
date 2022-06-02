const Indentity_Document = require('../services/indentity.service')
const { ApiResponse, ThrowError } = require('../utils/helper/response');
const { CONSTANTS } = require('../constants/constants');
const Customer_service = require('../services/customer.services')
const notificationService = require('../services/notifications.service')

module.exports = {
  createDocumentType: async (req, res) => {
    try {
      const { Document_Type_Name, Descriptions } = req.body
      const document_type = await Indentity_Document.createDocumentType(Document_Type_Name, Descriptions)
      if (document_type) {
        return ApiResponse(
          res,
          true,
          CONSTANTS.HTTP_CODE.SUCCESS,
          CONSTANTS.SUCCESS,
          document_type
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
      );
    }

  },

  findAllDocumentType: async (req, res) => {
    try {
      const document_type = await Indentity_Document.getListDocumentType()
      return ApiResponse(
        res,
        true,
        CONSTANTS.HTTP_CODE.SUCCESS,
        CONSTANTS.SUCCESS,
        document_type
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
  findOneDocumentType: async (req, res) => {
    try {
      const { id } = req.body
      const document_type = await Indentity_Document.getDocumentType(id)
      return ApiResponse(
        res,
        true,
        CONSTANTS.HTTP_CODE.SUCCESS,
        CONSTANTS.SUCCESS,
        document_type
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

  editDocumentType: async (req, res) => {
    try {
      const { id } = req.body
      const { Document_Type_Name, Descriptions } = req.body
      const document_type = await Indentity_Document.editDocumentType(id, Document_Type_Name, Descriptions)
      if (document_type) {
        return ApiResponse(
          res,
          true,
          CONSTANTS.HTTP_CODE.SUCCESS,
          CONSTANTS.SUCCESS,
          document_type
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
      );
    }
  },

  deleteDocumentType: async (req, res) => {
    const { id } = req.body
    const document_type = await Indentity_Document.deleteDocumentType(id)
    if (document_type) {
      return ApiResponse(
        res,
        true,
        CONSTANTS.HTTP_CODE.SUCCESS,
        CONSTANTS.SUCCESS,
        document_type
      );
    } else {
      return ApiResponse(
        res,
        false,
        CONSTANTS.HTTP_CODE.ERROR,
        CONSTANTS.ERROR
      );;
    }
  },

  createDocument: async (req, res) => {
    try {
      const id = req.ID
      const {
        IdentityNumber,
        DateOfIssue,
        DateOfExpiry,
        PlaceOfIssue,
        FrontalImage,
        BackImage,
        SelfieWithDocument,
        Descriptions } = req.body
      const document = await Indentity_Document.createDocument(
        id,
        IdentityNumber,
        DateOfIssue,
        DateOfExpiry,
        PlaceOfIssue,
        FrontalImage,
        BackImage,
        SelfieWithDocument,
        Descriptions
      )
      if (document) {
        return ApiResponse(
          res,
          true,
          CONSTANTS.HTTP_CODE.SUCCESS,
          CONSTANTS.SUCCESS,
          document
        );
      } else {
        return ApiResponse(
          res,
          false,
          CONSTANTS.HTTP_CODE.ERROR,
          CONSTANTS.ERROR
        );;
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

  findAllDocument: async (req, res) => {
    try {
      const document = await Indentity_Document.getListDocument()
      return ApiResponse(
        res,
        true,
        CONSTANTS.HTTP_CODE.SUCCESS,
        CONSTANTS.SUCCESS,
        document
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

  findOneDocument: async (req, res) => {
    try {
      const id = req.ID
      const document = await Indentity_Document.getDocument(id)
      return ApiResponse(
        res,
        true,
        CONSTANTS.HTTP_CODE.SUCCESS,
        CONSTANTS.SUCCESS,
        document
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

  editDocument: async (req, res) => {
    try { 
      const id = req.ID
      let FrontalImage_Status = 0, BackImage_Status = 0, SelfieWithDocument_Status = 0;
      let FrontalImage, BackImage, SelfieWithDocument;
      if(req.files.FrontalImage === undefined){
        FrontalImage = Indentity_Document.findDocument(id).FrontalImage;
        FrontalImage_Status = Indentity_Document.findDocument(id).FrontalImage_Status
      }
      else{  
        FrontalImage = req.files.FrontalImage[0].filename;  
      }

      if(req.files.BackImage === undefined){
        BackImage = Indentity_Document.findDocument(id).BackImage;
        BackImage_Status = Indentity_Document.findDocument(id).BackImage_Status
      }
      else{ 
        BackImage = req.files.BackImage[0].filename;   
      }

      if(req.files.SelfieWithDocument === undefined){
        SelfieWithDocument = Indentity_Document.findDocument(id).SelfieWithDocument;
        SelfieWithDocument_Status = Indentity_Document.findDocument(id).SelfieWithDocument_Status
      }
      else{     
        SelfieWithDocument = req.files.SelfieWithDocument[0].filename 
      }
     
      const { IdentityNumber, PlaceOfIssue, DateOfIssue, DateOfExpiry, Descriptions } = req.body
      
      const document = await Indentity_Document.editDocument(
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
        SelfieWithDocument_Status
        )
    
      return ApiResponse(
        res,
        true,
        CONSTANTS.HTTP_CODE.SUCCESS,
        CONSTANTS.SUCCESS,
        document
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

  AdminEditDocument: async (req, res) => {
    try {
      const {   id,
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
        SelfieWithDocument_Decline_Reason } = req.body
      const document = await Indentity_Document.AdminEditDocument(  
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
        )
      
        await notificationService.sendNotifyRecord(id)
      if (document) {
        return ApiResponse(
          res,
          true,
          CONSTANTS.HTTP_CODE.SUCCESS,
          CONSTANTS.SUCCESS,
          document
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
      );
    }
  },

  deleteDocument: async (req, res) => {
    const { id } = req.body
    const document = await Indentity_Document.deleteDocument(id)
    if (document) {
      return ApiResponse(
        res,
        true,
        CONSTANTS.HTTP_CODE.SUCCESS,
        CONSTANTS.SUCCESS,
        document
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

  ViewImages: async (req, res) => {
    const id = req.params.id
    const images = await Indentity_Document.ViewImages(id)
    if (images) {
      return ApiResponse(
        res,
        true,
        CONSTANTS.HTTP_CODE.SUCCESS,
        CONSTANTS.SUCCESS,
        images
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

  AdminConfirmImages: async (req, res) => {
    
    const {id ,front_status, back_status, selfy_status, front_reason, back_reason, selfy_reason} = req.body;
    console.log(front_status)
    const images = await Indentity_Document.AdminConfirmImages(id, front_status, back_status, selfy_status, front_reason, back_reason, selfy_reason)
    await notificationService.sendNotifyRecord(id)
    if (images) {
      return ApiResponse(
        res,
        true,
        CONSTANTS.HTTP_CODE.SUCCESS,
        CONSTANTS.SUCCESS,
        images
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