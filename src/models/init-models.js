const env = require("../config/env");
const Sequelize = require("sequelize");
const tunnel = require('tunnel-ssh')

const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  password: env.password,
  username: env.username,
  dialect: env.dialect,
  operatorsAliases: 0,
  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle,
  },
  dialectOptions: {
    useUTC: false
  },
  timezone: '+07:00'
});


const DataTypes = require("sequelize").DataTypes;
const _Member = require("./Member");
const _account = require("./account");
const _account_bank = require("./account_bank");
const _account_bank_system_transaction = require("./account_bank_system_transaction");
const _account_bank_system_transaction_status = require("./account_bank_system_transaction_status");
const _account_bank_system_transaction_type = require("./account_bank_system_transaction_type");
const _account_block = require("./account_block");
const _account_block_transaction = require("./account_block_transaction");
const _account_block_transaction_status = require("./account_block_transaction_status");
const _account_block_type = require("./account_block_type");
const _account_investment = require("./account_investment");
const _account_investment_transaction = require("./account_investment_transaction");
const _account_investment_transaction_status = require("./account_investment_transaction_status");
const _account_loan = require("./account_loan");
const _account_loan_limitation = require("./account_loan_limitation");
const _account_loan_limitation_transaction = require("./account_loan_limitation_transaction");
const _account_loan_limitation_transaction_status = require("./account_loan_limitation_transaction_status");
const _account_loan_limitation_type = require("./account_loan_limitation_type");
const _account_loan_transaction = require("./account_loan_transaction");
const _account_loan_transaction_status = require("./account_loan_transaction_status");
const _account_status = require("./account_status");
const _account_trannsaction_status = require("./account_trannsaction_status");
const _account_transaction = require("./account_transaction");
const _account_transaction_type = require("./account_transaction_type");
const _customer = require("./customer");
const _customer_status = require("./customer_status");
const _edit_account_bank_system_transaction = require("./edit_account_bank_system_transaction");
const _indentity_document = require("./indentity_document");
const _indentity_document_type = require("./indentity_document_type");
const _loan_contract = require("./loan_contract");
const _loan_contract_status = require("./loan_contract_status");
const _loan_contract_status_change = require("./loan_contract_status_change");
const _loan_contract_type = require("./loan_contract_type");
const _loan_fee = require("./loan_fee");
const _loan_objective = require("./loan_objective");
const _loan_rate = require("./loan_rate");
const _loan_rate_fee_monitoring = require("./loan_rate_fee_monitoring");
const _loan_term = require("./loan_term");
const _loan_term_method_payment = require("./loan_term_method_payment");
const _main_loan_contract = require("./main_loan_contract");
const _main_loan_contract_status = require("./main_loan_contract_status");
const _main_loan_contract_status_change = require("./main_loan_contract_status_change");
const _member_role_permissions = require("./member_role_permissions");
const _member_roles = require("./member_roles");
const _method_payment = require("./method_payment");
const _monitoring = require("./monitoring");
const _notification = require("./notification");
const _notification_status = require("./notification_status");
const _notification_type = require("./notification_type");
const _otp = require("./otp");
const _otp_type = require("./otp_type");
const _payment_schedule = require("./payment_schedule");
const _permissions = require("./permissions");
const _relationship = require("./relationship");
const _relative_customer = require("./relative_customer");
const _relative_relation = require("./relative_relation");
const _request_extend_loan_contract = require("./request_extend_loan_contract");
const _request_investment_auto = require("./request_investment_auto");
const _request_investment_auto_change_status = require("./request_investment_auto_change_status");
const _request_investment_auto_status = require("./request_investment_auto_status");
const _sub_account_transaction_status = require("./sub_account_transaction_status");
const _transaction_status = require("./transaction_status");
const _transactions = require("./transactions");
const _users = require("./users");

