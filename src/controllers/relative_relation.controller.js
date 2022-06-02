const Relative_relation = require('../services/relative_relation.service')
const { ApiResponse } = require('../utils/helper/response');
const { CONSTANTS } = require('../constants/constants');
module.exports = {
  createRelativeRelation: async (req, res) => {
    const Customer_ID = req.ID
    const { Relative_Customer_ID, Relationship_ID, Descriptions } = req.body
    const relative_relation = await Relative_relation.createRelativeRelation(Customer_ID, Relative_Customer_ID, Relationship_ID, Descriptions)
    if (relative_relation) {
      return ApiResponse(
        res,
        true,
        CONSTANTS.HTTP_CODE.SUCCESS,
        CONSTANTS.SUCCESS,
        relative_relation
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
  findRelativeRelation: async (req, res) => {
    try {
      const id = req.ID
      const relation = await Relative_relation.getRelativeRelation(id)
      return ApiResponse(
        res,
        true,
        CONSTANTS.HTTP_CODE.SUCCESS,
        CONSTANTS.SUCCESS,
        relation
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
  editRelativeRelation: async (req, res) => {
    try {
      const id = req.ID
      const { Relative_Customer_ID, Relationship_ID, Descriptions } = req.body
      const relative_relation = await Relative_relation.editRelativeRelation(id, Relative_Customer_ID, Relationship_ID, Descriptions)
      if (relative_relation) {
        return ApiResponse(
          res,
          true,
          CONSTANTS.HTTP_CODE.SUCCESS,
          CONSTANTS.SUCCESS,
          relative_relation
        );
      } else {
        return ApiResponse(
          res,
          false,
          CONSTANTS.HTTP_CODE.ERROR,
          CONSTANTS.ERROR
        );
      }
    } catch (err) {
      throw err
    }
  },

  findRelativeRelationByIdCustomer: async (req, res) => {
    try {
      const { id } = req.params
      const relation = await Relative_relation.getRelativeRelationByIdCustomer(id)
      return ApiResponse(
        res,
        true,
        CONSTANTS.HTTP_CODE.SUCCESS,
        CONSTANTS.SUCCESS,
        relation
      );
    } catch (error) {
      return ApiResponse(
        res,
        false,
        CONSTANTS.HTTP_CODE.ERROR,
        error.message
      );
    }
  }
}