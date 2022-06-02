const { ApiResponse } = require('../utils/helper/response');
const { CONSTANTS } = require('../constants/constants');
const Payment_schedule = require('../services/payment_schedule.service');

const createSchedule = async(req,res) => {
  try {
    const id = req.params.id;
    console.log(id)
    const payment_schedule = await Payment_schedule.createSchedule(id)
    return ApiResponse(
      res,
      true,
      CONSTANTS.HTTP_CODE.SUCCESS,
      CONSTANTS.SUCCESS,
      payment_schedule
    );
  } catch (error) {
    return ApiResponse(
      res,
      false,
      CONSTANTS.HTTP_CODE.ERROR,
      error.message
    )
  }
}

const getRepaymentSchedule = async(req,res) => {
  try {
    const payment_schedule = await Payment_schedule.getRepaymentSchedule()
    return ApiResponse(
      res,
      true,
      CONSTANTS.HTTP_CODE.SUCCESS,
      CONSTANTS.SUCCESS,
    );
  } catch (error) {
    return ApiResponse(
      res,
      false,
      CONSTANTS.HTTP_CODE.ERROR,
      error.message
    )
  }
}

const getDebtCollectionSchedule = async(req,res) => {
  try {
    const payment_schedule = await Payment_schedule.getDebtCollectionSchedule()
    return ApiResponse(
      res,
      true,
      CONSTANTS.HTTP_CODE.SUCCESS,
      CONSTANTS.SUCCESS,
      payment_schedule
    );
  } catch (error) {
    return ApiResponse(
      res,
      false,
      CONSTANTS.HTTP_CODE.ERROR,
      error.message
    )
  }
}

const getDetailRepayment = async(req,res) => {
  try {
    const id = req.params.id
    console.log(id)
    const payment_schedule = await Payment_schedule.getDetailRepayment(id)
    return ApiResponse(
      res,
      true,
      CONSTANTS.HTTP_CODE.SUCCESS,
      CONSTANTS.SUCCESS,
      payment_schedule
    );
  } catch (error) {
    return ApiResponse(
      res,
      false,
      CONSTANTS.HTTP_CODE.ERROR,
      error.message
    )
  }
}

const getDetailtDebt = async(req,res) => {
  try {
    const id = req.params.id
    const payment_schedule = await Payment_schedule.getDetailtDebt(id)
    return ApiResponse(
      res,
      true,
      CONSTANTS.HTTP_CODE.SUCCESS,
      CONSTANTS.SUCCESS,
      payment_schedule
    );
  } catch (error) {
    return ApiResponse(
      res,
      false,
      CONSTANTS.HTTP_CODE.ERROR,
      error.message
    )
  }
}

const getRepaymentMainLoan = async(req,res) => {
  try {
    const idMainLoan = req.params.id
    const id = req.ID
    const payment_schedule = await Payment_schedule.getRepaymentMainLoan(id,idMainLoan)
    return ApiResponse(
      res,
      true,
      CONSTANTS.HTTP_CODE.SUCCESS,
      CONSTANTS.SUCCESS,
      payment_schedule
    );
  } catch (error) {
    return ApiResponse(
      res,
      false,
      CONSTANTS.HTTP_CODE.ERROR,
      error.message
    )
  }
}

const getScheduleAccount = async(req,res) => {
  try {
    const id = req.ID
    const payment_schedule = await Payment_schedule.getScheduleAccount(id)
    return ApiResponse(
      res,
      true,
      CONSTANTS.HTTP_CODE.SUCCESS,
      CONSTANTS.SUCCESS,
      payment_schedule
    );
  } catch (error) {
    return ApiResponse(
      res,
      false,
      CONSTANTS.HTTP_CODE.ERROR,
      error.message
    )
  }
}
module.exports = {
  createSchedule,
  getRepaymentSchedule,
  getDebtCollectionSchedule,
  getDetailRepayment,
  getDetailtDebt,
  getRepaymentMainLoan,
  getScheduleAccount
}
