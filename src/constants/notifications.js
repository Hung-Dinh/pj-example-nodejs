module.exports = {
 
  create_account_success: `Bạn đã tạo tài khoản thành công tại Money4u`,
  notify_record_success: `Hồ sơ cá nhân của bạn đã được phê duyệt thành công`,
  notify_record_faild: `Hồ sơ cá nhân của bạn chưa được phê duyệt`,
  create_mainloan_success: "Hồ sơ vay tiền đã được tạo thành công, đang đợi người đầu tư",
  accept_mainloan_success: (contractNumber) => `Hồ sơ vay tiền ${contractNumber} của bạn đã được phê duyệt, đang đợi giải ngân`,
  disbursement_mainloan_success: (contractNumber) => `Hồ sơ vay tiền ${contractNumber} đã được giải ngân`,
  request_withdrawal_success: `Yêu cầu rút tiền của bạn đã được xác nhận, đang đợi hệ thống phê duyệt`,
  accept_request_withdrawal_success: "Yêu cầu rút tiền của bạn đã được phê duyệt",
  recharge_success: (amount) =>  `Bạn vừa nạp thành công số tiền ${amount} đồng vào hệ thống M4u`,
  change_amount: (change,amount) => `Số dư tài khoản của bạn vừa biến động ${change}, số dư hiện tại là ${amount}`,
  change_password: `Mật khẩu tài khoản của bạn đã được thay đổi thành công`,
  request_expire: (contractNumber) => `Yêu cầu đáo hạn đối với khoản vay ${contractNumber} đã được gửi thành công`,
  accept_request_expire_success: (contractNumber) => `Yêu cầu đáo hạn đối với khoản vay ${contractNumber} đã được phê duyệt`,
  accept_request_expire_faild: (contractNumber) => `Yêu cầu đáo hạn đối với khoản vay ${contractNumber} không được phê duyệt`,
  // đầu tư
  wait_investment_success: (contractNumber) => `Hồ sơ đầu tư ${contractNumber} của bạn đang chờ duyệt`,
  accept_investment_success: (contractNumber) => `Hồ sơ đầu tư ${contractNumber} của bạn đã được phê duyệt`,
  disbursement_investment_success: (contractNumber) => `Hồ sơ đầu tư ${contractNumber} của bạn đã được giải ngân`,
  new_main_loan: "Hiện tại Money4u đang có các khoản vay mới, mời bạn vào đầu tư",
  promotion_main_loan: "Hiện tại bạn đang nhận được các khoản vay ưu đãi, bạn có thể vào đầu tư",
  create_auto_investment_success: "Yêu cầu đầu tư tự động của bạn được tạo thành công, đang chờ nhân viên chọn khoản vay",
  invite_accept_auto_investment_success: "Yêu cầu đầu tư tự động của bạn đã được chọn, mời bạn vào xác nhận",
  accept_auto_investment_success: "Hồ sơ đầu tư tự động của bạn đã được phê duyệt"
}
