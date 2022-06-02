const db = require('../models/init-models');
const { ThrowError } = require('../utils/helper/response');
const { CONSTANTS } = require('../constants/constants');
const moment = require('moment');
const { sendSMS } = require('../utils/api/gsm');
const { Op } = require("sequelize");
const { sendNotifyClient, SendNotifySMS } = require('./notifications.service');
const sampleNotify = require('../constants/notifications');
const sampleNotifySMS = require("../constants/smsNotify");

const accountModel = db.account
const accountBlockModel = db.account_block;
const accountBlockTransModel = db.account_block_transaction;
const accountBlockTransStatusModel = db.account_block_transaction_status;
const accountTransModel = db.account_transaction;
const accountTransStatusModel = db.account_trannsaction_status;
const transactionStatusModel = db.transaction_status;


const GetAmountAcc = async (id) => {
  try {
    const account = await accountModel.findOne({
      where: {
        ID: id
      }
    })
    return account.Amount;
  } catch (error) {
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, CONSTANTS.ERROR)
  }
};

const findTel = async (id) => {
  try {
    const account = await accountModel.findOne({
      where: {
        ID: id
      }
    })
    return account.Account_Number;
  } catch (error) {
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, CONSTANTS.ERROR)
  }
};

const findTransactionStatusName = async (id) => {
  try {
    const transactionStatus = await transactionStatusModel.findOne({
      where: {
        ID: id
      }
    })
    return transactionStatus.Status_Name;
  } catch (error) {
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, CONSTANTS.ERROR)
  }
};


const GetAmountBlockAcc = async (id) => {
  try {
    const account = await accountModel.findOne({
      where: {
        ID: id
      }
    })
    return account.Amount_Block;
  } catch (error) {
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, CONSTANTS.ERROR)
  }
};

const GetAccBlockGetMoney = async (id) => {
  try {
    const accountBlock = await accountBlockModel.findOne({
      where: {
        ID: id
      }
    })
    return accountBlock.Amount_GetMoney;
  } catch (error) {
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, CONSTANTS.ERROR)
  }
};

const GetAccBlockWaitInvestment = async (id) => {
  try {
    const accountBlock = await accountBlockModel.findOne({
      where: {
        ID: id
      }
    })
    return accountBlock.Amount_Wait_Investment;
  } catch (error) {
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, CONSTANTS.ERROR)
  }
};


const CreateReqGetMoney = async (id, amountBlock, content) => {
  const t = await db.sequelize.transaction();
  try {
    const amountOfAcc = await GetAmountAcc(id);
    const amountBlockOfAcc = await GetAmountBlockAcc(id);
    const amountGetMoneyOfAccBlock = await GetAccBlockGetMoney(id);
    const current = moment().format("YYYY-MM-DD HH:mm:ss");
    if (Number(amountOfAcc) < Number(amountBlock)) {
      return ThrowError(CONSTANTS.HTTP_CODE.ERROR, "Số tiền trong tài khoản không đủ");
    }
    await accountModel.update({
      Amount: amountOfAcc - amountBlock,
      Amount_Block: Number(amountBlockOfAcc) + Number(amountBlock)
    }, {
      where: { ID: id }
    }, { transaction: t }
    );

    await accountBlockModel.update({
      Amount_GetMoney: Number(amountGetMoneyOfAccBlock) + Number(amountBlock)
    }, {
      where: { ID: id }
    }, { transaction: t })

    // tạo transaction rút tiền chưa duyệt
    const accountTransaction = await accountTransModel.create({
      Account_ID: id,
      Amount: amountBlock,
      Transaction_Status_ID: 1,
      Transation_Type_ID: 2,
      Transaction_Content: content,
      Transaction_Code: "rut tien",
      Transaction_Date: current
    }, { transaction: t })

    // tạo transaction status chưa duyệt
    await accountTransStatusModel.create({
      Transaction_Status_ID: 1,
      Account_Transaction_ID: accountTransaction.ID,
      Transaction_Date: current
    }, { transaction: t })

    // tạo transaction account_block rút tiền chưa duyệt
    const accountTrans = await accountBlockTransModel.create({
      Account_Block_Type_ID: 1,
      Account_Block_ID: id,
      Amount_Block_Change: amountBlock,
      StatusID: 1,
      Transaction_Content: content,
      Transaction_Date: current
    }, { transaction: t })

    // tạo transaction account_block_status rút tiền chưa duyệt 
    await accountBlockTransStatusModel.create({
      Sub_Account_Status_ID: 1,
      Account_Block_Transaction_ID: accountTrans.ID,
      Transaction_Date: current,
    }, { transaction: t })

    
    await t.commit();
    // await sendSMS(
    //   "http://localhost:5000/sendsms",
    //   {to: "0906275026" , messeage: `Yeu cau rut so tien ${amountBlock} VND cua ban dang doi phe duyet `}
    // )

  } catch (error) {
    await t.rollback();
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, error.message)
  }
}

