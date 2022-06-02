const {ApiResponse} = require('../utils/helper/response');
const {CONSTANTS} = require('../constants/constants');
const accountService = require('../services/account.service')

const GetAccountByID = async (req, res) => {
  try{
    const id  = req.ID;
    const account = await accountService.GetAccountByID(id)
    return ApiResponse(
      res,
      true,
      CONSTANTS.HTTP_CODE.SUCCESS,
      CONSTANTS.SUCCESS,
      account
    );
  } catch(error){
    return ApiResponse(
      res,
      false,
      error.code,
      error.message
    )
  }
};

module.exports = {
  GetAccountByID
}