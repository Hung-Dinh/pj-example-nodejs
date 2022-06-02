const {ApiResponse} = require('../utils/helper/response');
const {CONSTANTS} = require('../constants/constants');
const accountBlockService = require('../services/account_block.service');

const CreateReqGetMoney = async (req, res) => {
  try{

    const id = req.ID;
    const {amountBlock, content} = req.body;
    console.log(id);
    console.log(amountBlock);
    const accountBlock = await accountBlockService.CreateReqGetMoney(id, amountBlock, content);
    return ApiResponse(
      res,
      true,
      CONSTANTS.HTTP_CODE.SUCCESS,
      CONSTANTS.SUCCESS,
      accountBlock
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

const GetReqWithDrawalAccount = async (req, res) => {
 
  try{
    console.log(1);
    const ReqWithDrawal = await accountBlockService.GetReqWithDrawalAccount();
    return ApiResponse(
      res,
      true,
      CONSTANTS.HTTP_CODE.SUCCESS,
      CONSTANTS.SUCCESS,
      ReqWithDrawal
    );
  } catch(error){
    return ApiResponse(
      res,
      false,
      error.code,
      error.message
    )
  }
}

const GetReqWithDrawal = async (req, res) => {
 
  try{
    const ReqWithDrawal = await accountBlockService.GetReqWithDrawal();
    return ApiResponse(
      res,
      true,
      CONSTANTS.HTTP_CODE.SUCCESS,
      CONSTANTS.SUCCESS,
      ReqWithDrawal
    );
  } catch(error){
    return ApiResponse(
      res,
      false,
      error.code,
      error.message
    )
  }
}

const GetReqWithDrawalDetail = async (req, res) => {
 
  try{
    const id = req.params.id;
    const ReqWithDrawal = await accountBlockService.GetReqWithDrawalDetail(id);
    return ApiResponse(
      res,
      true,
      CONSTANTS.HTTP_CODE.SUCCESS,
      CONSTANTS.SUCCESS,
      ReqWithDrawal
    );
  } catch(error){
    return ApiResponse(
      res,
      false,
      error.code,
      error.message
    )
  }
}


const AdminConfirmReqWithDrawal = async (req, res) => {
 
  try{
    const {id} = req.body;
    const ReqWithDrawal = await accountBlockService.AdminConfirmReqWithDrawal(id);
    return ApiResponse(
      res,
      true,
      CONSTANTS.HTTP_CODE.SUCCESS,
      CONSTANTS.SUCCESS,
      ReqWithDrawal
    );
  } catch(error){
    return ApiResponse(
      res,
      false,
      error.code,
      error.message
    )
  }
}

const GetReqWithDrawalPersonal = async (req, res) => {
 
  try{
    const id = req.ID
    console.log(id);
    const ReqWithDrawal = await accountBlockService.GetReqWithDrawalPerSonal(id);
    return ApiResponse(
      res,
      true,
      CONSTANTS.HTTP_CODE.SUCCESS,
      CONSTANTS.SUCCESS,
      ReqWithDrawal
    );
  } catch(error){
    return ApiResponse(
      res,
      false,
      error.code,
      error.message
    )
  }
}

const WithDrawalPersonal = async (req, res) => {
 
  try{
    const id = req.ID
    console.log(id);
    const ReqWithDrawal = await accountBlockService.WithDrawalPerSonal(id);
    return ApiResponse(
      res,
      true,
      CONSTANTS.HTTP_CODE.SUCCESS,
      CONSTANTS.SUCCESS,
      ReqWithDrawal
    );
  } catch(error){
    return ApiResponse(
      res,
      false,
      error.code,
      error.message
    )
  }
}

const EmployeeConfirmReqWithDrawal = async (req, res) => {
 
  try{
    const {id} = req.body;
    const ReqWithDrawal = await accountBlockService.EmployeeConfirmReqWithDrawal(id);
    return ApiResponse(
      res,
      true,
      CONSTANTS.HTTP_CODE.SUCCESS,
      CONSTANTS.SUCCESS,
      ReqWithDrawal
    );
  } catch(error){
    return ApiResponse(
      res,
      false,
      error.code,
      error.message
    )
  }
}

module.exports = {
  CreateReqGetMoney,
  GetReqWithDrawal,
  GetReqWithDrawalPersonal,
  WithDrawalPersonal,
  AdminConfirmReqWithDrawal,
  GetReqWithDrawalAccount,
  EmployeeConfirmReqWithDrawal,
  GetReqWithDrawalDetail
}