const CreateReqInvest = async (id, amountBlock, content, t) => {
  // const t = await db.sequelize.transaction();
  try {
    const amountOfAcc = await GetAmountAcc(id);
    const amountBlockOfAcc = await GetAmountBlockAcc(id);
    const amountWaitInvestmentOfAccBlock = await GetAccBlockWaitInvestment(id)
    const current = moment().format("YYYY-MM-DD HH:mm:ss");
    if (Number(amountOfAcc) < Number(amountBlock)) {
      return ThrowError(CONSTANTS.HTTP_CODE.ERROR, "Số tiền trong tài khoản không đủ");
    }
    await accountModel.update({
      Amount: amountOfAcc - amountBlock,
      Amount_Block: Number(amountBlockOfAcc) + Number(amountBlock)
    }, {
      where: { ID: id }
    }, { transaction: t }
    ).then(()=>{
       accountBlockModel.update({
        Amount_Wait_Investment: Number(amountWaitInvestmentOfAccBlock) + Number(amountBlock)
      }, {
        where: { ID: id }
      }, { transaction: t })
    })
    // transaction false
    
    const accountTrans = await accountBlockTransModel.create({
      Account_Block_Type_ID: 2,
      Account_Block_ID: id,
      Amount_Block_Change: amountBlock,
      Transaction_Content: content
    }, { transaction: t })

    await accountBlockTransStatusModel.create({
      Sub_Account_Status_ID: 1,
      Account_Block_Transaction_ID: accountTrans.ID,
      Transaction_Date: current,
    }, { transaction: t })

    // await t.commit();

  } catch (error) {
    // await t.rollback();
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, error.message)
  }
}