const Member = _Member(sequelize, DataTypes);
const account = _account(sequelize, DataTypes);
const account_bank = _account_bank(sequelize, DataTypes);
const account_bank_system_transaction = _account_bank_system_transaction(sequelize, DataTypes);
const account_bank_system_transaction_status = _account_bank_system_transaction_status(sequelize, DataTypes);
const account_bank_system_transaction_type = _account_bank_system_transaction_type(sequelize, DataTypes);
const account_block = _account_block(sequelize, DataTypes);
const account_block_transaction = _account_block_transaction(sequelize, DataTypes);
const account_block_transaction_status = _account_block_transaction_status(sequelize, DataTypes);
const account_block_type = _account_block_type(sequelize, DataTypes);
const account_investment = _account_investment(sequelize, DataTypes);
const account_investment_transaction = _account_investment_transaction(sequelize, DataTypes);
const account_investment_transaction_status = _account_investment_transaction_status(sequelize, DataTypes);
const account_loan = _account_loan(sequelize, DataTypes);
const account_loan_limitation = _account_loan_limitation(sequelize, DataTypes);
const account_loan_limitation_transaction = _account_loan_limitation_transaction(sequelize, DataTypes);
const account_loan_limitation_transaction_status = _account_loan_limitation_transaction_status(sequelize, DataTypes);
const account_loan_limitation_type = _account_loan_limitation_type(sequelize, DataTypes);
const account_loan_transaction = _account_loan_transaction(sequelize, DataTypes);
const account_loan_transaction_status = _account_loan_transaction_status(sequelize, DataTypes);
const account_status = _account_status(sequelize, DataTypes);
const account_trannsaction_status = _account_trannsaction_status(sequelize, DataTypes);
const account_transaction = _account_transaction(sequelize, DataTypes);
const account_transaction_type = _account_transaction_type(sequelize, DataTypes);
const customer = _customer(sequelize, DataTypes);
const customer_status = _customer_status(sequelize, DataTypes);
const edit_account_bank_system_transaction = _edit_account_bank_system_transaction(sequelize, DataTypes);
const indentity_document = _indentity_document(sequelize, DataTypes);
const indentity_document_type = _indentity_document_type(sequelize, DataTypes);
const loan_contract = _loan_contract(sequelize, DataTypes);
const loan_contract_status = _loan_contract_status(sequelize, DataTypes);
const loan_contract_status_change = _loan_contract_status_change(sequelize, DataTypes);
const loan_contract_type = _loan_contract_type(sequelize, DataTypes);
const loan_fee = _loan_fee(sequelize, DataTypes);
const loan_objective = _loan_objective(sequelize, DataTypes);
const loan_rate = _loan_rate(sequelize, DataTypes);
const loan_rate_fee_monitoring = _loan_rate_fee_monitoring(sequelize, DataTypes);
const loan_term = _loan_term(sequelize, DataTypes);
const loan_term_method_payment = _loan_term_method_payment(sequelize, DataTypes);
const main_loan_contract = _main_loan_contract(sequelize, DataTypes);
const main_loan_contract_status = _main_loan_contract_status(sequelize, DataTypes);
const main_loan_contract_status_change = _main_loan_contract_status_change(sequelize, DataTypes);
const member_role_permissions = _member_role_permissions(sequelize, DataTypes);
const member_roles = _member_roles(sequelize, DataTypes);
const method_payment = _method_payment(sequelize, DataTypes);
const monitoring = _monitoring(sequelize, DataTypes);
const notification = _notification(sequelize, DataTypes);
const notification_status = _notification_status(sequelize, DataTypes);
const notification_type = _notification_type(sequelize, DataTypes);
const otp = _otp(sequelize, DataTypes);
const otp_type = _otp_type(sequelize, DataTypes);
const payment_schedule = _payment_schedule(sequelize, DataTypes);
const permissions = _permissions(sequelize, DataTypes);
const relationship = _relationship(sequelize, DataTypes);
const relative_customer = _relative_customer(sequelize, DataTypes);
const relative_relation = _relative_relation(sequelize, DataTypes);
const request_extend_loan_contract = _request_extend_loan_contract(sequelize, DataTypes);
const request_investment_auto = _request_investment_auto(sequelize, DataTypes);
const request_investment_auto_change_status = _request_investment_auto_change_status(sequelize, DataTypes);
const request_investment_auto_status = _request_investment_auto_status(sequelize, DataTypes);
const sub_account_transaction_status = _sub_account_transaction_status(sequelize, DataTypes);
const transaction_status = _transaction_status(sequelize, DataTypes);
const transactions = _transactions(sequelize, DataTypes);
const users = _users(sequelize, DataTypes);

