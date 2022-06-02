const db = require('../models/init-models');
const User = db.users;

const findByUserName = async (username) => {
  const user = await User.findAll({
    where: {
      UserName: username,
    },
  });
  return user
};

const findOne = async (username) => {
  const user = await User.findOne({
    where: {
      UserName: username,
    },
  });
  return user
};
const Create = async (id, entity) => {
  const { UserName, Password } = entity
  const user = await User.create({ ID: id, UserName, Password })
  return user
}
const changePassword = async (username, password) => {
  try {
    const userPassword = await User.update({ Password: password }, {
      where: {
        UserName: username
      }
    })
    return userPassword
  } catch (err) {
    throw err
  }
}
const findUserById = async (id) => {
  const user = await User.findOne({
    where: {
      ID: id
    }
  })
  return user
}
module.exports = {
  findByUserName,
  Create,
  findOne,
  changePassword,
  findUserById
}