// danh sách yêu cầu rút tiền cần admin duyệt
const GetReqWithDrawal = async () => {
  try {
  
    const reqWithDrawal = await accountTransModel.findAll({
      where: {
        Transation_Type_ID: 2,
        Transaction_Status_ID: 2
      }
    })

    if(!reqWithDrawal){
      return null;
    }

    let listReqWithDrawal = [];
    for (let item of reqWithDrawal) {
      listReqWithDrawal.push({
        ID: item.ID,
        type: "rút tiền",
        status: "đã duyệt",
        accountNumber: await findTel(item.Account_ID),
        amount: item.Amount,
        content: item.Transaction_Content,
        datetime: item.Transaction_Date
      })
    }
    return listReqWithDrawal;
  } catch (error) {
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, CONSTANTS.ERROR);
  }
}
// danh sách yêu cầu rút tiền của khách hàng đang đợi tất toán
const GetReqWithDrawalPerSonal = async (id) => {
  try {
    
    const reqWithDrawal = await accountTransModel.findAll({
      where: {
        Transation_Type_ID: 2,
        Transaction_Status_ID: 1,
        Account_ID: id
      }
    })
    
    const reqWithDrawalEmployeeConfirm = await accountTransModel.findAll({
      where: {
        Transation_Type_ID: 2,
        Transaction_Status_ID: 2,
        Account_ID: id
      }
    })
    if(!(reqWithDrawal || reqWithDrawalEmployeeConfirm)){
      return null;
    }

    let listReqWithDrawal = [];
    let listReqWithDrawalEmployeeConfirm = [];

    for (let item of reqWithDrawal) {
      listReqWithDrawal.push({
        ID: item.ID,
        type: "rút tiền",
        status: "chưa duyệt",
        accountNumber: await await findTel(item.Account_ID),
        amount: item.Amount,
        content: item.Transaction_Content,
        datetime: item.Transaction_Date
      })
    }

    for (let item of reqWithDrawalEmployeeConfirm) {
      listReqWithDrawalEmployeeConfirm.push({
        ID: item.ID,
        type: "rút tiền",
        status: "đã duyệt",
        accountNumber: await await findTel(item.Account_ID),
        amount: item.Amount,
        content: item.Transaction_Content,
        datetime: item.Transaction_Date
      })
    }

    return [{"Chưa duyệt": listReqWithDrawal},{"Đã duyệt": listReqWithDrawalEmployeeConfirm} ];

  } catch (error) {
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, CONSTANTS.ERROR);
  }
}
// admin phê duyệt rút tiền
const AdminConfirmReqWithDrawal = async (id) => {
  const t = await db.sequelize.transaction();
  try {
    const current = moment().format("YYYY-MM-DD HH:mm:ss");
    const transaction = await accountTransModel.findOne({
      where: {
        ID: id,
        Transation_Type_ID: 2,
        Transaction_Status_ID: 2
      }
    })
    if(!transaction){
      return ThrowError(CONSTANTS.HTTP_CODE.ERROR, "Mã transaction không hợp lệ");
    }
    // ghi vào transaction accountTransaction và accountTransactionStatus
    await accountTransModel.update({
      Transaction_Status_ID: 3
    }, {
      where: {
        ID: id
      }
    }, {transaction: t })

    await accountTransStatusModel.create({
      Transaction_Status_ID: 3,
      Account_Transaction_ID: id,
      Transaction_Date: current
    }, {transaction: t })

   
    const transactionBlock = await accountBlockTransModel.findOne({
      where: {
        Account_Block_ID: transaction.Account_ID,
        Account_Block_Type_ID: 1,
        Transaction_Date: transaction.Transaction_Date
      }
    })
 
    // ghi vào transaction block trạng thái đã duyệt
    await accountBlockTransModel.update({
      StatusID: 2
    }, {
      where: {
        ID: transactionBlock.ID
      }
    },{transaction: t })
   
    await accountBlockTransStatusModel.create({
      Sub_Account_Status_ID: 2,
      Account_Block_Transaction_ID: transactionBlock.ID,
      Transaction_Date: current,
    }, { transaction: t })
   
    const blockAccount = await accountBlockModel.findOne({
      where: {
        ID: transactionBlock.Account_Block_ID
      }
    })
   
    const blockAmount = await accountBlockTransModel.findOne({
      where: {
        ID: transactionBlock.ID
      }
    })

    const accountBlock1 = await accountBlockModel.update({
      Amount_GetMoney: blockAccount.Amount_GetMoney - blockAmount.Amount_Block_Change
    },
      {
        where: {
          ID: transactionBlock.Account_Block_ID
        }
      }, {transaction: t})
    
    const account = await accountModel.findOne({
      where: {
        ID: transaction.Account_ID
      }
    })

    await sendNotifyClient(transaction.Account_ID,7,sampleNotify.accept_request_withdrawal_success);
    await SendNotifySMS(account.Account_Number,sampleNotifySMS.change_amount(-blockAmount.Amount_Block_Change, account.Amount));
    await t.commit()
    return accountBlock1;

  } catch (error) {
    await t.rollback();
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, error.message)
  }
};
// danh sách đã rút tiền đã tiền đã tất toán của khách hàng
const WithDrawalPerSonal = async (id) => {
  try {
    const reqWithDrawal = await accountTransModel.findAll({
      where: {
        Transation_Type_ID: 2,
        Transaction_Status_ID: 3,
        Account_ID: id
      }
    })
    if(!reqWithDrawal){
      return null;
    }

    let listReqWithDrawal = [];
    for (let item of reqWithDrawal) {
      listReqWithDrawal.push({
        ID: item.ID,
        type: "rút tiền",
        status: "đã tất toán",
        accountNumber: await findTel(item.Account_ID),
        amount: item.Amount,
        content: item.Transaction_Content,
        datetime: item.Transaction_Date
      })
    }

    return listReqWithDrawal;
  } catch (error) {
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, CONSTANTS.ERROR);
  }
}
// danh sách rút tiền cần nhân viên phê duyệt
const GetReqWithDrawalAccount = async () => {
  try {
    const reqWithDrawal = await accountTransModel.findAll({
      where: {
        Transation_Type_ID: 2,
        Transaction_Status_ID: 1
      }
    })
    if(!reqWithDrawal){
      return null;
    }
    let listReqWithDrawal = []; 
   
    for (let item of reqWithDrawal) {
      listReqWithDrawal.push({
        ID: item.ID,
        type: "rút tiền",
        status: "chưa duyệt",
        accountNumber: await findTel(item.Account_ID),
        amount: item.Amount,
        content: item.Transaction_Content,
        datetime: item.Transaction_Date
      })
    }
    return listReqWithDrawal;
  } catch (error) {
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, CONSTANTS.ERROR);
  }
}