customer.belongsToMany(loan_contract, { as: 'Loan_Contract_ID_loan_contracts', through: request_extend_loan_contract, foreignKey: "Customer_ID", otherKey: "Loan_Contract_ID" });
loan_contract.belongsToMany(customer, { as: 'Customer_ID_customers', through: request_extend_loan_contract, foreignKey: "Loan_Contract_ID", otherKey: "Customer_ID" });
account_block.belongsTo(account, { as: "ID_account", foreignKey: "ID" });
account.hasOne(account_block, { as: "account_block", foreignKey: "ID" });
account_investment.belongsTo(account, { as: "ID_account", foreignKey: "ID" });
account.hasOne(account_investment, { as: "account_investment", foreignKey: "ID" });
account_loan.belongsTo(account, { as: "ID_account", foreignKey: "ID" });
account.hasOne(account_loan, { as: "account_loan", foreignKey: "ID" });
account_loan_limitation.belongsTo(account, { as: "ID_account", foreignKey: "ID" });
account.hasOne(account_loan_limitation, { as: "account_loan_limitation", foreignKey: "ID" });
account_transaction.belongsTo(account, { as: "Account", foreignKey: "Account_ID" });
account.hasMany(account_transaction, { as: "account_transactions", foreignKey: "Account_ID" });
account_transaction.belongsTo(account, { as: "FromAccount", foreignKey: "FromAccount_ID" });
account.hasMany(account_transaction, { as: "FromAccount_account_transactions", foreignKey: "FromAccount_ID" });
account_transaction.belongsTo(account, { as: "ToAccount", foreignKey: "ToAccount_ID" });
account.hasMany(account_transaction, { as: "ToAccount_account_transactions", foreignKey: "ToAccount_ID" });
account_bank_system_transaction.belongsTo(account_bank_system_transaction_type, { as: "Transation_Type", foreignKey: "Transation_Type_ID" });
account_bank_system_transaction_type.hasMany(account_bank_system_transaction, { as: "account_bank_system_transactions", foreignKey: "Transation_Type_ID" });
account_block_transaction.belongsTo(account_block, { as: "Account_Block", foreignKey: "Account_Block_ID" });
account_block.hasMany(account_block_transaction, { as: "account_block_transactions", foreignKey: "Account_Block_ID" });
account_block_transaction_status.belongsTo(account_block_transaction, { as: "Account_Block_Transaction", foreignKey: "Account_Block_Transaction_ID" });
account_block_transaction.hasMany(account_block_transaction_status, { as: "account_block_transaction_statuses", foreignKey: "Account_Block_Transaction_ID" });
account_block_transaction.belongsTo(account_block_type, { as: "Account_Block_Type", foreignKey: "Account_Block_Type_ID" });
account_block_type.hasMany(account_block_transaction, { as: "account_block_transactions", foreignKey: "Account_Block_Type_ID" });
account_investment_transaction.belongsTo(account_investment, { as: "Account_Investment", foreignKey: "Account_Investment_ID" });
account_investment.hasMany(account_investment_transaction, { as: "account_investment_transactions", foreignKey: "Account_Investment_ID" });
account_investment_transaction_status.belongsTo(account_investment_transaction, { as: "Account_Investment_Transaction", foreignKey: "Account_Investment_Transaction_ID" });
account_investment_transaction.hasMany(account_investment_transaction_status, { as: "account_investment_transaction_statuses", foreignKey: "Account_Investment_Transaction_ID" });
account_loan_transaction.belongsTo(account_loan, { as: "Account_Loan", foreignKey: "Account_Loan_ID" });
account_loan.hasMany(account_loan_transaction, { as: "account_loan_transactions", foreignKey: "Account_Loan_ID" });
account_loan_limitation_transaction.belongsTo(account_loan_limitation, { as: "Account_Loan_Limitation", foreignKey: "Account_Loan_Limitation_ID" });
account_loan_limitation.hasMany(account_loan_limitation_transaction, { as: "account_loan_limitation_transactions", foreignKey: "Account_Loan_Limitation_ID" });
account_loan_limitation_transaction.belongsTo(account_loan_limitation_transaction_status, { as: "Account_Loan_Limitation_Status", foreignKey: "Account_Loan_Limitation_Status_ID" });
account_loan_limitation_transaction_status.hasMany(account_loan_limitation_transaction, { as: "account_loan_limitation_transactions", foreignKey: "Account_Loan_Limitation_Status_ID" });
account_loan_limitation_transaction.belongsTo(account_loan_limitation_type, { as: "Account_Loan_Limitation_Type", foreignKey: "Account_Loan_Limitation_Type_ID" });
account_loan_limitation_type.hasMany(account_loan_limitation_transaction, { as: "account_loan_limitation_transactions", foreignKey: "Account_Loan_Limitation_Type_ID" });
account_loan_transaction_status.belongsTo(account_loan_transaction, { as: "Account_Loan_Transaction", foreignKey: "Account_Loan_Transaction_ID" });
account_loan_transaction.hasMany(account_loan_transaction_status, { as: "account_loan_transaction_statuses", foreignKey: "Account_Loan_Transaction_ID" });
account_transaction.belongsTo(account_status, { as: "Account_Status", foreignKey: "Account_Status_ID" });
account_status.hasMany(account_transaction, { as: "account_transactions", foreignKey: "Account_Status_ID" });
account_trannsaction_status.belongsTo(account_transaction, { as: "Account_Transaction", foreignKey: "Account_Transaction_ID" });
account_transaction.hasMany(account_trannsaction_status, { as: "account_trannsaction_statuses", foreignKey: "Account_Transaction_ID" });
account_transaction.belongsTo(account_transaction_type, { as: "Transation_Type", foreignKey: "Transation_Type_ID" });
account_transaction_type.hasMany(account_transaction, { as: "account_transactions", foreignKey: "Transation_Type_ID" });
account.belongsTo(customer, { as: "ID_customer", foreignKey: "ID" });
customer.hasOne(account, { as: "account", foreignKey: "ID" });
account_bank.belongsTo(customer, { as: "ID_customer", foreignKey: "ID" });
customer.hasOne(account_bank, { as: "account_bank", foreignKey: "ID" });
indentity_document.belongsTo(customer, { as: "ID_customer", foreignKey: "ID" });
customer.hasOne(indentity_document, { as: "indentity_document", foreignKey: "ID" });
loan_contract.belongsTo(customer, { as: "Borrower", foreignKey: "Borrower_ID" });
customer.hasMany(loan_contract, { as: "loan_contracts", foreignKey: "Borrower_ID" });
loan_contract.belongsTo(customer, { as: "Lender", foreignKey: "Lender_ID" });
customer.hasMany(loan_contract, { as: "Lender_loan_contracts", foreignKey: "Lender_ID" });
main_loan_contract.belongsTo(customer, { as: "Borrower", foreignKey: "Borrower_ID" });
customer.hasMany(main_loan_contract, { as: "main_loan_contracts", foreignKey: "Borrower_ID" });
relative_relation.belongsTo(customer, { as: "Customer", foreignKey: "Customer_ID" });
customer.hasMany(relative_relation, { as: "relative_relations", foreignKey: "Customer_ID" });
request_extend_loan_contract.belongsTo(customer, { as: "Customer", foreignKey: "Customer_ID" });
customer.hasMany(request_extend_loan_contract, { as: "request_extend_loan_contracts", foreignKey: "Customer_ID" });
request_investment_auto.belongsTo(customer, { as: "CUSTOMER", foreignKey: "CUSTOMER_ID" });
customer.hasMany(request_investment_auto, { as: "request_investment_autos", foreignKey: "CUSTOMER_ID" });
users.belongsTo(customer, { as: "ID_customer", foreignKey: "ID" });
customer.hasOne(users, { as: "user", foreignKey: "ID" });
indentity_document.belongsTo(indentity_document_type, { as: "Identity_Document_Type", foreignKey: "Identity_Document_Type_ID" });
indentity_document_type.hasMany(indentity_document, { as: "indentity_documents", foreignKey: "Identity_Document_Type_ID" });
loan_contract_status_change.belongsTo(loan_contract, { as: "Loan_Contract", foreignKey: "Loan_Contract_ID" });
loan_contract.hasMany(loan_contract_status_change, { as: "loan_contract_status_changes", foreignKey: "Loan_Contract_ID" });
loan_rate_fee_monitoring.belongsTo(loan_contract, { as: "LOAN_CONTRACT", foreignKey: "LOAN_CONTRACT_ID" });
loan_contract.hasMany(loan_rate_fee_monitoring, { as: "loan_rate_fee_monitorings", foreignKey: "LOAN_CONTRACT_ID" });
payment_schedule.belongsTo(loan_contract, { as: "Loan_Contract", foreignKey: "Loan_Contract_ID" });
loan_contract.hasMany(payment_schedule, { as: "payment_schedules", foreignKey: "Loan_Contract_ID" });
request_extend_loan_contract.belongsTo(loan_contract, { as: "Loan_Contract", foreignKey: "Loan_Contract_ID" });
loan_contract.hasMany(request_extend_loan_contract, { as: "request_extend_loan_contracts", foreignKey: "Loan_Contract_ID" });
loan_contract_status_change.belongsTo(loan_contract_status, { as: "Loan_Contract_Status", foreignKey: "Loan_Contract_Status_ID" });
loan_contract_status.hasMany(loan_contract_status_change, { as: "loan_contract_status_changes", foreignKey: "Loan_Contract_Status_ID" });
loan_contract.belongsTo(loan_contract_type, { as: "Contract_Type", foreignKey: "Contract_Type_ID" });
loan_contract_type.hasMany(loan_contract, { as: "loan_contracts", foreignKey: "Contract_Type_ID" });
loan_term_method_payment.belongsTo(loan_fee, { as: "Loan_Fee", foreignKey: "Loan_Fee_ID" });
loan_fee.hasMany(loan_term_method_payment, { as: "loan_term_method_payments", foreignKey: "Loan_Fee_ID" });
main_loan_contract.belongsTo(loan_objective, { as: "Loan_Objective", foreignKey: "Loan_Objective_ID" });
loan_objective.hasMany(main_loan_contract, { as: "main_loan_contracts", foreignKey: "Loan_Objective_ID" });
loan_term_method_payment.belongsTo(loan_rate, { as: "Loan_Rate", foreignKey: "Loan_Rate_ID" });
loan_rate.hasMany(loan_term_method_payment, { as: "loan_term_method_payments", foreignKey: "Loan_Rate_ID" });
loan_term_method_payment.belongsTo(loan_term, { as: "Loan_Term", foreignKey: "Loan_Term_ID" });
loan_term.hasMany(loan_term_method_payment, { as: "loan_term_method_payments", foreignKey: "Loan_Term_ID" });
main_loan_contract.belongsTo(loan_term, { as: "Loan_Term", foreignKey: "Loan_Term_ID" });
loan_term.hasMany(main_loan_contract, { as: "main_loan_contracts", foreignKey: "Loan_Term_ID" });
request_investment_auto.belongsTo(loan_term, { as: "Loan_Term", foreignKey: "Loan_Term_ID" });
loan_term.hasMany(request_investment_auto, { as: "request_investment_autos", foreignKey: "Loan_Term_ID" });
loan_contract.belongsTo(loan_term_method_payment, { as: "Loan_Term_Method_Payment", foreignKey: "Loan_Term_Method_Payment_ID" });
loan_term_method_payment.hasMany(loan_contract, { as: "loan_contracts", foreignKey: "Loan_Term_Method_Payment_ID" });
loan_contract.belongsTo(main_loan_contract, { as: "Main_Loan_Contract", foreignKey: "Main_Loan_Contract_ID" });
main_loan_contract.hasMany(loan_contract, { as: "loan_contracts", foreignKey: "Main_Loan_Contract_ID" });
main_loan_contract_status_change.belongsTo(main_loan_contract, { as: "Main_Contract", foreignKey: "Main_Contract_ID" });
main_loan_contract.hasMany(main_loan_contract_status_change, { as: "main_loan_contract_status_changes", foreignKey: "Main_Contract_ID" });
payment_schedule.belongsTo(main_loan_contract, { as: "Main_Loan_Contract", foreignKey: "Main_Loan_Contract_ID" });
main_loan_contract.hasMany(payment_schedule, { as: "payment_schedules", foreignKey: "Main_Loan_Contract_ID" });
main_loan_contract_status_change.belongsTo(main_loan_contract_status, { as: "Main_Loan_Contract_Status", foreignKey: "Main_Loan_Contract_Status_ID" });
main_loan_contract_status.hasMany(main_loan_contract_status_change, { as: "main_loan_contract_status_changes", foreignKey: "Main_Loan_Contract_Status_ID" });
loan_term_method_payment.belongsTo(method_payment, { as: "Method_Payment", foreignKey: "Method_Payment_ID" });
method_payment.hasMany(loan_term_method_payment, { as: "loan_term_method_payments", foreignKey: "Method_Payment_ID" });
main_loan_contract.belongsTo(method_payment, { as: "Method_Payment", foreignKey: "Method_Payment_ID" });
method_payment.hasMany(main_loan_contract, { as: "main_loan_contracts", foreignKey: "Method_Payment_ID" });
notification.belongsTo(notification_status, { as: "Notification_Status", foreignKey: "Notification_Status_ID" });
notification_status.hasMany(notification, { as: "notifications", foreignKey: "Notification_Status_ID" });
notification.belongsTo(notification_type, { as: "Notification_Type", foreignKey: "Notification_Type_ID" });
notification_type.hasMany(notification, { as: "notifications", foreignKey: "Notification_Type_ID" });
otp.belongsTo(otp_type, { as: "Otp_Type", foreignKey: "Otp_Type_ID" });
otp_type.hasMany(otp, { as: "otps", foreignKey: "Otp_Type_ID" });
relative_relation.belongsTo(relationship, { as: "Relationship", foreignKey: "Relationship_ID" });
relationship.hasMany(relative_relation, { as: "relative_relations", foreignKey: "Relationship_ID" });
relative_relation.belongsTo(relative_customer, { as: "Relative_Customer", foreignKey: "Relative_Customer_ID" });
relative_customer.hasMany(relative_relation, { as: "relative_relations", foreignKey: "Relative_Customer_ID" });
loan_contract.belongsTo(request_investment_auto, { as: "Request_Investment_Auto", foreignKey: "Request_Investment_Auto_ID" });
request_investment_auto.hasMany(loan_contract, { as: "loan_contracts", foreignKey: "Request_Investment_Auto_ID" });
request_investment_auto_change_status.belongsTo(request_investment_auto, { as: "Request_Investment_Auto", foreignKey: "Request_Investment_Auto_ID" });
request_investment_auto.hasMany(request_investment_auto_change_status, { as: "request_investment_auto_change_statuses", foreignKey: "Request_Investment_Auto_ID" });
request_investment_auto_change_status.belongsTo(request_investment_auto_status, { as: "Request_Investment_Auto_Status", foreignKey: "Request_Investment_Auto_Status_ID" });
request_investment_auto_status.hasMany(request_investment_auto_change_status, { as: "request_investment_auto_change_statuses", foreignKey: "Request_Investment_Auto_Status_ID" });
account_block_transaction_status.belongsTo(sub_account_transaction_status, { as: "Sub_Account_Status", foreignKey: "Sub_Account_Status_ID" });
sub_account_transaction_status.hasMany(account_block_transaction_status, { as: "account_block_transaction_statuses", foreignKey: "Sub_Account_Status_ID" });
account_investment_transaction_status.belongsTo(sub_account_transaction_status, { as: "Sub_Account_Status", foreignKey: "Sub_Account_Status_ID" });
sub_account_transaction_status.hasMany(account_investment_transaction_status, { as: "account_investment_transaction_statuses", foreignKey: "Sub_Account_Status_ID" });
account_loan_transaction_status.belongsTo(sub_account_transaction_status, { as: "Sub_Account_Status", foreignKey: "Sub_Account_Status_ID" });
sub_account_transaction_status.hasMany(account_loan_transaction_status, { as: "account_loan_transaction_statuses", foreignKey: "Sub_Account_Status_ID" });
account_trannsaction_status.belongsTo(transaction_status, { as: "Transaction_Status", foreignKey: "Transaction_Status_ID" });
transaction_status.hasMany(account_trannsaction_status, { as: "account_trannsaction_statuses", foreignKey: "Transaction_Status_ID" });
monitoring.belongsTo(users, { as: "User", foreignKey: "UserID" });
users.hasMany(monitoring, { as: "monitorings", foreignKey: "UserID" });
request_investment_auto.belongsTo(users, { as: "USER", foreignKey: "USERS_ID" });
users.hasMany(request_investment_auto, { as: "request_investment_autos", foreignKey: "USERS_ID" });

