const db = require('../models/init-models')
const { ThrowError } = require('../utils/helper/response');
const { CONSTANTS } = require('../constants/constants');
const Relationship = db.relationship
const createRelationship = async (Relationship_Name, Descriptions) => {
  try {
    const relationship = await Relationship.create({
      Relationship_Name: Relationship_Name,
      Descriptions: Descriptions
    })
    return relationship
  }
  catch (err) {
    throw err
  }
}

const getRelationship = async () => {

  const relationship = await Relationship.findAll()
  if (!relationship) {
    return ThrowError(CONSTANTS.HTTP_CODE.NOT_FOUND_ERR, 'CUSTOMER DOES NOT EXIST');
  }
  let list_relationship = [];

  for (const item of relationship) {
    list_relationship.push({
      Relationship_Name: item.Relationship_Name,
    })
  }
  return list_relationship;
}

const getRelationshipByID = async (id) => {

  const relationship = await Relationship.findOne({
    where:{
      ID:id
    }
  })
  return relationship;
}

const editRelationship = async (id, Relationship_Name, Descriptions) => {
  try {
    const relationship = await Relationship.update({
      Relationship_Name: Relationship_Name,
      Descriptions: Descriptions
    }, {
      where: {
        ID: id
      }
    })
    return relationship
  }
  catch (err) {
    throw err
  }
}

const listRelationship=async()=>{
  const relationship=await Relationship.findAll()
  if (!relationship) {
    return ThrowError(CONSTANTS.HTTP_CODE.NOT_FOUND_ERR, 'CUSTOMER DOES NOT EXIST');
  }
  let list_relationship = [];

  for (const item of relationship) {
    list_relationship.push({
      ID:item.ID,
      Relationship_Name: item.Relationship_Name,
    })
  }
  return list_relationship;
}

module.exports = {
  createRelationship,
  getRelationship,
  editRelationship,
  listRelationship,
  getRelationshipByID
}