const EmployeeConfirmReqWithDrawal = async (id) => {
  const t = await db.sequelize.transaction();
  try {
    
    const accountTrans = await accountTransModel.findOne({
      where: {
        [Op.and]: [
          {ID: id},
          {Transation_Type_ID: 2},
          {Transaction_Status_ID: 1}
        ]
      }})

    if(!accountTrans){
      return ThrowError(CONSTANTS.HTTP_CODE.ERROR, "Mã transaction không tồn tại")
    }
   
    await accountTransModel.update({
      Transaction_Status_ID: 2
    }, {
      where: {
        ID: id
      }
    },{ transaction: t})

    const accountTransactionStatus = await accountTransStatusModel.create({
      Transaction_Status_ID: 2,
      Account_Transaction_ID: id,
      Transaction_Date: moment().format("YYYY-MM-DD HH:mm:ss")
    }, {transaction: t})
    
    await sendNotifyClient(accountTrans.Account_ID,7,sampleNotify.request_withdrawal_success)

    await t.commit();
    return accountTransactionStatus;
  } catch (error) {
    await t.rollback();
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, error.message)
  }
};
// xem chi tiết yêu cầu rút tiền
const GetReqWithDrawalDetail = async (id) => {
  try {
    const reqWithDrawal = await accountTransModel.findOne({
      where: {
        ID: id,
        Transation_Type_ID: 2
      }
    })
    console.log(reqWithDrawal)
    if(!reqWithDrawal){
      return ThrowError(CONSTANTS.HTTP_CODE.ERROR, "ID rút tiền không hợp lệ")
    }

    return {
      ID: reqWithDrawal.ID,
      type: "rút tiền",
      status: await findTransactionStatusName(reqWithDrawal.Transaction_Status_ID),
      accountNumber: await findTel(reqWithDrawal.Account_ID),
      amount: reqWithDrawal.Amount,
      content: reqWithDrawal.Transaction_Content,
      datetime: reqWithDrawal.Transaction_Date
    }
        
  } catch (error) {
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, error.message);
  }
}


const createAccountBlock = async (id, entity) => {
  try {
    const accountBlock = await accountBlockModel.create({
      ID: id,
      Amount_GetMoney: entity.Amount_GetMoney,
      Amount_Wait_Investment: entity.Amount_Wait_Investment,
      Amount_Wait_LoanFromOwn: entity.Amount_Wait_LoanFromOwn

    })
    return accountBlock
  } catch (error) {
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, CONSTANTS.ERROR);
  }
}

const CancelBlock = async(lenderID, amountBlock, content)=>{
  const t = await db.sequelize.transaction();
  try {
    const amountOfAcc = await GetAmountAcc(lenderID);
    const amountBlockOfAcc = await GetAmountBlockAcc(lenderID);
    const amountWaitInvestmentOfAccBlock = await GetAccBlockWaitInvestment(lenderID)
    const current = moment().format("YYYY-MM-DD HH:mm:ss");
   
    await accountModel.update({
      Amount: amountOfAcc + amountBlock,
      Amount_Block: Number(amountBlockOfAcc) - Number(amountBlock)
    }, {
      where: { ID: lenderID }
    }, { transaction: t }
    );

    await accountBlockModel.update({
      Amount_Wait_Investment: Number(amountWaitInvestmentOfAccBlock) - Number(amountBlock)
    }, {
      where: { ID: lenderID }
    }, { transaction: t })

    const accountTrans = await accountBlockTransModel.create({
      Account_Block_Type_ID: 2,
      Account_Block_ID: lenderID,
      Amount_Block_Change: -amountBlock,
      Transaction_Content: content
    }, { transaction: t })

    await accountBlockTransStatusModel.create({
      Sub_Account_Status_ID: 1,
      Account_Block_Transaction_ID: accountTrans.ID,
      Transaction_Date: current,
    }, { transaction: t })

    await t.commit();

  } catch (error) {
    await t.rollback();
    return ThrowError(CONSTANTS.HTTP_CODE.ERROR, error.message)
  }
}


module.exports = {
  CreateReqGetMoney,
  CreateReqInvest,
  GetReqWithDrawal,
  GetReqWithDrawalPerSonal,
  AdminConfirmReqWithDrawal,
  WithDrawalPerSonal,
  GetReqWithDrawalAccount,
  EmployeeConfirmReqWithDrawal,
  createAccountBlock,
  CancelBlock,
  GetReqWithDrawalDetail
}
