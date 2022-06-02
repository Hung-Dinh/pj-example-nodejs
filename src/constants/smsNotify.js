
module.exports = {
 
  create_account_success: `Ban da tao tai khoan thanh cong tại Money4u`,
  accept_mainloan_success: (contractNumber) => `Ho so vay tien ${contractNumber} cua ban da duoc phe duyet, dang doi giai ngan`,
  disbursement_mainloan_success: (contractNumber) => `Ho so vay tien ${contractNumber} da duoc giai ngan`,
  change_amount: (change,amount) => `So du tai khoan cua ban vua bien dong ${change}, so du hien tai la ${amount}`,
  accept_request_expire_success: (contractNumber) => `Yeu cau dao han doi voi khoan vay ${contractNumber} da duoc phe duyet`,
  accept_request_expire_faild: (contractNumber) => `Yeu cau dao han doi voi khoan vay ${contractNumber} khong duoc phe duyet`
}