
const db = require('../models/init-models')
const Relative_relation = db.relative_relation
const RelationshipModel = db.relationship
const Relative_customer = db.relative_customer
const customer_service = require('./customer.services')
const { ThrowError } = require('../utils/helper/response');
const createRelativeRelation = async (id, Relative_Customer_ID, Relationship_ID, Descriptions) => {
  try {
    const relative_relation = await Relative_relation.create({
      Customer_ID: id,
      Relative_Customer_ID: Relative_Customer_ID,
      Relationship_ID: Relationship_ID,
      Descriptions: Descriptions
    })
    return relative_relation
  } catch (err) {
    throw err
  }
}

const getRelativeRelation = async (id) => {
  try {
    const customer = await customer_service.getCustomerByID(id)
    if (!customer) {
      return ThrowError(CONSTANTS.HTTP_CODE.NOT_FOUND_ERR, "ID ACCOUNT DOES NOT EXIST")
    }

    const relative_relation = await Relative_relation.findAll({
      include: [
        {
          model: RelationshipModel, as: 'Relationship',
        },
        {
          model: Relative_customer, as: 'Relative_Customer',
        }
      ],
      where: {
        Customer_ID: id
      }
    })
    if (!relative_relation) {
      return ThrowError(CONSTANTS.HTTP_CODE.NOT_FOUND_ERR, 'CUSTOMER DOES NOT EXIST');
    }
    let list_relationship = []
    for (const item of relative_relation) {
      list_relationship.push({
        relative_relation_id: item.ID,
        Relationship_ID: item.Relationship_ID,
        Relative_Customer_ID: item.Relative_Customer.ID,
        First_Name: item.Relative_Customer.First_Name,
        Last_Name: item.Relative_Customer.Last_Name,
        PhoneNumber: item.Relative_Customer.PhoneNumber,
        Address: item.Relative_Customer.Address,
        Descriptions: item.Descriptions,
        First_Name_Status: item.Relative_Customer.First_Name_Status,
        Last_Name_Status: item.Relative_Customer.Last_Name_Status,
        PhoneNumber_Status: item.Relative_Customer.PhoneNumber_Status,
        Address_Status: item.Relative_Customer.Address_Status,
        First_Name_Decline_Reason: item.Relative_Customer.First_Name_Decline_Reason,
        Last_Name_Decline_Reason: item.Relative_Customer.Last_Name_Decline_Reason,
        PhoneNumber_Decline_Reason: item.Relative_Customer.PhoneNumber_Decline_Reason,
        Address_Decline_Reason: item.Relative_Customer.Address_Decline_Reason,
        Status: item.Relative_Customer.Status,

      }
      )
    }

    return list_relationship;
  }
  catch (error) {
    return ThrowError(error.code, error.message);
  }
}

const editRelativeRelation = async (id, Relative_Customer_ID, Relationship_ID, Descriptions) => {
  try {
    const relative_relation = await Relative_relation.update({
      Relative_Customer_ID: Relative_Customer_ID,
      Relationship_ID: Relationship_ID,
      Descriptions: Descriptions
    },
      {
        where: {
          Customer_ID: id
        }
      }
    )
    return relative_relation
  } catch (err) {
    throw err
  }
}

const getRelativeRelationByIdCustomer = async (id) => {
  try {
    const customer = await customer_service.getCustomerByID(id)
    if (!customer) {
      return ThrowError(CONSTANTS.HTTP_CODE.NOT_FOUND_ERR, "ID ACCOUNT DOES NOT EXIST")
    }

    const relative_relation = await Relative_relation.findAll({
      include: [
        {
          model: RelationshipModel, as: 'Relationship',
        },
        {
          model: Relative_customer, as: 'Relative_Customer',
        }
      ],
      where: {
        Customer_ID: id
      }
    })
    if (!relative_relation) {
      return ThrowError(CONSTANTS.HTTP_CODE.NOT_FOUND_ERR, 'CUSTOMER DOES NOT EXIST');
    }
    let list_relation = []
    for (const item of relative_relation) {
      list_relation.push({
        relative_relation_id: item.ID,
        Relationship_Name: item.Relationship.Relationship_Name,
        First_Name: item.Relative_Customer.First_Name,
        Last_Name: item.Relative_Customer.Last_Name,
        PhoneNumber: item.Relative_Customer.PhoneNumber,
        Address: item.Relative_Customer.Address,
        Descriptions: item.Relative_Customer.Descriptions,
        First_Name_Status: item.Relative_Customer.First_Name_Status,
        Last_Name_Status: item.Relative_Customer.Last_Name_Status,
        PhoneNumber_Status: item.Relative_Customer.PhoneNumber_Status,
        Address_Status: item.Relative_Customer.Address_Status,
        Status: item.Relative_Customer.Status,
        First_Name_Decline_Reason: item.Relative_Customer.First_Name_Decline_Reason,
        Last_Name_Decline_Reason: item.Relative_Customer.Last_Name_Decline_Reason,
        PhoneNumber_Decline_Reason: item.Relative_Customer.PhoneNumber_Decline_Reason,
        Address_Decline_Reason: item.Relative_Customer.Address_Decline_Reason
      })
    }
    return list_relation
  }
  catch (error) {
    return ThrowError(error.code, error.message);
  }
}

module.exports = {
  createRelativeRelation,
  getRelativeRelation,
  editRelativeRelation,
  getRelativeRelationByIdCustomer
}
