const { ApiResponse } = require('../utils/helper/response');
const { CONSTANTS } = require('../constants/constants');
const loanContractService = require('../services/loan_contract.service')
const mainLoanContract = require('../services/main_loan_contract.service')
const Invesment_contract = require('../services/request_investment.service')

const listLoanProfile = async (req, res) => {
    try {
      console.log(12);
        const id = req.ID
        console.log(id);
        const loan_contract_1 = await mainLoanContract.GetContractByStatus(1,id)
        console.log(3);
        const loan_contract_2 = await mainLoanContract.GetContractByStatus(2,id)
        const loan_contract_3 = await mainLoanContract.GetContractByStatus(3,id)
        const loan_contract_4 = await mainLoanContract.GetContractByStatus(4,id)
        const loan_contract_5 = await mainLoanContract.GetContractByStatus(5,id)
        const loan_contract_6 = await mainLoanContract.GetContractByStatus(6,id)
        const loan_contract_7 = await mainLoanContract.GetContractByStatus(7,id)
        const loan_contract_8 = await mainLoanContract.GetContractByStatus(8,id)
        const loan_contract_9 = await mainLoanContract.GetContractByStatus(9,id)

        const invesment_contract_1 = await loanContractService.GetLoanContractByCustomerID(id,1)
        const invesment_contract_2 = await loanContractService.GetLoanContractByCustomerID(id,2)
        const invesment_contract_3 = await loanContractService.GetLoanContractByCustomerID(id,3)
        const invesment_contract_4 = await loanContractService.GetLoanContractByCustomerID(id,4)

        const invesment_auto_contract_1 = await Invesment_contract.GetListInvesmentAuto(id,1)
        const invesment_auto_contract_2 = await Invesment_contract.GetListInvesmentAuto(id,2)
        const invesment_auto_contract_3 = await Invesment_contract.GetListInvesmentAuto(id,3)
        const invesment_auto_contract_4 = await Invesment_contract.GetListInvesmentAuto(id,4)
        const invesment_auto_contract_5 = await Invesment_contract.GetListInvesmentAuto(id,5)
        const invesment_auto_contract_6 = await Invesment_contract.GetListInvesmentAuto(id,6)
        const result = {
            loan_contract:
                [
                    { status: 1, data: loan_contract_1 },
                    { status: 2, data: loan_contract_2 },
                    { status: 3, data: loan_contract_3 },
                    { status: 4, data: loan_contract_4 },
                    { status: 5, data: loan_contract_5 },
                    { status: 6, data: loan_contract_6 },
                    { status: 7, data: loan_contract_7 },
                    { status: 8, data: loan_contract_8 },
                    { status: 9, data: loan_contract_9 },

                ],
            invesment_contract:
                [
                    { status: 1, data: invesment_contract_1 },
                    { status: 2, data: invesment_contract_2 },
                    { status: 3, data: invesment_contract_3 },
                    { status: 4, data: invesment_contract_4 },
                ],
            auto_invesment_contract:
                [
                    { status: 1, data: invesment_auto_contract_1 },
                    { status: 2, data: invesment_auto_contract_2 },
                    { status: 3, data: invesment_auto_contract_3 },
                    { status: 4, data: invesment_auto_contract_4 },
                    { status: 5, data: invesment_auto_contract_5 },
                    { status: 6, data: invesment_auto_contract_6 },

                ]
        }
        return ApiResponse(
            res,
            true,
            CONSTANTS.HTTP_CODE.SUCCESS,
            CONSTANTS.SUCCESS,
            result
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
    listLoanProfile
}
