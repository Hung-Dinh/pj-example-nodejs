const db = require('../models/init-models')
const Relative_customer = db.relative_customer
const RelativeRelationModel = db.relative_relation
const { ThrowError } = require('../utils/helper/response');
const { CONSTANTS } = require('../constants/constants');
const RelationshipModel = db.relationship
const RelationshipService = require('./relationship.service')
const moment = require('moment');
const createRelativeCustomer = async (id, entity) => {
  try {
    for (let i = 0; i < 2; i++) {
      const relativeCustomer = await Relative_customer.create({
        First_Name: entity.First_Name,
        Last_Name: entity.Last_Name,
        PhoneNumber: entity.PhoneNumber,
        Address: entity.Address,
        Descriptions: entity.Descriptions,
        First_Name_Status: -1,
        Last_Name_Status: -1,
        PhoneNumber_Status: -1,
        Address_Status: -1,
        Status: -1,
        First_Name_Decline_Reason: entity.First_Name_Decline_Reason,
        Last_Name_Decline_Reason: entity.Last_Name_Decline_Reason,
        PhoneNumber_Decline_Reason: entity.PhoneNumber_Decline_Reason,
        Address_Decline_Reason: entity.Address_Decline_Reason
      })
      await RelativeRelationModel.create({
        Customer_ID: id,
        Relationship_ID: 1,
        Relative_Customer_ID: relativeCustomer.ID,
      })
    }
    return true
  }
  catch (err) {
    throw err
  }
}
const getRelativeCustomer = async () => {
  const relative_customer = await Relative_customer.findAll({
    include: [
      {
        model: RelativeRelationModel, as: 'relative_relations',
        include: [
          { model: RelationshipModel, as: 'Relationship' }
        ]
      }
    ]
  })
  if (!relative_customer) {
    return ThrowError(CONSTANTS.HTTP_CODE.NOT_FOUND_ERR, 'CUSTOMER DOES NOT EXIST');
  }
  let list_relativeCustomer = []
  for (const item of relative_customer) {
    let Relationship_ID = await RelationshipService.getRelationshipByID(item.ID)
    list_relativeCustomer.push({
      ID: item.ID,
      First_Name: item.First_Name,
      Last_Name: item.Last_Name,
      PhoneNumber: item.PhoneNumber,
      Address: item.Address,
      Relationship: Relationship_ID,
      Descriptions: item.Descriptions,
      First_Name_Status: item.First_Name_Status,
      Last_Name_Status: item.Last_Name_Status,
      PhoneNumber_Status: item.PhoneNumber_Status,
      Address_Status: item.Address_Status,
      Status: item.Status,
      First_Name_Decline_Reason: item.First_Name_Decline_Reason,
      Last_Name_Decline_Reason: item.Last_Name_Decline_Reason,
      PhoneNumber_Decline_Reason: item.PhoneNumber_Decline_Reason,
      Address_Decline_Reason: item.Address_Decline_Reason
    })
  }
  return list_relativeCustomer;
}

const editRelativeCustomer = async (
  IDRelativeRelation,
  idRelativeCustomer,
  First_Name,
  Last_Name,
  PhoneNumber,
  Address,
  Descriptions,
  Relationship_ID
) => {
  try {
    const current = moment().format("YYYY-MM-DD HH:mm:ss");
    await Relative_customer.update({
      First_Name: First_Name,
      Last_Name: Last_Name,
      PhoneNumber: PhoneNumber,
      Address: Address,
      Descriptions: Descriptions,
      First_Name_Status: 0,
      Last_Name_Status: 0,
      PhoneNumber_Status: 0,
      Address_Status: 0,
      Status: 0,
      Date_Updated: current
    }, {
      where: {
        ID: idRelativeCustomer
      }
    })

    await RelativeRelationModel.update({
      Relationship_ID: Relationship_ID,
      Descriptions: Descriptions
    },
      {
        where: {
          ID: IDRelativeRelation,
        }
      })

    return true
  }
  catch (error) {
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, error.message);
  }
}


const AdminEditRelativeCustomer = async (
  id,
  First_Name_Status,
  Last_Name_Status,
  PhoneNumber_Status,
  Address_Status,
  First_Name_Decline_Reason,
  Last_Name_Decline_Reason,
  PhoneNumber_Decline_Reason,
  Address_Decline_Reason
) => {
  try {
    const relative_customer = await Relative_customer.update({
      First_Name_Status: First_Name_Status,
      Last_Name_Status: Last_Name_Status,
      PhoneNumber_Status: PhoneNumber_Status,
      Address_Status: Address_Status,
      First_Name_Decline_Reason: First_Name_Decline_Reason,
      Last_Name_Decline_Reason: Last_Name_Decline_Reason,
      PhoneNumber_Decline_Reason: PhoneNumber_Decline_Reason,
      Address_Decline_Reason: Address_Decline_Reason,

    }, {
      where: {
        ID: id
      }
    })
    if (
      First_Name_Status == 1 &&
      Last_Name_Status == 1 &&
      PhoneNumber_Status == 1 &&
      Address_Status == 1
    ) {
      await Relative_customer.update({
        Status: 1
      }, {
        where: {
          ID: id
        }
      })
    }
    else {
      await Relative_customer.update({
        Status: 2
      }, {
        where: {
          ID: id
        }
      })
    }
    return relative_customer
  }
  catch (err) {
    throw err
  }
}

const getStatusRelativeCustomer = async (id) => {
  const RelativeCustomer = await RelativeRelationModel.findAll({
    include: [{
      model: Relative_customer, as: 'Relative_Customer',
    }],
    where: { Customer_ID: id }
  })
  if (RelativeCustomer[0].Relative_Customer.Status == 1 && RelativeCustomer[1].Relative_Customer.Status == 1) {
    return 1
  }
  else if (RelativeCustomer[0].Relative_Customer.Status == -1 && RelativeCustomer[1].Relative_Customer.Status == -1) {
    return -1
  }
  else if (RelativeCustomer[0].Relative_Customer.Status == 2 || RelativeCustomer[1].Relative_Customer.Status == 2){
    return 2
  }
  else {
    return 0
  }
}

module.exports = {
  createRelativeCustomer,
  getRelativeCustomer,
  editRelativeCustomer,
  AdminEditRelativeCustomer,
  getStatusRelativeCustomer
}
