const Relationship = require('../services/relationship.service')
const { ApiResponse } = require('../utils/helper/response');
const { CONSTANTS } = require('../constants/constants');

module.exports = {
  createRelationship: async (req, res) => {
    const { Relationship_Name, Descriptions } = req.body
    const relationship = await Relationship.createRelationship(Relationship_Name, Descriptions)
    if (relationship) {
      return ApiResponse(
        res,
        true,
        CONSTANTS.HTTP_CODE.SUCCESS,
        CONSTANTS.SUCCESS,
        relationship
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
  editRelationship: async (req, res) => {
    const { id, Relationship_Name, Descriptions } = req.body

    const relationship = await Relationship.editRelationship(id, Relationship_Name, Descriptions)
    if (relationship) {
      return ApiResponse(
        res,
        true,
        CONSTANTS.HTTP_CODE.SUCCESS,
        CONSTANTS.SUCCESS,
        relationship
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
  listRelationship:async(req,res)=>{
    const relationship=await Relationship.listRelationship()
    if (relationship) {
      return ApiResponse(
        res,
        true,
        CONSTANTS.HTTP_CODE.SUCCESS,
        CONSTANTS.SUCCESS,
        relationship
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