module.exports = {
  Member,
  account,
  account_bank,
  account_bank_system_transaction,
  account_bank_system_transaction_status,
  account_bank_system_transaction_type,
  account_block,
  account_block_transaction,
  account_block_transaction_status,
  account_block_type,
  account_investment,
  account_investment_transaction,
  account_investment_transaction_status,
  account_loan,
  account_loan_limitation,
  account_loan_limitation_transaction,
  account_loan_limitation_transaction_status,
  account_loan_limitation_type,
  account_loan_transaction,
  account_loan_transaction_status,
  account_status,
  account_trannsaction_status,
  account_transaction,
  account_transaction_type,
  customer,
  customer_status,
  edit_account_bank_system_transaction,
  indentity_document,
  indentity_document_type,
  loan_contract,
  loan_contract_status,
  loan_contract_status_change,
  loan_contract_type,
  loan_fee,
  loan_objective,
  loan_rate,
  loan_rate_fee_monitoring,
  loan_term,
  loan_term_method_payment,
  main_loan_contract,
  main_loan_contract_status,
  main_loan_contract_status_change,
  member_role_permissions,
  member_roles,
  method_payment,
  monitoring,
  notification,
  notification_status,
  notification_type,
  otp,
  otp_type,
  payment_schedule,
  permissions,
  relationship,
  relative_customer,
  relative_relation,
  request_extend_loan_contract,
  request_investment_auto,
  request_investment_auto_change_status,
  request_investment_auto_status,
  sub_account_transaction_status,
  transaction_status,
  transactions,
  users,
  sequelize
};

